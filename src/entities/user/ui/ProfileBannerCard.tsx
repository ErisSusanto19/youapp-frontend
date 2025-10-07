'use client';

import Image from 'next/image';
import { UserProfile } from '@/entities/user/model/type';
import { calculateAge } from '@/shared/lib/date-helpers';
import { Card } from '@/shared/ui';
import { getChineseZodiacIcon, getHoroscopeIcon } from '@/shared/config/icons';
import { PencilLine } from 'lucide-react';

interface ProfileBannerCardProps {
    profile: UserProfile | null;
    onEdit?: () => void;
}

const DataPill = ({icon: Icon, text }: {icon?: React.ComponentType<any> | null, text?: string | null}) => {
    if(!Icon || !text) return null;
    return (
        <div className="bg-white/10 px-3 py-1 rounded-full flex items-center text-xs">
            <Icon className="mr-2" />
            <span>{text}</span>
        </div>
    )
}

export const ProfileBannerCard = ({ profile, onEdit }: ProfileBannerCardProps) => {
    if (!profile) return <Card className="h-36 animate-pulse" />;

    const displayName = profile.name ? `${profile.name}, ${profile.birthday ? calculateAge(profile.birthday) : ''}` : `@${profile.username}`;
    const HoroscopeIcon = getHoroscopeIcon(profile.horoscope);
    const ChineseZodiacIcon = getChineseZodiacIcon(profile.zodiac);

    const profileImageUrl: string | null = null; 

    return (
        <Card onEdit={onEdit} className="!p-0 h-48 overflow-hidden relative text-white">
            {profileImageUrl && (
                <>
                    <Image
                        src={profileImageUrl}
                        alt={profile.name || profile.username}
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                </>
            )}

            {/* {onEdit && (
                <button 
                    onClick={onEdit} 
                    className="absolute top-4 right-4 z-30 text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                    <PencilLine size={16} />
                </button>
            )} */}

            <div className="relative z-20 flex flex-col justify-end h-full p-4">
                <div>
                    <h2 className="font-bold text-lg">{displayName}</h2>
                    {(HoroscopeIcon || ChineseZodiacIcon) && (
                        <div className="mt-2 flex items-center flex-wrap gap-2">
                            <DataPill icon={HoroscopeIcon} text={profile.horoscope} />
                            <DataPill icon={ChineseZodiacIcon} text={profile.zodiac} />
                        </div>
                    )}
                </div>
            </div>
        </Card>
    )
};
