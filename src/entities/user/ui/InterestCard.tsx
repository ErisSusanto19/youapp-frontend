'use client';

import { useRouter } from "next/navigation";
import { UserProfile } from "../model/type";
import { Card } from "@/shared/ui";
import { PencilLine } from "lucide-react";

const InterestPill = ({ text }: { text: string }) => (
    <div className="bg-background-dark border border-white/10 px-4 py-2 rounded-full text-sm">
        {text}
    </div>
);

export const InterestCard = ({profile}: {profile: UserProfile | null}) => {
    const router = useRouter();
    const interests = profile?.interests || [];

    const handleEdit = () => {
        router.push('/profile/interests');
    };

    const renderHeaderActions = () => {
        return (
            <button onClick={handleEdit} className="text-text-secondary hover:text-white">
                <PencilLine size={16}/>
            </button>
        );
    }

    return (
        <Card title="Interest" actions={renderHeaderActions()}>
            {interests.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                    {interests.map((interest) => (
                        <InterestPill key={interest} text={interest} />
                    ))}
                </div>
            ) : (
                <p className="text-text-secondary text-sm">Add in your interest to find a better match</p>
            )}
        </Card>
    );
}