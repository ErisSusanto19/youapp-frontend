import { api } from '@/shared/api';
import * as z from 'zod';

const registerRequestSchema = z.object({
    email: z.string(),
    username: z.string(),
    password: z.string()
})

const registerResponseSchema = z.object({
    message: z.string()
})

export type RegisterRequest = z.infer<typeof registerRequestSchema>;
export type RegisterResponse = z.infer<typeof registerResponseSchema>;

export const registerUser = async (data: RegisterRequest): Promise<RegisterResponse> => {
    try {
        const response = await api.post(`/api/register`, data)

        if (response.status >= 200 && response.status < 300 && !response.data) {
            console.warn("API returned a success status but no response body. Assuming success.");
            return { message: "User registered successfully!" };
        }

        const parsedData = registerResponseSchema.parse(response.data);
        return parsedData;

    } catch (error: any) {
        if(error.response){
            throw new Error(error?.response?.data?.message || "Registration failed.")
        } else if(error instanceof z.ZodError){
            console.error("Invalid response format from API:", error);
            throw new Error("Received an invalid response from the server.");
        }

        throw new Error(error.message || "An unknown error occured")
    }
}