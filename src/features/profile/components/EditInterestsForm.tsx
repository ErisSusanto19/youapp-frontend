'use client';

import { X } from "lucide-react";
import { KeyboardEvent, useState } from "react";

interface EditInterestsFormProps {
    interests: string[];
    onInterestsChange: (newInterests: string[]) => void;
}

export const EditInterestsForm = ({interests, onInterestsChange}: EditInterestsFormProps) => {
    const [currentInterest, setCurrentInterest] = useState('');

    const interestsToRender = interests || [];

    const handleAddInterest = () => {
        const newInterest = currentInterest.trim();
        
        if (newInterest && !interests.includes(newInterest)) {
            onInterestsChange([...interests, newInterest]);
            setCurrentInterest('');
        }
    };

     const handleRemoveInterest = (interestToRemove: string) => {
        onInterestsChange(interests.filter(interest => interest !== interestToRemove));
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleAddInterest();
        }
    };

    return (
        <div className="bg-background-light p-4 rounded-xl min-h-[150px] flex flex-wrap items-start gap-2 focus-within:border-gradient-cyan/50 border border-transparent transition-colors">
            {interestsToRender.map(interest => (
                <div key={interest} className="bg-white/10 px-3 py-1 rounded-md flex items-center gap-2 text-sm">
                    {interest}
                    <button onClick={() => handleRemoveInterest(interest)} className="hover:text-red-500">
                        <X size={14} />
                    </button>
                </div>
            ))}

            <div className="w-full mt-2">
                <input
                    type="text"
                    value={currentInterest}
                    onChange={(e) => setCurrentInterest(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={interests.length === 0 ? "Type something..." : "Add more..."}
                    className="w-full flex-grow bg-background/30 border-none focus:ring-0 text-text-primary placeholder:text-text-secondary p-1"
                />
            </div>
        </div>
    )
}