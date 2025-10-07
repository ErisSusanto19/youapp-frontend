import { api } from "@/shared/api";
import { UserProfile } from "../model/type";
import * as z from "zod";
import { getChineseZodiac, getHoroscope } from "@/shared/lib/date-helpers";

const userProfileSchema = z.object({
    email: z.string(),
    username: z.string(),
    name: z.string().optional().nullable(),
    birthday: z.string().optional().nullable(),
    horoscope: z.string().optional().nullable(),
    zodiac: z.string().optional().nullable(),
    height: z.number().optional().nullable(),
    weight: z.number().optional().nullable(),
    interests: z.array(z.string()).optional().nullable(),
    // gender: z.string().optional().nullable(),
    // sex: z.string().optional().nullable(),
})
.transform((data) => {

//     const rawGender = data.gender || data.sex || null;
//     let normalizedGender: 'Male' | 'Female' | null = null;
    
//     if (rawGender) {
//         const lowerCaseGender = rawGender.toLowerCase();
//         if (lowerCaseGender === 'male') {
//             normalizedGender = 'Male';
//         } else if (lowerCaseGender === 'female') {
//             normalizedGender = 'Female';
//         }
//     }

    const apiHoroscope = data.horoscope;
    const apiZodiac = data.zodiac;
    const birthday = data.birthday;

    let finalHoroscope = 'Unknown';
    let finalZodiac = 'Unknown';

    if (apiHoroscope && apiHoroscope.toLowerCase() !== 'error') {
        finalHoroscope = apiHoroscope;
    } else if (birthday) {
        finalHoroscope = getHoroscope(birthday);
    }

    if (apiZodiac && apiZodiac.toLowerCase() !== 'error') {
        finalZodiac = apiZodiac;
    } else if (birthday) {
        finalZodiac = getChineseZodiac(birthday);
    }
    
    const result = {
        ...data,
        // gender: normalizedGender,
        horoscope: finalHoroscope,
        zodiac: finalZodiac,
    };

    return result;
});

const profileResponseSchema = z.object({
    message: z.string().optional(),
    data: userProfileSchema.optional()
})

export const getProfile = async (): Promise<UserProfile> => {
    try {
        const response = await api.get(`/api/getProfile`)
        // console.log(response, '<<< cek getProfile mentah');
        
        const validatedData = profileResponseSchema.parse(response.data);
        if(!validatedData.data){
            throw new Error("Profile data not found in API response");
        }

        return validatedData.data as UserProfile;
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            console.error("Zod validation error in getProfile:", error);
            throw new Error("Invalid data format received from server.");
        }
        if (error.response) {
            throw new Error(error.response.data.message || 'Failed to fetch profile');
        }
        throw new Error(error.message || 'An unknown error occurred');
    }
}