import { api } from '@/shared/api';
import * as z from 'zod';

const loginRequestSchema = z.object({
    email: z.string(),
    username: z.string(),
    password: z.string()
})

const loginResponseSchema = z.object({
    message: z.string(),
    access_token: z.string(),
})

export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type LoginResponse = {
    token: string;
}

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
    try {
        const response = await api.post(`/api/login`, data);
        const validatedData = loginResponseSchema.parse(response.data);

        return {
            token: validatedData.access_token,
        }
    } catch (error: any) {
        if(error.response){
            throw new Error(error.response.data.message || "Login failed.")
        } else if(error instanceof z.ZodError){
            console.error("Invalid login response format from API:", error);
            throw new Error("Received an invalid response from the server.");
        }

        throw new Error(error.message || 'An unknown error occured')
    }
}