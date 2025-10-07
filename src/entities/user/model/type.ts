export interface UserProfile {
    email: string;
    username: string;
    name?: string | null;
    birthday?: string | null;
    height?: number | null;
    weight?: number | null;
    interests?: string[] | null;
    horoscope?: string | null;
    zodiac?: string | null;
}

export interface AuthState {
    profile: UserProfile | null;
    token: string | null;
    setAuth: (token: string, profile: UserProfile | null) => void;
    setProfile: (profile: UserProfile) => void; 
    logout: () => void;
    _hasHydrated?: boolean;
}