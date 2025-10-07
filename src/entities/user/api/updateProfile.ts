import * as z from 'zod';
import { UserProfile } from '../model/type';
import { api } from '@/shared/api';
import { getProfile } from './getProfile';

const updateProfileRequestSchema = z.object({
    name: z.string().min(1).optional(),
    birthday: z.string().optional(),
    height: z.number().optional(),
    weight: z.number().optional(),
    interests: z.array(z.string()).optional(),
}).refine(data => {
    return Object.keys(data).length > 0;
}, { message: "At least one field must be provided to update." });

export type UpdateProfileRequest = z.infer<typeof updateProfileRequestSchema>;

export const updateProfile = async (data: UpdateProfileRequest): Promise<UserProfile> => {
    try {
        await api.put(`/api/updateProfile`, data);
        
        const freshProfile = await getProfile();

        return freshProfile;
        
    } catch (error: any) {
        if(error.response){
            throw new Error(error.response.data.message || "Failed to update profile.")
        }
        throw new Error(error.message || "An unknnown error occured.")
    }
}