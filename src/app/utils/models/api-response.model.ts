export class ApiResponse<T> {
    success: boolean;
    data: T;
    errors: string[];
}