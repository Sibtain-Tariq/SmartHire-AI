# SmartHire AI - Official UI/UX Design Specification

This document defines the official UI/UX design system and product experience for SmartHire AI. It must be followed for all frontend design, interaction design, and product experience decisions.

---

## 1. Product Design Direction

SmartHire AI should feel like a premium, modern AI SaaS product rather than a student project. The experience should be:

- Modern
- Clean
- Minimal
- Professional
- Elegant
- Trustworthy
- Fast
- Accessible
- Responsive
- Polished

The visual tone should communicate intelligence, precision, and clarity while remaining calm and non-overwhelming.

---

## 2. Design Principles

- Prioritize clarity over decoration.
- Use generous spacing and clean hierarchy.
- Keep the interface calm and focused.
- Make AI features feel helpful, not gimmicky.
- Keep interactions fast and predictable.
- Use a restrained color system with premium contrast.
- Maintain visual consistency across all pages.
- Design for desktop-first but optimize strongly for tablet and mobile.
- Favor subtle motion over excessive animation.

---

## 3. Visual Style

### Style Summary
- Modern SaaS
- Minimal and premium
- Glassmorphism used sparingly
- Soft shadows
- Rounded corners
- Spacious layout
- Light, airy surfaces
- Strong information hierarchy

### Design Personality
The product should feel intelligent, confident, and polished. The interface should help users trust the AI analysis and focus on their career outcomes.

---

## 4. Color Palette

### Primary Color
- Deep Indigo
- Purpose: Establishes trust, seriousness, and premium product identity.
- Use: Primary buttons, active navigation, key CTAs, highlights.

### Secondary Color
- Slate Blue
- Purpose: Supports the primary color while keeping the interface calm and professional.
- Use: Secondary actions, neutral emphasis, section headers.

### Accent Color
- Electric Cyan
- Purpose: Adds modern AI energy and visual freshness without overpowering the interface.
- Use: AI indicators, progress highlights, feature pills, selected states.

### Background Color
- Soft Off-White
- Purpose: Keeps the product clean and light.
- Use: Main page backgrounds and large surfaces.

### Surface Color
- Pure White
- Purpose: Creates contrast for cards, panels, inputs, and content blocks.
- Use: Cards, side panels, modal surfaces, form containers.

### Success
- Emerald Green
- Purpose: Communicates positive outcomes and completed actions.
- Use: Success states, completed uploads, positive ATS scores.

### Warning
- Amber
- Purpose: Signals caution or review needed.
- Use: Incomplete uploads, soft warnings, review suggestions.

### Danger
- Rose Red
- Purpose: Communicates errors or destructive actions.
- Use: Error states, failed uploads, delete actions.

### Info
- Sky Blue
- Purpose: Signals helpful information or AI-generated insights.
- Use: Neutral alerts, informational messages, suggestions.

### Text Colors
- Charcoal Gray for headings and primary text
- Muted Slate for supporting text
- Soft Gray for tertiary labels

### Border Colors
- Light neutral border tones
- Slightly darker borders for emphasis and hierarchy

### Hover Colors
- Slightly darker shade of the base state
- Preserve softness and avoid harsh contrast

### Disabled Colors
- Low-contrast gray tones
- Clear visual differentiation without feeling broken

### Why this palette works
The palette creates a premium, trustworthy SaaS feel while supporting an AI product identity. It is restrained enough to look professional and flexible enough to highlight key actions and success states.

---

## 5. Typography

### Primary Font
- Inter
- Purpose: Clean, modern, highly readable, and widely used in SaaS products.
- Why: It offers strong clarity at both small and large sizes and feels polished without being overly corporate.

### Secondary Font
- Manrope
- Purpose: A modern, slightly softer alternative for headings and display text.
- Why: It gives the interface warmth and personality while staying professional.

### Heading Sizes
- H1: 40–48px desktop
- H2: 30–36px
- H3: 24–28px
- H4: 20–22px
- H5: 16–18px

### Body Sizes
- Body Large: 16–18px
- Body Regular: 14–16px
- Body Small: 12–13px

### Button Font
- Medium weight, 14–16px

### Line Heights
- Headings: 1.1–1.25
- Body: 1.5–1.7

### Font Weights
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

### Letter Spacing
- Slightly tight for headings
- Normal for body copy
- Minimal for buttons

### Why these fonts improve readability
Inter provides excellent readability for UI and long-form content, while Manrope adds a refined product-like feel for product labels and headings.

---

## 6. Design System Components

### Buttons
- Purpose: Primary call-to-action and secondary interactions.
- Variants:
  - Primary
  - Secondary
  - Ghost
  - Danger
  - Icon Button
- States:
  - Default
  - Hover
  - Active
  - Focus
  - Disabled
  - Loading
- Best Practices:
  - Keep button hierarchy clear.
  - Use one primary CTA per major section.
  - Avoid overusing button styles.

### Input Fields
- Purpose: Collect structured user data.
- Variants:
  - Text
  - Email
  - Password
  - Search
  - Textarea
- States:
  - Default
  - Focus
  - Error
  - Success
  - Disabled
- Best Practices:
  - Use clear labels and helper text.
  - Keep fields visually simple and easy to scan.

### Dropdowns
- Purpose: Select one option from a set.
- Variants:
  - Single select
  - Multi-select
  - Searchable select
- States:
  - Default
  - Open
  - Active
  - Error
- Best Practices:
  - Keep menu options concise.
  - Show clear selected state.

### Cards
- Purpose: Group related information and actions.
- Variants:
  - Summary card
  - Feature card
  - Report card
  - Analytics card
- States:
  - Default
  - Hover
  - Selected
- Best Practices:
  - Use consistent padding and hierarchy.
  - Avoid card clutter.

### Tables
- Purpose: Display structured lists and records.
- Variants:
  - Simple table
  - Data table
  - Responsive stacked table on mobile
- States:
  - Header
  - Row hover
  - Selected row
  - Empty state
- Best Practices:
  - Keep headers concise.
  - Use zebra striping sparingly.

### Badges
- Purpose: Show status, category, or label.
- Variants:
  - Neutral
  - Success
  - Warning
  - Danger
  - Info
- Best Practices:
  - Keep labels short.
  - Use consistent color meanings.

### Tags
- Purpose: Show keywords or quick filters.
- Variants:
  - Default
  - Interactive
- Best Practices:
  - Use for short labels and filters.

### Alerts
- Purpose: Communicate system or user feedback.
- Variants:
  - Info
  - Success
  - Warning
  - Error
- Best Practices:
  - Keep messages concise and actionable.

### Progress Bars
- Purpose: Show completion and score levels.
- Variants:
  - Linear progress
  - Circular progress
- Best Practices:
  - Use clear labels and visual score mapping.

### Charts
- Purpose: Display analytics and score trends.
- Variants:
  - Line chart
  - Bar chart
  - Donut chart
- Best Practices:
  - Keep charts minimal and readable.
  - Avoid too many series in one view.

### Modals
- Purpose: Focused task or confirmation flows.
- Variants:
  - Confirmation
  - Form modal
  - Preview modal
- States:
  - Open
  - Loading
  - Error
- Best Practices:
  - Use for short tasks only.
  - Keep the content concise.

### Drawers
- Purpose: Display secondary content or settings panels.
- Variants:
  - Right drawer
  - Left drawer
- Best Practices:
  - Use for contextual editing or filters.

### Tabs
- Purpose: Switch between related content sections.
- Variants:
  - Horizontal tabs
  - Pill tabs
- Best Practices:
  - Use fewer than 5 tabs when possible.

### Accordions
- Purpose: Collapse less important content.
- Variants:
  - Standard accordion
  - FAQ accordion
- Best Practices:
  - Keep content concise and scannable.

### Tooltips
- Purpose: Provide lightweight contextual explanations.
- Best Practices:
  - Keep text short.
  - Use for non-critical hints.

### Breadcrumbs
- Purpose: Show navigation context.
- Best Practices:
  - Use on nested pages such as report details or admin views.

### Pagination
- Purpose: Split large datasets into manageable pages.
- Best Practices:
  - Keep control simple and consistent.

### Loading Skeletons
- Purpose: Improve perceived performance during content loading.
- Best Practices:
  - Match the structure of the upcoming content.

### Empty States
- Purpose: Guide users when no data exists.
- Best Practices:
  - Provide a clear explanation and a next action.

### Error States
- Purpose: Communicate what failed and how to recover.
- Best Practices:
  - Show a clear message and a primary recovery action.

### Success Messages
- Purpose: Confirm successful actions.
- Best Practices:
  - Use short, reassuring text.

### Icons
- Purpose: Improve clarity and reduce cognitive load.
- Style: Rounded, clean, and consistent.
- Best Practices:
  - Use one icon style throughout the product.

### Illustrations
- Purpose: Add visual warmth and product personality.
- Style: Minimal, abstract, AI-inspired, soft gradients.
- Best Practices:
  - Use illustrations sparingly and only where they improve understanding.

### Animations
- Purpose: Make the interface feel alive and polished.
- Types:
  - Fade-in
  - Slide-up
  - Hover transitions
  - Micro-interactions
- Best Practices:
  - Keep motion subtle and purposeful.

---

## 7. Layout System

### Navbar
- Purpose: Global navigation and product identity.
- Desktop: horizontal top bar with logo, navigation links, actions, and profile.
- Tablet: condensed nav with menu toggle.
- Mobile: compact navigation with hamburger menu and sticky action area.

### Sidebar
- Purpose: Primary app navigation for logged-in users.
- Desktop: persistent left sidebar.
- Tablet: collapsible sidebar.
- Mobile: hidden behind a menu button.

### Top Navigation
- Purpose: Quick access to search, notifications, account actions.
- Use: Header with search and profile completion states.

### Footer
- Purpose: Support links and legal information on public marketing pages.
- Use: Minimal, clean, and understated.

### Page Containers
- Desktop: max-width content area with generous margins.
- Tablet: slightly reduced spacing.
- Mobile: full-width content and stacked sections.

### Cards
- Purpose: Group related information into manageable blocks.
- Use: Soft borders, rounded corners, subtle shadow.

### Sections
- Use clearly separated vertical spacing between sections.
- Keep each section focused on one job.

### Grid System
- Use a 12-column grid on desktop.
- Use 8-column on tablet.
- Use 4-column on mobile.

### Spacing System
- Base spacing unit: 8px.
- Use consistent spacing multiples.
- Keep vertical rhythm strong and predictable.

### Responsive Breakpoints
- Mobile: below 768px
- Tablet: 768px–1023px
- Desktop: 1024px and above

---

## 8. Page-by-Page UI Description

## 8.1 Landing Page

### Structure
- Hero section with strong headline, subheadline, CTA, and visual preview
- Feature cards highlighting ATS analysis, resume scoring, interview prep, and AI insights
- How it works section with 3-step flow
- ATS preview section with polished mock analysis panel
- Interview preview section showing a conversational AI experience
- Testimonials section with credibility signals
- Pricing placeholder section
- FAQ section
- Contact CTA footer

### Visual Direction
- Large open whitespace
- Premium product hero visual
- Soft gradients and subtle glass surfaces
- Clear CTAs for sign up and demo

### Interaction
- Hover animations on feature cards
- Smooth scroll and subtle section transitions
- Focus on clarity and product credibility

---

## 8.2 Authentication Pages

### Login
- Clean centered card layout
- Email and password fields
- Primary CTA
- Forgot password link
- Sign up link
- Friendly supporting text

### Register
- Multi-step or single-card form
- Name, email, password, accept terms
- Strong validation feedback
- Seamless transition to email verification

### Forgot Password
- Minimal form with email input
- Clear success state

### Reset Password
- New password and confirm password fields
- Clear validation state

### Email Verification
- Clear status panel with success or pending state
- Friendly guidance and resend option

---

## 8.3 Dashboard

### Layout
- Overview cards summarizing resumes, ATS scores, interview progress, and reports
- Recent reports panel
- ATS score trend chart
- Upcoming interview panel
- Quick actions panel for upload resume and start interview

### Visual Direction
- Low-friction dashboard with strong hierarchy
- Use cards with subtle borders and soft shadows
- Display important metrics clearly and prominently

---

## 8.4 Resume Module

### Upload Resume
- Drag-and-drop upload zone
- Clear accepted file types and size guidance
- Upload progress bar
- Success and error states
- Optional resume title input

### Resume History
- List of uploaded resumes with status, date, and action buttons
- Filter and search toolbar
- Empty state for no resumes yet

### Resume Details
- Structured summary of parsed information
- Sections for experience, skills, education, projects
- CTA buttons for ATS analysis and interview prep

---

## 8.5 ATS Report Page

### Layout
- Header with resume title and report date
- Score card with overall ATS match percentage
- Visual broken down into sections: formatting, keywords, skills, experience, grammar
- Suggestions panel with actionable next steps
- Download report button
- Tabs for overview, analysis, and suggestions

### Visual Direction
- Make scores feel clear and motivating
- Use color-coded indicators that remain professional
- Keep each analysis block digestible

---

## 8.6 Job Matching Page

### Layout
- Upload or paste job description panel
- Resume comparison panel
- Match percentage card
- Strengths and weaknesses sections
- Missing keywords and skill gaps list
- Recommendations panel

### Interaction
- Show changes in real time when a JD is pasted or uploaded
- Highlight matches and gaps elegantly

---

## 8.7 Interview Module

### Interview Home
- Start interview CTA
- Resume-based personalization message
- Session history cards

### Question Screen
- Large, focused question area
- Timer and progress indicator
- Clean answer box with voice or text input support conceptually
- Next question action

### Feedback Screen
- Score summary
- Suggestions and strengths
- Progress over time

### Interview History
- List of sessions with scores and outcomes

---

## 8.8 Profile Page

### Layout
- Profile summary card
- Resume list section
- Activity/history section
- Settings shortcuts
- Achievement or milestone block

---

## 8.9 Settings Page

### Sections
- Theme preferences
- Notification preferences
- Password update
- Account and privacy controls

### Interaction
- Toggle switches with clear states
- Minimal friction and easy save actions

---

## 8.10 Admin Dashboard

### Layout
- KPI cards for active users, reports generated, interview sessions, system health
- Analytics charts for usage trends
- Admin tables for users, reports, and logs
- Activity feed and issue monitoring section

---

## 9. User Experience Design

### Loading Experience
- Use skeleton screens for dashboards, reports, and file uploads.
- Show progress indicators during AI processing.
- Keep loading states elegant and informative.

### Error Experience
- Show inline validation errors with visual clarity.
- Use calm, actionable messaging.
- Avoid red-only or alarming error styling.

### Success Experience
- Confirm completed actions with subtle success feedback.
- Use success badges and micro-animations for positive reinforcement.

### Navigation Flow
- Users should be able to complete core tasks in 3–4 clicks.
- Main flows: upload resume → parse → generate ATS report → match job → prepare for interview.

### Accessibility
- Maintain strong color contrast.
- Use descriptive labels and visible focus states.
- Ensure touch targets are large enough.
- Support keyboard navigation across the app.

### Keyboard Navigation
- Logical tab order
- Visible focus states
- Accessible controls for modals and dropdowns

### Responsive Behaviour
- Desktop: feature-rich, multi-column layouts
- Tablet: condensed but still comprehensive
- Mobile: stacked single-column flows with gesture-friendly controls

### Micro-interactions
- Subtle hover states
- Smooth transitions on cards and inputs
- Soft loading animations
- Elegant toast feedback

### Animations
- Short durations
- Ease-out transitions
- Minimal visual noise

### Empty States
- Friendly, guided, and actionable
- Avoid blank screens

---

## 10. Visual Consistency Recommendations

### Icon Library
- Use a single modern outline icon style.
- Keep stroke weight consistent.

### Illustration Style
- Minimal, abstract, slightly futuristic, AI-inspired.
- Use soft gradients and clean lines.

### Chart Library
- Simple, polished, and high-contrast.
- Keep chart styling consistent with the brand.

### Avatar Style
- Clean circular avatars with subtle initials fallback.

### Card Style
- Soft border, rounded corners, light shadow, airy padding.

### Button Style
- Rounded, medium weight, clear hierarchy.

### Spacing Rules
- Use 8px base units.
- Keep vertical rhythm consistent.

### Border Radius
- Buttons: 10–12px
- Cards: 16–20px
- Modals: 20–24px

### Shadow System
- Subtle shadow for elevation
- Light shadow for cards
- Soft shadow for hover states

---

## 11. User Journey

### Primary User Journey
1. Visitor lands on the marketing site.
2. User sees a polished product promise and CTA.
3. User signs up or logs in.
4. User uploads a resume.
5. System parses and analyzes the resume.
6. User views ATS score and improvement suggestions.
7. User uploads or pastes a job description.
8. User reviews match results and missing skills.
9. User enters interview prep flow.
10. User reviews feedback and improves performance.

### Secondary Journey
- User returns to dashboard to review previous reports.
- User updates profile and settings.
- Admin monitors usage and reports.

---

## 12. Final UI Recommendations

- Use a premium SaaS visual language with restrained color and strong whitespace.
- Keep the product polished and calm rather than flashy.
- Use AI features as subtle enhancers rather than decorative elements.
- Make progress and results the central user focus.
- Ensure the interface feels intuitive from first use.
- Prioritize trust, clarity, and premium presentation in every screen.
- Design every page so the user always knows what to do next.

This is the official UI/UX reference for SmartHire AI and should guide all frontend design decisions.
