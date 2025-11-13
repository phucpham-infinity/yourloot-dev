# API Services Documentation

## Overview
The API Services module provides a centralized interface for interacting with REST API endpoints. It includes HTTP client configuration, interceptors, and type definitions for consistent API communication.

## Directory Structure

```
src/services/
├── api/ # HTTP client and configuration
├── core/ # Shared types and utilities
├── features/ # Feature-specific services 
```

## API Client

The `api` module provides a centralized HTTP client configuration and interceptors:

```typescript
import { httpClient, API_ENDPOINTS } from '@/services/api';
const user = await userService.getUser('123');
```

## Core Types

The `core` module defines shared types and utilities:

```typescript
import { ApiResponse, ApiError, PaginationParams } from '@/services/core/types';
```

## API Endpoints

The `api/config/endpoints.ts` file defines the API endpoints:

```typescript
import { API_ENDPOINTS } from '@/services/api/config/endpoints';
```

## API Interceptors

The `api/interceptors` module contains interceptors for API requests and responses:

```typescript
import { setupAuthInterceptor } from '@/services/api/interceptors/auth.interceptor';
```

## Feature Services

The `features` module contains feature-specific services:

```typescript
import { userService } from '@/services/features/user-service';
```

