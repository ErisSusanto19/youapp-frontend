'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, Input } from '@/shared/ui';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { registerUser } from '../services/register';

const registerSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" }),
    username: z
        .string()
        .min(1, { message: "Username is required" })
        .min(6, { message: "Username must be at least 6 charackters"}),
    password: z
        .string()
        .min(1, { message: "Password is required" })
        .min(8, { message: "Password must be at least 8 charcaters"}),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ['confirmPassword']
})

type RegisterFormInputs = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
    const router = useRouter();

    const { register, handleSubmit, setError, formState: { errors, isSubmitting, isDirty } } = useForm<RegisterFormInputs>({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
        defaultValues: {
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        }
    })

    const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
        try {
            const response = await registerUser({
                email: data.email,
                username: data.username,
                password: data.password
            })

            console.log("Registration successful", response.message);

            alert(response.message);
            router.push("/login")
            
        } catch (error: any) {
            console.log("Regsitration failed", error.message);
            setError('root', {
                type: 'manual',
                message: error.message || "An error occured during registration."
            })   
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {errors.root && <p className="text-rose-500 text-xs text-center">{errors.root.message}</p>}

            <div>
                <Input
                    type="email"
                    placeholder="Enter email"
                    {...register("email")}
                />
                { errors && <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>}
            </div>

            <div>
                <Input
                    type="text"
                    placeholder="Create username"
                    {...register("username")}
                />
                {errors && <p className="text-red-500 text-xs mt-1">{errors.username?.message}</p>}
            </div>

            <div>
                <Input
                    type="password"
                    placeholder="Create password"
                    {...register("password")}
                />
                {errors && <p className="text-red-500 text-xs mt-1">{errors.password?.message}</p>}
            </div>

            <div>
                <Input
                    type="password"
                    placeholder="Confirm password"
                    {...register("confirmPassword")}
                />
                {errors && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword?.message}</p>}
            </div>

            <Button type="submit" disabled={!isDirty || isSubmitting}>
                {isSubmitting ? (
                    <>
                        <Loader2 className="inline-block h-5 w-5 animate-spin mr-2"/>
                        Registering...
                    </>
                ) : (
                    'Register'
                )}
            </Button>
        </form>
    )

}