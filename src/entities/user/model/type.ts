export interface UserProfile {
    email: string;
    username: string;
}

export interface AuthState {
    profile: UserProfile | null;
    token: string | null;
    setAuth: (token: string, profile: UserProfile | null) => void;
    logout: () => void;
}