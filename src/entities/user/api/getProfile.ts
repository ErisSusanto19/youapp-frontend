import { api } from "@/shared/api";
import { UserProfile } from "../model/type";
import * as z from "zod";

const userProfileSchema = z.object({
  email: z.string(),
  username: z.string(),
});

const profileResponseSchema = z.object({
    message: z.string(),
    data: userProfileSchema
})

export const getProfile = async (): Promise<UserProfile> => {
    try {
        const response = await api.get(`/api/getProfile`)
        
        const validatedData = profileResponseSchema.parse(response.data);
        return validatedData.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Failed to fetch profile');
        }
        throw new Error(error.message || 'An unknown error occurred');
    }
}