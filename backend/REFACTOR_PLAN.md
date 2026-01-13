# Backend Refactoring Plan - The Companion

## 1. Objectives
- Improve code quality, maintainability, and performance.
- Standardize response handling and error management.
- Fix existing bugs and logic errors.
- Enhance type safety across the application.
- Address typos and naming inconsistencies.

## 2. Identified Issues
- **Response Handling**: Consistent use of `res.sendMessage` but no implementation.
- **Error Handling**: Missing global error handler; `AppError` used but not caught centrally.
- **Logic Bugs**:
    - `generateAcessToken` throws if secret exists instead of if it's missing.
    - `updateComapanion` controller calls `create` service method.
    - `validate` middleware doesn't return responses or continue on error.
- **Typing**: Excessive use of `any` types.
- **Naming**: Typos like `comapanion`, `passowrd`, `langauge` in schema (actually schema says `langauge`, need to check if I should fix schema too).
- **Architecture**: Simple object-based services can be improved for better testability and structure.

## 3. Systematic Refactor Steps

### Phase 1: Infrastructure & Middlewares
1. **Response Utility**: Implement a middleware to attach `sendSuccess` and `sendError` methods (or a unified `sendResponse`) to the `res` object.
2. **Global Error Handler**: Create a central middleware to catch all errors, log them, and return a consistent JSON response.
3. **Environment Validation**: Use `zod` to validate `process.env` on startup to prevent runtime crashes due to missing configuration.
4. **Prisma Singleton**: Ensure the Prisma client is instantiated only once.

### Phase 2: Domain Logic (Auth & Companions)
1. **Typo Correction**: Rename files and variables to correct spelling (e.g., `comapanion` -> `companion`).
2. **Service Refactor**:
    - Standardize services using classes or consistent export patterns.
    - Add proper TypeScript types for payloads and return values.
    - Fix logic in `AuthService` and `CompanionService`.
3. **Controller Refactor**:
    - Consolidate response calls using the new utility methods.
    - Ensure all routes are protected where necessary.

### Phase 3: Validation & Routing
1. **Zod Validation**: Improve the `validate` middleware to provide detailed error messages (field-specific) from Zod.
2. **Route Alignment**: Ensure routes match the RESTful naming conventions and use the refactored controllers.

### Phase 4: Testing & Verification
1. Verify the bootstrap process works (DB connection, env loading).
2. Manually test key flows: Register, Login, Create Companion.

## 4. Rationale for Changes
- **Centralized Error Handling**: Reduces boilerplate in controllers and ensures the API always returns a predictable structure, even on crash.
- **Environment Validation**: Fail-fast mechanism; it's better to crash at startup than to fail silently when a JWT secret or DB URL is missing.
- **Type Safety**: Reduces "undefined is not a function" errors and provides better developer experience (IntelliSense).
- **Naming Consistency**: Improves code readability and searchability.
