'use client';

import { userProfile } from "@/entities/user/hooks/userProfile";
import { AboutCard, InterestCard, ProfileBannerCard, ProfileHeader } from "@/entities/user/ui";

const ProfilePage = () => {

    const { profile, isLoading, error} = userProfile();

    if (isLoading) {
        return (
            <main className="bg-background-dark min-h-screen text-text-primary flex items-center justify-center">
                <p>Loading your profile...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="bg-background-dark min-h-screen text-text-primary flex items-center justify-center">
                <p className="text-red-500">{error}</p>
            </main>
        );
    }

    return (
        <main className="bg-background-dark min-h-screen text-text-primary">
            <div className="container mx-auto max-w-sm md:max-w-md">
                <ProfileHeader />
                
                <div className="p-4 pt-0 space-y-4">
                    <ProfileBannerCard profile={profile} onEdit={() => alert('Edit Banner!')}/>

                    <AboutCard profile={profile}/>
                
                    <InterestCard profile={profile}/>
                </div>
            </div>
        </main>
    )
}

export default ProfilePage;