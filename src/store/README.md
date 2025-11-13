# Store Documentation

## Overview
This store module uses Zustand for state management, providing a simple and efficient way to handle application state with TypeScript support and persistence.

## Directory Structure

```
src/store/
├── index.ts
├── middleware/
├── slices/
│   ├── auth/
│   ├── sidebar/
│   └── language/
```

## Store Slices
Store slices are modular pieces of state management, each handling a specific domain of the application. Using Zustand with TypeScript provides type-safe and efficient state management.

## Core Slices

### 1. Auth Slice
Manages authentication and user state.

### 2. UI Slice
Manages UI state like theme, sidebar, and modals.

### 3. Data Slice
Manages application data caching and updates.

### 4. Language Slice
Manages the application's language settings.

## Middleware
Middleware in Zustand provides a way to extend store functionality with additional features like persistence, logging, validation, and more.

### Core Middleware Types
#### 1. Persistence
Saves store state to storage (localStorage, sessionStorage, etc.)

### 2. Logger Middleware
Logs state changes for debugging



