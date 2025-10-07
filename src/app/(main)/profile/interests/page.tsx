'use client';

import { updateProfile } from "@/entities/user/api/updateProfile";
import { useUserStore } from "@/entities/user/model/store";
import { EditInterestsForm } from "@/features/profile/components";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const EditInterestPage = () => {
    const router = useRouter();
    const { profile, setProfile } = useUserStore();
 
    const [interests, setInterests] = useState<string[]>(profile?.interests || []);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSave = async () => {
        setIsSubmitting(true);
        try {
            const updatedProfile = await updateProfile({ interests });
            setProfile(updatedProfile);
            router.back();
        } catch (error) {
            console.error(error);
            alert('Failed to save interests');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="bg-[radial-gradient(circle_at_top_right,_theme(colors.background.light)_0%,_theme(colors.background.DEFAULT)_56%,_theme(colors.background.dark)_100%)] min-h-screen text-text-primary">
            <div className="container mx-auto max-w-sm md:max-w-md">
                <header className="flex justify-between items-center p-4">
                    <Link href="/profile" className="hover:text-gold">
                        <ArrowLeft />
                    </Link>

                    <button
                        onClick={handleSave}
                        disabled={isSubmitting}
                        className={`
                            text-sm font-bold text-transparent hover:scale-105
                            bg-gradient-to-tr from-teal-400 to-blue-600 bg-clip-text
                            disabled:bg-none disabled:text-text-secondary/50 disabled:cursor-default
                            transition-all duration-300 ease-in-out
                        `}
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" /> : 'Save'}
                    </button>
                </header>

                <div className="p-4 pt-0">
                    <div className="mb-6">
                        <p className="text-gold">Tell everyone about yourself</p>
                        <h1 className="text-xl font-bold">What interest you?</h1>
                    </div>
                    
                    <EditInterestsForm 
                        interests={interests}
                        onInterestsChange={setInterests}
                    />
                </div>
            </div>
        </main>
    )
}

export default EditInterestPage;