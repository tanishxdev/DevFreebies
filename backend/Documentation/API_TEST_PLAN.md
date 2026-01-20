# DevFreebies – API Testing & Quality Services Project

## Role Alignment

Target Role: **Associate, Quality Services (Manual / API Testing)**

This project demonstrates hands-on experience with:

* Manual test execution using documented instructions
* API testing using Postman
* Validation of functional flows, edge cases, and error handling
* Process adherence, accurate reporting, and structured testing

---

## Project Overview

**DevFreebies** is a backend-driven platform where users can discover, submit, and manage free developer resources. The system includes user authentication, role-based access (user/admin), moderation workflows, and advanced querying.

This project was treated as a **testable system**, not just a development build. All APIs were manually verified using Postman with real scenarios.

---

## System Under Test (SUT)

### Tech Stack

* Backend: Node.js, Express.js
* Database: MongoDB
* Authentication: JWT-based auth
* API Testing Tool: Postman
* Version Control: Git

---

## Test Scope

### In-Scope

* Authentication APIs
* User workflows
* Admin moderation workflows
* Resource lifecycle (create → approve → feature → consume)
* Authorization & access control
* Query handling (pagination, filters, search, sort)

### Out-of-Scope

* UI automation
* Performance / load testing
* Security penetration testing

---

## Test Environment

* Base URL: `http://localhost:5000`
* Auth Mechanism: Bearer Token (JWT)
* Test Data: Dynamically generated via Postman pre-request scripts

---

## API Coverage Summary

### 1. Authentication Module

**Endpoints Tested**

* POST /api/auth/register
* POST /api/auth/login
* GET /api/auth/me (Protected)

**Validations Performed**

* Status code correctness (200 / 201)
* Token generation and persistence
* Invalid credential handling
* Authorization enforcement on protected routes

---

### 2. Resource Management (Public + User)

**Endpoints Tested**

* GET /api/resources
* GET /api/resources/:id
* POST /api/resources (Authenticated)
* PUT /api/resources/:id
* DELETE /api/resources/:id
* PUT /api/resources/:id/upvote

**Test Scenarios**

* Resource creation with valid and invalid payloads
* Ownership validation during update/delete
* Idempotency of upvote
* Empty dataset handling

---

### 3. User Features

**Endpoints Tested**

* GET /api/users/me
* PUT /api/users/profile
* PUT /api/users/bookmark/:resourceId
* GET /api/users/bookmarks

**Validations**

* Bookmark toggle behavior
* Profile update accuracy
* Token-based user isolation

---

### 4. Admin Workflows (Critical for QS Role)

**Endpoints Tested**

* GET /api/admin/resources/pending
* POST /api/admin/resources/:id/approve
* POST /api/admin/resources/:id/feature

**Test Focus**

* Role-based access control (admin vs user)
* State transitions (pending → approved → featured)
* Unauthorized access rejection

---

### 5. Advanced Queries

**Scenarios Tested**

* Pagination (page, limit)
* Filtering by category
* Search by keyword
* Sorting by upvotes
* Combined query handling

**Validation Points**

* Correct dataset slicing
* Consistent metadata
* Query parameter precedence

---

## Test Execution Approach

* Each endpoint was tested manually using Postman
* Happy path and negative cases were executed
* Tokens and IDs were reused via collection variables
* Responses were validated for:

  * HTTP status
  * Schema correctness
  * Business logic accuracy

---

## Defects Identified & Fixed (Examples)

* Pagination returning incorrect counts
* Missing authorization checks on admin routes (early stage)
* Incorrect error messages for invalid inputs

(All issues were reproduced, logged, and resolved during development)

---

## Documentation & Process Adherence

* Maintained structured Postman collections
* Used naming conventions for clarity
* Followed repeatable test steps
* Ensured accurate and prompt result validation

---

## Why This Project Fits Quality Services Roles

This project directly demonstrates:

* Manual test execution against documented APIs
* Understanding of test procedures and tools
* Accurate result reporting
* Detection and communication of deviations
* Strong process discipline

It mirrors real QS work: execute instructions, validate outcomes, report issues.

---

## Artifacts Provided

* Complete Postman Collection (Authentication, User, Admin, Queries)
* Environment variables and test scripts
* Realistic API workflows and role-based testing

---

## Next Enhancements (Optional)

* Test case document (Excel / Markdown)
* Defect log with severity levels
* Basic automation using Postman/Newman
* Boundary value analysis for inputs

---

## Summary

DevFreebies was intentionally tested as a **quality-first system**. The project proves readiness for entry-level Quality Services roles requiring precision, discipline, and strong understanding of application behavior.
