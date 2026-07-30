# 🧠 Rahand Cars - Architecture Decisions

This document records the important architectural and business decisions made throughout the development of Rahand Cars.

Each decision includes the reason behind it to help future contributors understand why it was made.

---

# Decision 001

## Project Name

**Rahand Cars**

### Status

Approved

### Reason

The original project name was **iQ Cars**.

The project was rebranded to **Rahand Cars** to establish a unique identity suitable for long-term business growth in Iraq and Kurdistan.

All branding, application assets, documentation, metadata, splash screens, icons, and future marketing materials will use the Rahand Cars brand.

---

# Decision 002

## Platform Strategy

### Decision

Mobile Application Only

### Status

Approved

### Reason

The original project included a web application.

After evaluating the business goals, the decision was made to focus entirely on mobile development.

Primary platforms:

- Android
- iPhone (iOS)

A web application may be reconsidered in the future, but it is currently outside the project scope.

---

# Decision 003

## Mobile Framework

### Decision

React Native + Expo

### Status

Approved

### Reason

Expo provides:

- Faster development
- Excellent developer experience
- Easier deployment
- Cross-platform support
- Strong ecosystem
- OTA updates
- Excellent compatibility with future features

---

# Decision 004

## Navigation

### Decision

Expo Router

### Status

Approved

### Reason

Expo Router follows the official Expo recommendation and provides scalable file-based routing for large applications.

---

# Decision 005

## Backend

### Decision

Supabase

### Status

Approved

### Reason

Supabase offers:

- Authentication
- PostgreSQL database
- Storage
- Realtime features
- Row Level Security
- Scalability

without requiring backend infrastructure from day one.

---

# Decision 006

## Languages

### Decision

Three Languages

### Status

Approved

### Supported Languages

- English
- Arabic
- Kurdish

Arabic and Kurdish must fully support RTL layouts.

---

# Decision 007

## Development Process

### Decision

Phase-Based Development

### Status

Approved

### Reason

The application is too large to build in one step.

Development will proceed through clearly defined phases.

Each phase must:

- be completed
- reviewed
- approved

before the next phase begins.

---

# Decision 008

## Development Workflow

### Decision

Three-Level Review Process

### Status

Approved

### Workflow

ChatGPT

- CTO
- Architecture
- Product Strategy
- Roadmap
- Technical Decisions

Replit

- Implementation
- Coding
- Refactoring

Claude

- Repository Review
- Bug Detection
- TypeScript Validation
- Architecture Review

This workflow ensures code quality before moving to the next phase.

---

# Decision 009

## AI Features

### Decision

AI is a Core Product Feature

### Status

Approved

### Planned Features

- AI Price Estimator
- AI VIN Scanner
- AI License Plate Scanner
- AI Image Enhancement
- AI Search Assistant
- AI Buyer & Dealer Matching
- AI Description Generator

If a feature cannot be implemented immediately, a placeholder will be created until the final implementation phase.

---

# Future Decisions

Additional architecture and business decisions will be documented here as the project evolves.



# Decision 010

## UI Review Policy

Status

Approved

Reason

A development phase cannot be marked as complete until both:

- Technical review
- UI/UX review

have been completed successfully.
