# SmartHire AI - Official Database Design

This document defines the official PostgreSQL database design for SmartHire AI. It must be followed for all backend development and data modeling work.

---

## 1. Database Design Principles

- Follow 3NF normalization.
- Keep data ownership explicit through foreign keys.
- Avoid duplicated business data.
- Separate core identity data from profile, settings, and analysis data.
- Prepare the system for future premium features and scaling.
- Keep the schema production-ready and auditable.

---

## 2. Database Folder Structure

```text
database/
├── sql/                       # Canonical schema definitions and reference SQL
├── migrations/                # Versioned schema migration scripts
├── seed/                      # Seed and demo data
├── erd/                       # ERD files and data model diagrams
└── docs/                      # Database design notes and documentation
```

### Purpose
The database folder contains all persistence-related design artifacts and documentation.

### What belongs inside
- Schema definitions, migration scripts, seed data, ERD files, and database documentation.

### Best practices
- Keep schema changes versioned and reviewable.
- Maintain one source of truth for the database model.
- Document relationships and constraints clearly.

---

## 3. Core Design Summary

The system is organized around the following entities:

- Users and user identity
- User profiles and preference settings
- Uploaded resumes and parsed resume content
- Job descriptions and associated skills
- ATS analysis reports and report history
- Interview sessions and interview feedback
- Generic skill catalog shared across resumes and job descriptions
- Premium-related access and subscription metadata

---

## 4. Official Table List

### 1. users
- Purpose: Stores shared account and authentication identity for each user.
- Primary Key: id
- Foreign Keys: None
- Columns:
  - id
  - email
  - password_hash
  - auth_provider
  - email_verified
  - is_active
  - is_deleted
  - created_at
  - updated_at
  - last_login_at
- Relationships:
  - One user has one user_profile
  - One user has many resumes
  - One user has many job_descriptions
  - One user has many ats_reports
  - One user has many interview_sessions
  - One user has one user_settings
  - One user may have many premium subscriptions or feature access records

### 2. user_profiles
- Purpose: Stores non-auth profile information for a user.
- Primary Key: id
- Foreign Keys:
  - user_id -> users.id
- Columns:
  - id
  - user_id
  - full_name
  - display_name
  - phone_number
  - date_of_birth
  - gender
  - country
  - city
  - bio
  - avatar_url
  - professional_title
  - years_of_experience
  - created_at
  - updated_at
- Relationships:
  - One-to-one with users

### 3. user_settings
- Purpose: Stores user preferences and personalization settings.
- Primary Key: id
- Foreign Keys:
  - user_id -> users.id
- Columns:
  - id
  - user_id
  - notification_email
  - notification_sms
  - dark_mode
  - language_preference
  - timezone
  - resume_processing_mode
  - ai_feedback_level
  - created_at
  - updated_at
- Relationships:
  - One-to-one with users

### 4. skills
- Purpose: Stores the canonical catalog of skills used across resumes and job descriptions.
- Primary Key: id
- Foreign Keys: None
- Columns:
  - id
  - name
  - normalized_name
  - category
  - description
  - is_active
  - created_at
  - updated_at
- Relationships:
  - One skill can appear in many resume_skill rows
  - One skill can appear in many job_description_skill rows

### 5. resumes
- Purpose: Stores uploaded resumes and their metadata.
- Primary Key: id
- Foreign Keys:
  - user_id -> users.id
- Columns:
  - id
  - user_id
  - file_name
  - original_file_name
  - file_type
  - file_size_bytes
  - storage_path
  - upload_status
  - parse_status
  - parse_completed_at
  - extracted_text_path
  - created_at
  - updated_at
- Relationships:
  - Many resumes belong to one user
  - One resume has many resume_skills
  - One resume has many ats_reports
  - One resume may belong to many interview_sessions

### 6. resume_skills
- Purpose: Links resumes to the skills extracted from them.
- Primary Key: id
- Foreign Keys:
  - resume_id -> resumes.id
  - skill_id -> skills.id
- Columns:
  - id
  - resume_id
  - skill_id
  - confidence_score
  - source_type
  - created_at
- Relationships:
  - Many-to-many join table between resumes and skills

### 7. resume_parsing_results
- Purpose: Stores parsed resume content and structured extraction results.
- Primary Key: id
- Foreign Keys:
  - resume_id -> resumes.id
- Columns:
  - id
  - resume_id
  - full_name
  - email
  - phone_number
  - summary
  - education_json
  - experience_json
  - certifications_json
  - languages_json
  - parsed_at
  - parser_version
  - created_at
- Relationships:
  - One-to-one with resumes

### 8. job_descriptions
- Purpose: Stores job descriptions uploaded or created by users for matching and ATS analysis.
- Primary Key: id
- Foreign Keys:
  - user_id -> users.id
- Columns:
  - id
  - user_id
  - title
  - company_name
  - location
  - employment_type
  - description_text
  - source_type
  - storage_path
  - created_at
  - updated_at
- Relationships:
  - Many job descriptions belong to one user
  - One job description has many job_description_skills
  - One job description has many ats_reports

### 9. job_description_skills
- Purpose: Links job descriptions to relevant skills.
- Primary Key: id
- Foreign Keys:
  - job_description_id -> job_descriptions.id
  - skill_id -> skills.id
- Columns:
  - id
  - job_description_id
  - skill_id
  - importance_score
  - created_at
- Relationships:
  - Many-to-many join table between job descriptions and skills

### 10. ats_reports
- Purpose: Stores ATS analysis reports generated for a resume and optionally a job description.
- Primary Key: id
- Foreign Keys:
  - user_id -> users.id
  - resume_id -> resumes.id
  - job_description_id -> job_descriptions.id
- Columns:
  - id
  - user_id
  - resume_id
  - job_description_id
  - report_type
  - score_overall
  - score_formatting
  - score_keywords
  - score_experience
  - score_skills
  - ai_summary
  - recommendations_json
  - generated_at
  - status
  - created_at
- Relationships:
  - Many reports belong to one user
  - Many reports belong to one resume
  - Many reports may belong to one job description
  - One report has many report_history rows

### 11. report_history
- Purpose: Tracks report versions and historical changes over time.
- Primary Key: id
- Foreign Keys:
  - ats_report_id -> ats_reports.id
- Columns:
  - id
  - ats_report_id
  - version_number
  - snapshot_json
  - generated_at
  - created_at
- Relationships:
  - One ATS report has many historical versions

### 12. interview_sessions
- Purpose: Stores each interview preparation session created by a user.
- Primary Key: id
- Foreign Keys:
  - user_id -> users.id
  - resume_id -> resumes.id
- Columns:
  - id
  - user_id
  - resume_id
  - session_title
  - interview_type
  - difficulty_level
  - status
  - started_at
  - completed_at
  - created_at
  - updated_at
- Relationships:
  - Many interview sessions belong to one user
  - Many interview sessions may reference one resume
  - One session has many interview_feedback rows

### 13. interview_questions
- Purpose: Stores the questions generated for an interview session.
- Primary Key: id
- Foreign Keys:
  - interview_session_id -> interview_sessions.id
- Columns:
  - id
  - interview_session_id
  - question_text
  - question_type
  - difficulty_level
  - expected_answer_focus
  - created_at
- Relationships:
  - One interview session has many interview questions

### 14. interview_feedback
- Purpose: Stores AI-generated or human-reviewed feedback for interview sessions or questions.
- Primary Key: id
- Foreign Keys:
  - interview_session_id -> interview_sessions.id
  - interview_question_id -> interview_questions.id
- Columns:
  - id
  - interview_session_id
  - interview_question_id
  - feedback_text
  - score
  - feedback_type
  - generated_at
  - created_at
- Relationships:
  - Many feedback rows belong to one interview session
  - Each feedback row may reference one question

### 15. subscriptions
- Purpose: Stores premium plan and billing metadata for future premium features.
- Primary Key: id
- Foreign Keys:
  - user_id -> users.id
- Columns:
  - id
  - user_id
  - plan_name
  - billing_status
  - start_date
  - end_date
  - auto_renew
  - created_at
  - updated_at
- Relationships:
  - Many subscriptions belong to one user
  - One subscription has many premium_feature_access rows

### 16. premium_feature_access
- Purpose: Tracks which premium capabilities a user can currently access.
- Primary Key: id
- Foreign Keys:
  - user_id -> users.id
  - subscription_id -> subscriptions.id
- Columns:
  - id
  - user_id
  - subscription_id
  - feature_name
  - is_enabled
  - granted_at
  - expires_at
- Relationships:
  - Many premium feature entries belong to one user
  - Each entry belongs to one subscription

### 17. audit_logs
- Purpose: Stores operational and security events for auditability and support.
- Primary Key: id
- Foreign Keys:
  - user_id -> users.id
- Columns:
  - id
  - user_id
  - action_type
  - entity_type
  - entity_id
  - details_json
  - created_at
- Relationships:
  - Many audit events belong to one user

---

## 5. Relationship Map

### Users
- Users are the central identity entity.
- Every major domain object links back to users.

### Resumes
- A user can upload many resumes.
- Each resume can have parsed content and extracted skills.
- Each resume can generate many ATS reports.

### Job Descriptions
- A user can create or upload many job descriptions.
- Each job description can be matched to one or many resumes through ATS reports.
- Each job description has its own skill catalog.

### ATS Reports
- ATS reports are generated from a resume and optionally a job description.
- They are owned by the user who requested the analysis.
- They can be versioned through report_history.

### Interview Sessions
- Interview sessions are owned by users and may be tied to a specific resume.
- Each session contains many interview questions and feedback results.

### Interview Feedback
- Feedback belongs to an interview session and optional question.
- This ensures each feedback entry is traceable.

### Skills
- Skills are shared across resumes and job descriptions.
- The design keeps the skill catalog normalized and reusable.

### Resume Skills
- This join table links resumes to extracted skills without duplicating the skill catalog.

### Settings
- User settings are stored separately from user identity to keep profile data clean and extensible.

---

## 6. Additional Tables Recommended for Scalability

These are recommended to support growth and production readiness:

- organizations
  - Supports team-based or enterprise workflows.
- team_members
  - Links users to organizations or collaboration spaces.
- api_keys
  - Allows service-to-service integrations and internal automation.
- file_processing_queue
  - Supports asynchronous parsing and upload processing.
- notification_events
  - Supports email, push, or in-app notifications.
- payment_transactions
  - Supports future billing and premium feature management.

---

## 7. Recommended Naming Conventions

- Use lowercase snake_case for table names.
- Use singular, domain-based names for core entities.
- Use descriptive join tables such as resume_skills and job_description_skills.
- Use clear prefixes only when necessary, but prefer natural naming.
- Keep foreign key names consistent and explicit.

---

## 8. Final Database Direction

The database should be modeled as a modular, normalized PostgreSQL schema centered on:

- users
- resumes
- job descriptions
- ATS reports
- interview sessions
- skill catalog
- settings and preferences
- premium access and auditability

This design is intended to support the current product scope while remaining scalable for future growth, premium features, analytics, and enterprise usage.
