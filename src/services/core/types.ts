export type ApiResponse<T> = {
    data: T;                    // Generic data type
    status: number;             // HTTP status code
    message: string;            // Response message
    metadata?: {               // Optional metadata
      page?: number;
      limit?: number;
      total?: number;
    };
  };
  
  // Error response type
  export type ApiError = {
    status: number;            // HTTP error status
    code: string;             // Error code
    message: string;          // Error message
    details?: unknown;        // Additional error details
  };
  
  // Pagination params
  export type PaginationParams = {
    page?: number;
    limit?: number;
    sort?: string;
  };