'use client';

import { useUserStore } from "@/entities/user/model/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
    const router = useRouter();
    const { token } = useUserStore();
    const [isClient, setIsClient] = useState(false);


    useEffect(() => {
        setIsClient(true);
    }, []);
    useEffect(() => {

      if (!isClient) {
          return;
      }

      if (token) {
          router.replace('/profile');
      } else {
          router.replace('/login');
      }
    }, [token, isClient, router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-background-dark">
            <p className="text-text-primary">Loading...</p>
        </div>
    )
}
