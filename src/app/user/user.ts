/* Defines the user entity */
export interface User {
    userId?: number;
    isAdmin?: boolean;
    userName: string;
    userPassword: string; // TODO create encryption for user info
}