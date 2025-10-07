'use client';

import { useEffect, useState } from "react";
import { useUserStore } from "../model/store";
import { getProfile } from "../api/getProfile";

export const userProfile = () => {
    const {profile, setProfile, token} = useUserStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfileOnLoad = async () => {
            if(token && !profile){
                setIsLoading(true);
                setError(null)

                try {
                    const freshProfile = await getProfile();
                    setProfile(freshProfile);
                } catch (err: any) {
                    setError(err.message || "Failed to refresh profile.");
                } finally {
                    setIsLoading(false);
                }
            }
        }

        fetchProfileOnLoad();
    }, [token, profile, setProfile])

    return { profile, isLoading, error };
}