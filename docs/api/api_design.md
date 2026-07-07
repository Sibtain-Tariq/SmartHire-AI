# SmartHire AI - Official REST API Design

This document defines the official REST API architecture for SmartHire AI. It must be followed for all backend development, route design, controller design, and client integration.

---

## 1. API Design Principles

- Follow RESTful conventions.
- Use resource-based endpoints.
- Use JSON responses.
- Separate route handling from business logic.
- Keep controllers thin and services domain-focused.
- Validate all incoming requests.
- Support pagination, filtering, and search where appropriate.
- Return consistent success and error payloads.
- Support authentication and authorization clearly.
- Keep the API production-ready and scalable.

---

## 2. API Folder Organization

```text
server/
├── app/
│   ├── api/
│   │   ├── v1/
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── resumes/
│   │   │   ├── job_descriptions/
│   │   │   ├── ats/
│   │   │   ├── interviews/
│   │   │   ├── dashboard/
│   │   │   ├── settings/
│   │   │   └── admin/
│   ├── controllers/
│   │   ├── auth_controller.py
│   │   ├── user_controller.py
│   │   ├── resume_controller.py
│   │   ├── ats_controller.py
│   │   ├── interview_controller.py
│   │   ├── dashboard_controller.py
│   │   ├── settings_controller.py
│   │   └── admin_controller.py
│   ├── services/
│   │   ├── auth_service.py
│   │   ├── user_service.py
│   │   ├── resume_service.py
│   │   ├── ats_service.py
│   │   ├── interview_service.py
│   │   ├── dashboard_service.py
│   │   ├── settings_service.py
│   │   └── admin_service.py
│   ├── repositories/
│   │   ├── user_repository.py
│   │   ├── resume_repository.py
│   │   ├── ats_repository.py
│   │   ├── interview_repository.py
│   │   └── admin_repository.py
│   ├── schemas/
│   │   ├── auth_schema.py
│   │   ├── user_schema.py
│   │   ├── resume_schema.py
│   │   ├── ats_schema.py
│   │   ├── interview_schema.py
│   │   └── admin_schema.py
│   ├── middleware/
│   │   ├── auth_middleware.py
│   │   ├── error_handler.py
│   │   ├── rate_limit.py
│   │   └── logging_middleware.py
│   └── core/
│       ├── exceptions.py
│       ├── response_format.py
│       └── pagination.py
```

---

## 3. Route Organization

### Versioning
- All routes should be grouped under /api/v1/.
- Future versions should use /api/v2/ and beyond.

### Resource Groups
- /api/v1/auth
- /api/v1/users
- /api/v1/resumes
- /api/v1/job-descriptions
- /api/v1/ats
- /api/v1/interviews
- /api/v1/dashboard
- /api/v1/settings
- /api/v1/admin

---

## 4. Controller Organization

Controllers should be responsible for:
- Receiving requests
- Validating request shape at the API boundary
- Delegating to services
- Formatting responses
- Handling request-specific coordination

Controllers must not contain business logic directly.

---

## 5. Service Organization

Services should be responsible for:
- Core business rules
- Orchestrating multiple repositories and integrations
- Calling AI services where required
- Applying domain-specific validations

---

## 6. Repository Organization

Repositories should be responsible for:
- Database access
- Data mapping and persistence
- Query construction
- Returning domain-friendly data structures

---

## 7. Middleware Flow

Request lifecycle middleware should be applied in the following order:

1. Request logging middleware
2. Authentication middleware
3. Authorization middleware
4. Rate limiting middleware
5. Validation middleware
6. Controller execution
7. Error handling middleware
8. Response formatting middleware

---

## 8. Authentication Flow

### Authentication Strategy
- Firebase Authentication for client identity
- JWT or Firebase token validation on backend
- Backend should verify token and resolve user identity
- Role-based access control for admin flows

### Flow
1. Client authenticates with Firebase or backend auth endpoints.
2. Backend validates the token.
3. User context is attached to the request state.
4. Protected endpoints authorize access using the user context.

---

## 9. Request Lifecycle

1. Client sends request to a versioned route.
2. Middleware validates authentication and request metadata.
3. Controller receives request and extracts parameters/body.
4. Controller calls the appropriate service.
5. Service calls repositories and AI services.
6. Response is normalized and returned to the client.
7. Error handling middleware formats failures consistently.

---

## 10. Official API Specification

## 10.1 Authentication Module

### 1. Register User
- Module Name: Authentication
- Endpoint: /api/v1/auth/register
- Method: POST
- Description: Create a new user account.
- Authentication Required: No
- Request Parameters: None
- Request Body:
  - email
  - password
  - full_name
  - accept_terms
- Validation Rules:
  - email must be valid
  - password must meet minimum strength
  - full_name must not be empty
  - accept_terms must be true
- Success Response:
  - user object
  - access token
  - refresh token
- Error Responses:
  - invalid input
  - duplicate email
  - weak password
- Status Codes:
  - 201 Created
  - 400 Bad Request
  - 409 Conflict
- Database Tables Used:
  - users
  - user_profiles
- AI Module Used:
  - None

### 2. Login User
- Module Name: Authentication
- Endpoint: /api/v1/auth/login
- Method: POST
- Description: Authenticate a user and return tokens.
- Authentication Required: No
- Request Parameters: None
- Request Body:
  - email
  - password
- Validation Rules:
  - email must be valid
  - password is required
- Success Response:
  - user object
  - access token
  - refresh token
- Error Responses:
  - invalid credentials
  - account disabled
- Status Codes:
  - 200 OK
  - 401 Unauthorized
- Database Tables Used:
  - users
- AI Module Used:
  - None

### 3. Logout User
- Module Name: Authentication
- Endpoint: /api/v1/auth/logout
- Method: POST
- Description: Invalidate the current session or token.
- Authentication Required: Yes
- Request Parameters: None
- Request Body: None
- Validation Rules:
  - valid authenticated user
- Success Response:
  - success message
- Error Responses:
  - unauthorized
- Status Codes:
  - 200 OK
  - 401 Unauthorized
- Database Tables Used:
  - users
- AI Module Used:
  - None

### 4. Forgot Password
- Module Name: Authentication
- Endpoint: /api/v1/auth/forgot-password
- Method: POST
- Description: Start password reset flow.
- Authentication Required: No
- Request Parameters: None
- Request Body:
  - email
- Validation Rules:
  - email must be valid
- Success Response:
  - confirmation message
- Error Responses:
  - email not found
- Status Codes:
  - 200 OK
  - 404 Not Found
- Database Tables Used:
  - users
- AI Module Used:
  - None

### 5. Reset Password
- Module Name: Authentication
- Endpoint: /api/v1/auth/reset-password
- Method: POST
- Description: Reset password using a secure token.
- Authentication Required: No
- Request Parameters: None
- Request Body:
  - token
  - new_password
- Validation Rules:
  - token must be valid
  - password must meet minimum strength
- Success Response:
  - success confirmation
- Error Responses:
  - invalid token
  - expired token
- Status Codes:
  - 200 OK
  - 400 Bad Request
- Database Tables Used:
  - users
- AI Module Used:
  - None

### 6. Refresh Token
- Module Name: Authentication
- Endpoint: /api/v1/auth/refresh-token
- Method: POST
- Description: Refresh access token using refresh token.
- Authentication Required: No
- Request Parameters: None
- Request Body:
  - refresh_token
- Validation Rules:
  - refresh token must be present and valid
- Success Response:
  - new access token
  - new refresh token
- Error Responses:
  - invalid refresh token
- Status Codes:
  - 200 OK
  - 401 Unauthorized
- Database Tables Used:
  - users
- AI Module Used:
  - None

### 7. Verify Email
- Module Name: Authentication
- Endpoint: /api/v1/auth/verify-email
- Method: POST
- Description: Verify a user email address.
- Authentication Required: No
- Request Parameters: None
- Request Body:
  - token
- Validation Rules:
  - token must be valid
- Success Response:
  - verification success message
- Error Responses:
  - invalid or expired token
- Status Codes:
  - 200 OK
  - 400 Bad Request
- Database Tables Used:
  - users
- AI Module Used:
  - None

### 8. Get Current User
- Module Name: Authentication
- Endpoint: /api/v1/auth/me
- Method: GET
- Description: Get details of the currently authenticated user.
- Authentication Required: Yes
- Request Parameters: None
- Request Body: None
- Validation Rules:
  - token must be valid
- Success Response:
  - current user profile summary
- Error Responses:
  - unauthorized
- Status Codes:
  - 200 OK
  - 401 Unauthorized
- Database Tables Used:
  - users
  - user_profiles
- AI Module Used:
  - None

---

## 10.2 User Profile Module

### 9. Get User Profile
- Module Name: User Profile
- Endpoint: /api/v1/users/me
- Method: GET
- Description: Retrieve the current user profile.
- Authentication Required: Yes
- Request Parameters: None
- Request Body: None
- Validation Rules:
  - authenticated user required
- Success Response:
  - profile object
- Error Responses:
  - unauthorized
- Status Codes:
  - 200 OK
  - 401 Unauthorized
- Database Tables Used:
  - user_profiles
- AI Module Used:
  - None

### 10. Update User Profile
- Module Name: User Profile
- Endpoint: /api/v1/users/me
- Method: PUT
- Description: Update profile fields.
- Authentication Required: Yes
- Request Parameters: None
- Request Body:
  - full_name
  - phone_number
  - professional_title
  - bio
  - country
  - city
- Validation Rules:
  - fields must be valid and optional
- Success Response:
  - updated profile object
- Error Responses:
  - invalid input
- Status Codes:
  - 200 OK
  - 400 Bad Request
- Database Tables Used:
  - user_profiles
- AI Module Used:
  - None

---

## 10.3 Resume Module

### 11. Upload Resume
- Module Name: Resume
- Endpoint: /api/v1/resumes
- Method: POST
- Description: Upload a resume file for parsing.
- Authentication Required: Yes
- Request Parameters: None
- Request Body:
  - file
  - title (optional)
- Validation Rules:
  - file must be provided
  - supported types only
  - file size within limit
- Success Response:
  - resume metadata and upload confirmation
- Error Responses:
  - no file provided
  - unsupported format
  - file too large
- Status Codes:
  - 201 Created
  - 400 Bad Request
  - 413 Payload Too Large
- Database Tables Used:
  - resumes
- AI Module Used:
  - resume_parsing

### 12. Delete Resume
- Module Name: Resume
- Endpoint: /api/v1/resumes/{resume_id}
- Method: DELETE
- Description: Remove a previously uploaded resume.
- Authentication Required: Yes
- Request Parameters:
  - resume_id
- Request Body: None
- Validation Rules:
  - resume must belong to authenticated user
- Success Response:
  - deletion confirmation
- Error Responses:
  - resume not found
  - unauthorized access
- Status Codes:
  - 200 OK
  - 404 Not Found
- Database Tables Used:
  - resumes
  - resume_skills
- AI Module Used:
  - None

### 13. Resume History
- Module Name: Resume
- Endpoint: /api/v1/resumes/history
- Method: GET
- Description: List uploaded resumes for the user.
- Authentication Required: Yes
- Request Parameters:
  - page
  - page_size
  - sort
- Request Body: None
- Validation Rules:
  - pagination parameters must be positive integers
- Success Response:
  - paginated list of resumes
- Error Responses:
  - invalid pagination
- Status Codes:
  - 200 OK
  - 400 Bad Request
- Database Tables Used:
  - resumes
- AI Module Used:
  - None

### 14. Resume Details
- Module Name: Resume
- Endpoint: /api/v1/resumes/{resume_id}
- Method: GET
- Description: Retrieve details of a specific resume.
- Authentication Required: Yes
- Request Parameters:
  - resume_id
- Request Body: None
- Validation Rules:
  - resume must belong to authenticated user
- Success Response:
  - resume details and parsed metadata
- Error Responses:
  - resume not found
  - unauthorized access
- Status Codes:
  - 200 OK
  - 404 Not Found
- Database Tables Used:
  - resumes
  - resume_parsing_results
- AI Module Used:
  - None

### 15. Download Resume
- Module Name: Resume
- Endpoint: /api/v1/resumes/{resume_id}/download
- Method: GET
- Description: Download a previously uploaded resume file.
- Authentication Required: Yes
- Request Parameters:
  - resume_id
- Request Body: None
- Validation Rules:
  - file must exist
- Success Response:
  - file download response
- Error Responses:
  - file not found
- Status Codes:
  - 200 OK
  - 404 Not Found
- Database Tables Used:
  - resumes
- AI Module Used:
  - None

### 16. Parse Resume
- Module Name: Resume
- Endpoint: /api/v1/resumes/{resume_id}/parse
- Method: POST
- Description: Trigger parsing of an uploaded resume.
- Authentication Required: Yes
- Request Parameters:
  - resume_id
- Request Body: None
- Validation Rules:
  - resume must be uploaded and valid
- Success Response:
  - parsing started or completed response
- Error Responses:
  - resume not found
  - parsing failed
- Status Codes:
  - 200 OK
  - 202 Accepted
  - 400 Bad Request
- Database Tables Used:
  - resumes
  - resume_parsing_results
  - resume_skills
- AI Module Used:
  - resume_parsing

---

## 10.4 ATS Module

### 17. Generate ATS Report
- Module Name: ATS
- Endpoint: /api/v1/ats/reports
- Method: POST
- Description: Generate an ATS analysis report for a resume and optional job description.
- Authentication Required: Yes
- Request Parameters: None
- Request Body:
  - resume_id
  - job_description_id (optional)
- Validation Rules:
  - resume_id required
  - job_description_id must belong to authenticated user if provided
- Success Response:
  - generated ATS report object
- Error Responses:
  - invalid resume
  - missing parsed content
- Status Codes:
  - 201 Created
  - 400 Bad Request
- Database Tables Used:
  - ats_reports
  - resumes
  - job_descriptions
- AI Module Used:
  - ats

### 18. Get ATS Score
- Module Name: ATS
- Endpoint: /api/v1/ats/reports/{report_id}/score
- Method: GET
- Description: Retrieve the ATS score summary for a report.
- Authentication Required: Yes
- Request Parameters:
  - report_id
- Request Body: None
- Validation Rules:
  - report must belong to authenticated user
- Success Response:
  - score breakdown object
- Error Responses:
  - report not found
- Status Codes:
  - 200 OK
  - 404 Not Found
- Database Tables Used:
  - ats_reports
- AI Module Used:
  - ats

### 19. Keyword Analysis
- Module Name: ATS
- Endpoint: /api/v1/ats/reports/{report_id}/keywords
- Method: GET
- Description: Retrieve keyword analysis for the ATS report.
- Authentication Required: Yes
- Request Parameters:
  - report_id
- Request Body: None
- Validation Rules:
  - report must exist and belong to user
- Success Response:
  - keyword analysis payload
- Error Responses:
  - report not found
- Status Codes:
  - 200 OK
  - 404 Not Found
- Database Tables Used:
  - ats_reports
  - skills
- AI Module Used:
  - keyword_matching

### 20. Skills Analysis
- Module Name: ATS
- Endpoint: /api/v1/ats/reports/{report_id}/skills
- Method: GET
- Description: Retrieve skill gap and skill match analysis.
- Authentication Required: Yes
- Request Parameters:
  - report_id
- Request Body: None
- Validation Rules:
  - report must be valid
- Success Response:
  - skill analysis payload
- Error Responses:
  - report not found
- Status Codes:
  - 200 OK
  - 404 Not Found
- Database Tables Used:
  - ats_reports
  - resume_skills
  - job_description_skills
- AI Module Used:
  - skill_extraction

### 21. Resume Suggestions
- Module Name: ATS
- Endpoint: /api/v1/ats/reports/{report_id}/suggestions
- Method: GET
- Description: Retrieve improvement suggestions for the resume.
- Authentication Required: Yes
- Request Parameters:
  - report_id
- Request Body: None
- Validation Rules:
  - report must exist
- Success Response:
  - suggested improvements object
- Error Responses:
  - report not found
- Status Codes:
  - 200 OK
  - 404 Not Found
- Database Tables Used:
  - ats_reports
- AI Module Used:
  - resume_suggestions

### 22. Formatting Analysis
- Module Name: ATS
- Endpoint: /api/v1/ats/reports/{report_id}/formatting
- Method: GET
- Description: Retrieve formatting quality analysis.
- Authentication Required: Yes
- Request Parameters:
  - report_id
- Request Body: None
- Validation Rules:
  - report must belong to authenticated user
- Success Response:
  - formatting analysis payload
- Error Responses:
  - report not found
- Status Codes:
  - 200 OK
  - 404 Not Found
- Database Tables Used:
  - ats_reports
- AI Module Used:
  - ats

### 23. Grammar Analysis
- Module Name: ATS
- Endpoint: /api/v1/ats/reports/{report_id}/grammar
- Method: GET
- Description: Retrieve grammar and readability analysis.
- Authentication Required: Yes
- Request Parameters:
  - report_id
- Request Body: None
- Validation Rules:
  - report must belong to authenticated user
- Success Response:
  - grammar analysis payload
- Error Responses:
  - report not found
- Status Codes:
  - 200 OK
  - 404 Not Found
- Database Tables Used:
  - ats_reports
- AI Module Used:
  - ats

### 24. Download Report
- Module Name: ATS
- Endpoint: /api/v1/ats/reports/{report_id}/download
- Method: GET
- Description: Download an ATS report in PDF or other export format.
- Authentication Required: Yes
- Request Parameters:
  - report_id
- Request Body: None
- Validation Rules:
  - report must exist and belong to user
- Success Response:
  - file download response
- Error Responses:
  - report not found
- Status Codes:
  - 200 OK
  - 404 Not Found
- Database Tables Used:
  - ats_reports
- AI Module Used:
  - ats

---

## 10.5 Job Description Module

### 25. Upload Job Description
- Module Name: Job Description
- Endpoint: /api/v1/job-descriptions
- Method: POST
- Description: Upload a job description file.
- Authentication Required: Yes
- Request Parameters: None
- Request Body:
  - file
  - title (optional)
- Validation Rules:
  - file must be provided
  - supported format only
- Success Response:
  - job description metadata object
- Error Responses:
  - no file supplied
  - invalid format
- Status Codes:
  - 201 Created
  - 400 Bad Request
- Database Tables Used:
  - job_descriptions
- AI Module Used:
  - resume_parsing

### 26. Paste Job Description
- Module Name: Job Description
- Endpoint: /api/v1/job-descriptions/paste
- Method: POST
- Description: Create a job description from pasted text.
- Authentication Required: Yes
- Request Parameters: None
- Request Body:
  - title
  - description_text
  - company_name
  - location
- Validation Rules:
  - description_text must not be empty
- Success Response:
  - created job description object
- Error Responses:
  - invalid input
- Status Codes:
  - 201 Created
  - 400 Bad Request
- Database Tables Used:
  - job_descriptions
- AI Module Used:
  - skill_extraction

### 27. Get Job Description
- Module Name: Job Description
- Endpoint: /api/v1/job-descriptions/{job_description_id}
- Method: GET
- Description: Retrieve a specific job description.
- Authentication Required: Yes
- Request Parameters:
  - job_description_id
- Request Body: None
- Validation Rules:
  - job description must belong to authenticated user
- Success Response:
  - job description object
- Error Responses:
  - not found
- Status Codes:
  - 200 OK
  - 404 Not Found
- Database Tables Used:
  - job_descriptions
- AI Module Used:
  - None

### 28. Delete Job Description
- Module Name: Job Description
- Endpoint: /api/v1/job-descriptions/{job_description_id}
- Method: DELETE
- Description: Delete a stored job description.
- Authentication Required: Yes
- Request Parameters:
  - job_description_id
- Request Body: None
- Validation Rules:
  - job description must belong to user
- Success Response:
  - deletion confirmation
- Error Responses:
  - not found
- Status Codes:
  - 200 OK
  - 404 Not Found
- Database Tables Used:
  - job_descriptions
  - job_description_skills
- AI Module Used:
  - None

### 29. Resume vs Job Description Comparison
- Module Name: Job Description
- Endpoint: /api/v1/job-descriptions/{job_description_id}/compare
- Method: POST
- Description: Compare a resume against a job description.
- Authentication Required: Yes
- Request Parameters:
  - job_description_id
- Request Body:
  - resume_id
- Validation Rules:
  - resume and job description must belong to authenticated user
- Success Response:
  - comparison result object
- Error Responses:
  - invalid input
- Status Codes:
  - 200 OK
  - 400 Bad Request
- Database Tables Used:
  - resumes
  - job_descriptions
  - ats_reports
- AI Module Used:
  - job_matching

### 30. Match Percentage
- Module Name: Job Description
- Endpoint: /api/v1/job-descriptions/{job_description_id}/match-percentage
- Method: GET
- Description: Retrieve resume-to-job match percentage.
- Authentication Required: Yes
- Request Parameters:
  - job_description_id
  - resume_id
- Request Body: None
- Validation Rules:
  - both resources must be valid
- Success Response:
  - match percentage payload
- Error Responses:
  - invalid request
- Status Codes:
  - 200 OK
  - 400 Bad Request
- Database Tables Used:
  - ats_reports
  - skills
- AI Module Used:
  - job_matching

### 31. Missing Keywords
- Module Name: Job Description
- Endpoint: /api/v1/job-descriptions/{job_description_id}/missing-keywords
- Method: GET
- Description: Retrieve keywords missing from the resume.
- Authentication Required: Yes
- Request Parameters:
  - job_description_id
  - resume_id
- Request Body: None
- Validation Rules:
  - request must reference valid ids
- Success Response:
  - list of missing keywords
- Error Responses:
  - invalid request
- Status Codes:
  - 200 OK
  - 400 Bad Request
- Database Tables Used:
  - job_description_skills
  - resume_skills
- AI Module Used:
  - keyword_matching

### 32. Missing Skills
- Module Name: Job Description
- Endpoint: /api/v1/job-descriptions/{job_description_id}/missing-skills
- Method: GET
- Description: Retrieve skills missing from the resume.
- Authentication Required: Yes
- Request Parameters:
  - job_description_id
  - resume_id
- Request Body: None
- Validation Rules:
  - request must reference valid ids
- Success Response:
  - list of missing skills
- Error Responses:
  - invalid request
- Status Codes:
  - 200 OK
  - 400 Bad Request
- Database Tables Used:
  - job_description_skills
  - resume_skills
- AI Module Used:
  - skill_extraction

---

## 10.6 Interview Module

### 33. Start Interview
- Module Name: Interview
- Endpoint: /api/v1/interviews
- Method: POST
- Description: Start a new interview preparation session.
- Authentication Required: Yes
- Request Parameters: None
- Request Body:
  - resume_id
  - interview_type
  - difficulty_level
- Validation Rules:
  - resume_id required
  - interview_type must be supported
- Success Response:
  - interview session object
- Error Responses:
  - invalid resume
  - unsupported interview type
- Status Codes:
  - 201 Created
  - 400 Bad Request
- Database Tables Used:
  - interview_sessions
- AI Module Used:
  - interview

### 34. Generate Questions
- Module Name: Interview
- Endpoint: /api/v1/interviews/{interview_id}/questions
- Method: POST
- Description: Generate interview questions for a session.
- Authentication Required: Yes
- Request Parameters:
  - interview_id
- Request Body: None
- Validation Rules:
  - session must belong to user
- Success Response:
  - list of generated questions
- Error Responses:
  - session not found
- Status Codes:
  - 201 Created
  - 404 Not Found
- Database Tables Used:
  - interview_sessions
  - interview_questions
- AI Module Used:
  - interview

### 35. Submit Answer
- Module Name: Interview
- Endpoint: /api/v1/interviews/{interview_id}/answers
- Method: POST
- Description: Submit an answer to a generated question.
- Authentication Required: Yes
- Request Parameters:
  - interview_id
- Request Body:
  - question_id
  - answer_text
- Validation Rules:
  - answer text must not be empty
- Success Response:
  - answer submission confirmation
- Error Responses:
  - invalid question
  - empty answer
- Status Codes:
  - 201 Created
  - 400 Bad Request
- Database Tables Used:
  - interview_questions
- AI Module Used:
  - interview

### 36. Evaluate Answer
- Module Name: Interview
- Endpoint: /api/v1/interviews/{interview_id}/answers/{answer_id}/evaluate
- Method: POST
- Description: Evaluate a submitted answer.
- Authentication Required: Yes
- Request Parameters:
  - interview_id
  - answer_id
- Request Body: None
- Validation Rules:
  - valid answer record required
- Success Response:
  - evaluation payload
- Error Responses:
  - invalid answer
- Status Codes:
  - 200 OK
  - 404 Not Found
- Database Tables Used:
  - interview_feedback
- AI Module Used:
  - interview

### 37. Generate Feedback
- Module Name: Interview
- Endpoint: /api/v1/interviews/{interview_id}/feedback
- Method: GET
- Description: Retrieve overall feedback for the interview session.
- Authentication Required: Yes
- Request Parameters:
  - interview_id
- Request Body: None
- Validation Rules:
  - session must belong to user
- Success Response:
  - feedback summary object
- Error Responses:
  - session not found
- Status Codes:
  - 200 OK
  - 404 Not Found
- Database Tables Used:
  - interview_feedback
- AI Module Used:
  - interview

### 38. End Interview
- Module Name: Interview
- Endpoint: /api/v1/interviews/{interview_id}/end
- Method: PATCH
- Description: Mark an interview session as completed.
- Authentication Required: Yes
- Request Parameters:
  - interview_id
- Request Body: None
- Validation Rules:
  - session must belong to user
- Success Response:
  - updated session state
- Error Responses:
  - session not found
- Status Codes:
  - 200 OK
  - 404 Not Found
- Database Tables Used:
  - interview_sessions
- AI Module Used:
  - None

### 39. Interview History
- Module Name: Interview
- Endpoint: /api/v1/interviews/history
- Method: GET
- Description: List interview sessions for the authenticated user.
- Authentication Required: Yes
- Request Parameters:
  - page
  - page_size
- Request Body: None
- Validation Rules:
  - pagination parameters must be valid
- Success Response:
  - paginated interview history
- Error Responses:
  - invalid pagination
- Status Codes:
  - 200 OK
  - 400 Bad Request
- Database Tables Used:
  - interview_sessions
- AI Module Used:
  - None

### 40. Performance Analytics
- Module Name: Interview
- Endpoint: /api/v1/interviews/analytics
- Method: GET
- Description: Retrieve interview performance metrics for the user.
- Authentication Required: Yes
- Request Parameters:
  - start_date
  - end_date
- Request Body: None
- Validation Rules:
  - dates must be valid if supplied
- Success Response:
  - analytics summary object
- Error Responses:
  - invalid date range
- Status Codes:
  - 200 OK
  - 400 Bad Request
- Database Tables Used:
  - interview_sessions
  - interview_feedback
- AI Module Used:
  - interview

---

## 10.7 Dashboard Module

### 41. Dashboard Summary
- Module Name: Dashboard
- Endpoint: /api/v1/dashboard/summary
- Method: GET
- Description: Retrieve high-level dashboard summary for the user.
- Authentication Required: Yes
- Request Parameters:
  - period (optional)
- Request Body: None
- Validation Rules:
  - period must be supported if provided
- Success Response:
  - dashboard summary payload
- Error Responses:
  - invalid period
- Status Codes:
  - 200 OK
  - 400 Bad Request
- Database Tables Used:
  - resumes
  - ats_reports
  - interview_sessions
- AI Module Used:
  - None

### 42. Recent Reports
- Module Name: Dashboard
- Endpoint: /api/v1/dashboard/reports/recent
- Method: GET
- Description: Retrieve the most recent ATS reports.
- Authentication Required: Yes
- Request Parameters:
  - limit
- Request Body: None
- Validation Rules:
  - limit must be positive integer
- Success Response:
  - list of recent reports
- Error Responses:
  - invalid limit
- Status Codes:
  - 200 OK
  - 400 Bad Request
- Database Tables Used:
  - ats_reports
- AI Module Used:
  - None

### 43. Interview Progress
- Module Name: Dashboard
- Endpoint: /api/v1/dashboard/interviews/progress
- Method: GET
- Description: Retrieve progress metrics for interview sessions.
- Authentication Required: Yes
- Request Parameters:
  - period (optional)
- Request Body: None
- Validation Rules:
  - period must be supported if provided
- Success Response:
  - interview progress data
- Error Responses:
  - invalid period
- Status Codes:
  - 200 OK
  - 400 Bad Request
- Database Tables Used:
  - interview_sessions
- AI Module Used:
  - None

### 44. ATS History
- Module Name: Dashboard
- Endpoint: /api/v1/dashboard/ats-history
- Method: GET
- Description: Retrieve ATS analysis history over time.
- Authentication Required: Yes
- Request Parameters:
  - start_date
  - end_date
- Request Body: None
- Validation Rules:
  - dates must be valid
- Success Response:
  - ATS history data
- Error Responses:
  - invalid date range
- Status Codes:
  - 200 OK
  - 400 Bad Request
- Database Tables Used:
  - ats_reports
- AI Module Used:
  - None

### 45. User Statistics
- Module Name: Dashboard
- Endpoint: /api/v1/dashboard/statistics
- Method: GET
- Description: Retrieve user-level activity and usage statistics.
- Authentication Required: Yes
- Request Parameters:
  - period (optional)
- Request Body: None
- Validation Rules:
  - period must be supported if provided
- Success Response:
  - statistics payload
- Error Responses:
  - invalid period
- Status Codes:
  - 200 OK
  - 400 Bad Request
- Database Tables Used:
  - resumes
  - ats_reports
  - interview_sessions
- AI Module Used:
  - None

---

## 10.8 Settings Module

### 46. Update Profile
- Module Name: Settings
- Endpoint: /api/v1/settings/profile
- Method: PATCH
- Description: Update user profile fields in settings.
- Authentication Required: Yes
- Request Parameters: None
- Request Body:
  - full_name
  - phone_number
  - professional_title
  - bio
- Validation Rules:
  - fields must be valid if provided
- Success Response:
  - updated profile object
- Error Responses:
  - invalid input
- Status Codes:
  - 200 OK
  - 400 Bad Request
- Database Tables Used:
  - user_profiles
- AI Module Used:
  - None

### 47. Change Password
- Module Name: Settings
- Endpoint: /api/v1/settings/password
- Method: PATCH
- Description: Change the current user password.
- Authentication Required: Yes
- Request Parameters: None
- Request Body:
  - current_password
  - new_password
- Validation Rules:
  - current password must be correct
  - new password must meet strength rules
- Success Response:
  - password updated confirmation
- Error Responses:
  - incorrect password
  - weak new password
- Status Codes:
  - 200 OK
  - 400 Bad Request
- Database Tables Used:
  - users
- AI Module Used:
  - None

### 48. Notification Settings
- Module Name: Settings
- Endpoint: /api/v1/settings/notifications
- Method: PATCH
- Description: Update notification preferences.
- Authentication Required: Yes
- Request Parameters: None
- Request Body:
  - email_notifications
  - sms_notifications
- Validation Rules:
  - values must be boolean
- Success Response:
  - updated notification settings
- Error Responses:
  - invalid input
- Status Codes:
  - 200 OK
  - 400 Bad Request
- Database Tables Used:
  - user_settings
- AI Module Used:
  - None

### 49. Theme Settings
- Module Name: Settings
- Endpoint: /api/v1/settings/theme
- Method: PATCH
- Description: Update UI theme preferences.
- Authentication Required: Yes
- Request Parameters: None
- Request Body:
  - theme_mode
- Validation Rules:
  - theme mode must be supported
- Success Response:
  - updated theme preference
- Error Responses:
  - invalid theme value
- Status Codes:
  - 200 OK
  - 400 Bad Request
- Database Tables Used:
  - user_settings
- AI Module Used:
  - None

---

## 10.9 Admin Module

### 50. List Users
- Module Name: Admin
- Endpoint: /api/v1/admin/users
- Method: GET
- Description: Retrieve users for admin management.
- Authentication Required: Yes
- Request Parameters:
  - page
  - page_size
  - search
- Request Body: None
- Validation Rules:
  - admin role required
  - pagination values valid
- Success Response:
  - paginated user list
- Error Responses:
  - unauthorized
  - forbidden
- Status Codes:
  - 200 OK
  - 403 Forbidden
- Database Tables Used:
  - users
  - user_profiles
- AI Module Used:
  - None

### 51. Get User Details
- Module Name: Admin
- Endpoint: /api/v1/admin/users/{user_id}
- Method: GET
- Description: Retrieve detailed user information for an admin.
- Authentication Required: Yes
- Request Parameters:
  - user_id
- Request Body: None
- Validation Rules:
  - admin role required
- Success Response:
  - detailed user object
- Error Responses:
  - user not found
  - forbidden
- Status Codes:
  - 200 OK
  - 403 Forbidden
  - 404 Not Found
- Database Tables Used:
  - users
  - user_profiles
  - user_settings
- AI Module Used:
  - None

### 52. Disable User
- Module Name: Admin
- Endpoint: /api/v1/admin/users/{user_id}/disable
- Method: PATCH
- Description: Disable a user account.
- Authentication Required: Yes
- Request Parameters:
  - user_id
- Request Body: None
- Validation Rules:
  - admin role required
- Success Response:
  - user disabled confirmation
- Error Responses:
  - forbidden
  - user not found
- Status Codes:
  - 200 OK
  - 403 Forbidden
  - 404 Not Found
- Database Tables Used:
  - users
- AI Module Used:
  - None

### 53. Admin Analytics
- Module Name: Admin
- Endpoint: /api/v1/admin/analytics
- Method: GET
- Description: Retrieve system-wide analytics for administrators.
- Authentication Required: Yes
- Request Parameters:
  - period
- Request Body: None
- Validation Rules:
  - admin role required
- Success Response:
  - analytics payload
- Error Responses:
  - forbidden
- Status Codes:
  - 200 OK
  - 403 Forbidden
- Database Tables Used:
  - users
  - resumes
  - ats_reports
  - interview_sessions
- AI Module Used:
  - None

### 54. Admin Reports
- Module Name: Admin
- Endpoint: /api/v1/admin/reports
- Method: GET
- Description: Retrieve admin-level reports.
- Authentication Required: Yes
- Request Parameters:
  - start_date
  - end_date
- Request Body: None
- Validation Rules:
  - admin role required
- Success Response:
  - report list payload
- Error Responses:
  - forbidden
- Status Codes:
  - 200 OK
  - 403 Forbidden
- Database Tables Used:
  - ats_reports
  - interview_sessions
- AI Module Used:
  - None

### 55. Admin Logs
- Module Name: Admin
- Endpoint: /api/v1/admin/logs
- Method: GET
- Description: Retrieve system logs for support and auditing.
- Authentication Required: Yes
- Request Parameters:
  - page
  - page_size
- Request Body: None
- Validation Rules:
  - admin role required
- Success Response:
  - paginated log payload
- Error Responses:
  - forbidden
- Status Codes:
  - 200 OK
  - 403 Forbidden
- Database Tables Used:
  - audit_logs
- AI Module Used:
  - None

### 56. System Statistics
- Module Name: Admin
- Endpoint: /api/v1/admin/system-statistics
- Method: GET
- Description: Retrieve operational metrics for the system.
- Authentication Required: Yes
- Request Parameters:
  - period (optional)
- Request Body: None
- Validation Rules:
  - admin role required
- Success Response:
  - system statistics payload
- Error Responses:
  - forbidden
- Status Codes:
  - 200 OK
  - 403 Forbidden
- Database Tables Used:
  - users
  - resumes
  - ats_reports
  - interview_sessions
  - audit_logs
- AI Module Used:
  - None

---

## 11. API Naming Conventions

- Use lowercase resource names.
- Use hyphenated multi-word paths for readability, for example /job-descriptions.
- Use plural nouns for resource collections.
- Use action-specific subroutes only when the action is not a standard CRUD operation.
- Keep endpoint names descriptive and domain-driven.
- Avoid verbs in resource paths where possible.

---

## 12. Versioning Strategy

- Use /api/v1/ as the base path for the current stable API.
- Introduce a new major version for breaking changes.
- Keep backwards compatibility whenever possible.
- Versioning should be explicit in routing and documentation.

---

## 13. Error Handling Strategy

- Return consistent JSON error responses.
- Use standard HTTP status codes.
- Include an error code, message, and optional details.
- Do not expose internal stack traces to clients.
- Log server-side errors for support and debugging.

---

## 14. Response Format Standard

### Success Response
```json
{
  "success": true,
  "data": {},
  "message": "Operation completed successfully",
  "meta": {
    "timestamp": "2026-07-07T00:00:00Z"
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request is invalid",
    "details": []
  }
}
```

### Pagination Response
```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "page_size": 20,
    "total": 100,
    "total_pages": 5
  }
}
```

---

## 15. Security Best Practices

- Require authentication for all user-specific routes.
- Use role-based access control for admin endpoints.
- Validate all file uploads and limit file size.
- Use HTTPS in all environments.
- Do not expose secrets in responses or logs.
- Use signed tokens and refresh-token rotation where possible.
- Apply rate limiting for public endpoints.
- Enforce strict validation and sanitization on all input.

---

## 16. Final API Direction

The official backend contract for SmartHire AI will be centered around the following API modules:

- Authentication
- User profile
- Resume management
- ATS analysis and reporting
- Job description matching
- Interview preparation and feedback
- Dashboard analytics
- User settings
- Admin operations

This design ensures a scalable, production-ready API architecture that supports both current features and future expansion.
