'use client';

import { useUserStore } from "@/entities/user/model/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AuthLayout = ({ children }: { children: React.ReactNode}) => {
    const router = useRouter();
    const { token } = useUserStore();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        if(isClient && !token){
            console.log("No token found, redirecting to login.");
            router.push("/login")
        }
    }, [isClient, token, router])

    if(!isClient || !token){
        return (
            <div className="flex items-center justify-center min-h-screen bg-background-dark">
                <p className="text-text-primary">Loading...</p>
            </div>
        )
    }

    return <>{children}</>
}

export default AuthLayout;