'use client';

import { useEffect, useState } from "react";
import { UserProfile } from "../model/type";
import * as z from 'zod';
import { useUserStore } from "../model/store";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile } from "../api/updateProfile";
import { Loader2, PencilLine } from "lucide-react";
import { Card, Input } from "@/shared/ui";
import { calculateAge, formatDisplayDate } from "@/shared/lib/date-helpers";

interface AboutCardProps {
    profile: UserProfile | null;
}

const ProfileDataItem = ({label, children}: {label: string, children: React.ReactNode}) => {
    return (
        <div className="flex items-center justify-between text-sm space-x-4">
            <span className="w-1/3 text-text-secondary">{label}</span>
            <div className="w-2/3">
                {children}
            </div>
        </div>
    )
}

const ValueBox = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={`
            w-full bg-dark-main border border-white/20 rounded-md px-4 py-3 text-text-primary text-right
            placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-gradient-cyan/50
        `}>
            {children}
        </div>
    );
}

const aboutFormSchema = z.object({
    name: z.string().min(1, {message: "Name is required"}),
    birthday: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Dete must be in YYYY-MM-DD format."),
    height: z.number().min(1, { message: "Height must be 0 or higher" }),
    weight: z.number().min(1, { message: "Weight must be 0 or higher" })
})

type AboutFormInput = z.infer<typeof aboutFormSchema>;

export const AboutCard = ({profile}: AboutCardProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const {setProfile, token } = useUserStore();

    const {register, handleSubmit, formState: {errors, isSubmitting, isDirty}, reset} = useForm<AboutFormInput>({
        resolver: zodResolver(aboutFormSchema),
        mode: 'onChange',
        defaultValues: {
            name: profile?.name || '',
            birthday: profile?.birthday?.split('T')[0] || '',
            height: profile?.height || 0,
            weight: profile?.weight || 0,
        }
    })

    useEffect(() => {
        if (profile) {
            reset({
                name: profile.name || '',
                birthday: profile.birthday?.split('T')[0] || '',
                height: profile.height || 0,
                weight: profile.weight || 0,
            });
        }
    }, [profile, reset]); 

    const onSubmit: SubmitHandler<AboutFormInput> = async (data) => {
        try {
            const updatedProfile = await updateProfile(data)
            console.log(updatedProfile, '<<< cek from AboutCard');
            
            setProfile(updatedProfile);
            setIsEditing(false);
        } catch (error) {
            console.log(error);
            alert("Failed to update profile. Please try again!")
        }
    }

    const handleCancel = () => {
        reset({
            name: profile?.name || '',
            birthday: profile?.birthday?.split('T')[0] || '',
            height: profile?.height || 0,
            weight: profile?.weight || 0,
        });

        setIsEditing(false);
    }

    const hasAboutData = profile?.name && profile?.birthday;

    const renderHeaderActions = () => {
        if (isEditing) {
            return (
                <div className="flex items-center space-x-2">
                    <button 
                        onClick={handleCancel}
                        className={`
                            text-sm bg-gray-500/20 text-text-secondary px-3 py-1 rounded-full 
                            hover:bg-gray-500/30 hover:text-text-primary transition-colors
                        `}
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit(onSubmit)} 
                        disabled={!isDirty || isSubmitting}
                        className={`
                            text-sm font-bold bg-gold/20 text-gold px-3 py-1 rounded-full 
                            hover:bg-gold/30 transition-colors
                            disabled:bg-gray-500/20 disabled:text-text-secondary/50 disabled:cursor-default
                        `}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="inline-block w-4 h-4 animate-spin mr-1"/>
                                Saving...
                            </>
                        ) : (
                            'Save'
                        )}
                    </button>
                </div>
            );
        }

        return (
            <button onClick={() => setIsEditing(true)} className="text-text-secondary hover:text-white">
                <PencilLine size={16}/>
            </button>
        );
    };

    if(isEditing){
        return (
            <Card title="About" actions={renderHeaderActions()}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <ProfileDataItem label="Display name:">
                        <Input
                            type="text"
                            className="bg-background-dark w-full"
                            {...register("name")}
                        />
                        {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name.message}</p>}
                    </ProfileDataItem>

                    <ProfileDataItem label="Birthday:">
                        <Input
                            type="date"
                            className="bg-background-dark w-full"
                            {...register("birthday")}
                        />
                        {errors.birthday && <p className="text-rose-500 text-xs mt-1">{errors.birthday.message}</p>}
                    </ProfileDataItem>

                    <ProfileDataItem label="Height (cm):">
                        <Input
                            type="number"
                            className="bg-background-dark w-full"
                            {...register("height", { valueAsNumber: true })}
                        />
                        {errors.height && <p className="text-rose-500 text-xs mt-1">{errors.height.message}</p>}
                    </ProfileDataItem>

                    <ProfileDataItem label="Weight (kg):">
                        <Input
                            type="number"
                            className="bg-background-dark w-full"
                            {...register("weight", { valueAsNumber: true })}
                        />
                        {errors.weight && <p className="text-rose-500 text-xs mt-1">{errors.weight.message}</p>}
                    </ProfileDataItem>
                </form>
            </Card>
        )
    }

    return (
        <Card title="About" actions={renderHeaderActions()}>
            {hasAboutData ? (
                <div className="space-y-4">
                    <ProfileDataItem label="Display name:">
                        <div className="text-right text-text-primary font-semibold">
                            <ValueBox>{profile.name || '-'}</ValueBox>
                        </div>
                    </ProfileDataItem>
                    <ProfileDataItem label="Birthday:">
                        <div className="text-right text-text-primary font-semibold">
                            <ValueBox>
                                {`${formatDisplayDate(profile!.birthday!)} (Age ${calculateAge(profile!.birthday!)})`}
                            </ValueBox>
                        </div>
                    </ProfileDataItem>
                    <ProfileDataItem label="Horoscope:">
                        <div className="text-right text-text-primary font-semibold">
                            <ValueBox>{profile.horoscope || '-'}</ValueBox>
                        </div>
                    </ProfileDataItem>
                    <ProfileDataItem label="Zodiac:">
                        <div className="text-right text-text-primary font-semibold">
                            <ValueBox>{profile.zodiac || '-'}</ValueBox>
                        </div>
                    </ProfileDataItem>
                    <ProfileDataItem label="Height:">
                        <div className="text-right text-text-primary font-semibold">
                            <ValueBox>{profile.height? `${profile.height} cm` : '-'}</ValueBox>
                        </div>
                    </ProfileDataItem>
                    <ProfileDataItem label="Weight:">
                        <div className="text-right text-text-primary font-semibold">
                            <ValueBox>{profile.weight? `${profile.weight} cm` : '-'}</ValueBox>
                        </div>
                    </ProfileDataItem>
                </div>
            ) : (
                <p className="text-text-secondary text-sm">Add in your your to help others know you better</p>
            )}
        </Card>
    )

}