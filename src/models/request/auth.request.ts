export interface SignUpRequest {
    name: string;
    phone_number: string;
    password: string;
}

export interface LoginRequest {
    phone_number: string;
    password: string;
}

export interface LogoutRequest {
    phone_number: string
}