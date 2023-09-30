/* Defines the user entity */
export interface User {
    // TODO add GUID
    userId?: number;
    isAdmin?: boolean;
    userName: string;
    userPassword: string; // TODO create encryption for user info
}

/* Wrapper class for API response */
export interface UserDto {
    user?: User | null;
    error?: {
        responseStatus: string | null;
        errorMessage: string | null;
    } | null;
}