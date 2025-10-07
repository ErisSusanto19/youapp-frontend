'use client';

import { useUserStore } from "@/entities/user/model/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const PublicLayout = ({children}: {children: React.ReactNode}) => {
    const router = useRouter();
    const { token } = useUserStore();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        setIsCheckingAuth(false);
    }, [])

    useEffect(() => {
        if(!isCheckingAuth && token){
            router.push("/profile")
        }
    }, [isCheckingAuth, token, router])

    if(isCheckingAuth || token){
        return (
            <div className="flex items-center justify-center min-h-screen bg-background-dark">
                <p className="text-text-primary">Redirecting...</p>
            </div>
        )
    }

    return <>{children}</>
}

export default PublicLayout;