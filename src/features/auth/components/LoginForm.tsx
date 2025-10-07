'use client';

import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { useUserStore } from '@/entities/user/model/store'; 
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginUser } from '../services/login';
import { getProfile } from '@/entities/user/api/getProfile';
import { Button, Input } from '@/shared/ui';
import { Loader2 } from 'lucide-react';

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    username: z.string().min(1, { message: "Username is required" }),
    password: z.string().min(1, { message: "Password is required" })
})

type LoginFormInputs = z.infer<typeof loginSchema>;

export const LoginForm = () => {
    const router = useRouter();
    const { setAuth, logout } = useUserStore();

    const { register, handleSubmit, setError, formState: {errors, isSubmitting, isDirty} } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
            username: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        try {
            const response = await loginUser(data);
            const { token } = response;

            setAuth(token, null)

            const profileData = await getProfile();

            setAuth(token, profileData);

            router.push("/profile")
        } catch (error: any) {
            setError('root', {
                type: 'manual',
                message: error.message || "An error occured during login."
            })

            logout();
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {errors.root && <p className="text-rose-500 text-xs text-center">{errors.root.message}</p>}

            <div>
                <Input
                    type="email"
                    placeholder="Enter Email"
                    {...register("email")}
                />
                {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
                <Input
                    type="username"
                    placeholder="Enter Username"
                    {...register("username")}
                />
                {errors.username && <p className="text-rose-500 text-xs mt-1">{errors.username.message}</p>}
            </div>

            <div>
                <Input
                    type="password"
                    placeholder="Enter Password"
                    {...register("password")}
                />
                {errors.password && <p className="text-rose-500 text-xs mt-1">{errors.password.message}</p>}
            </div>


            <Button type="submit" disabled={!isDirty || isSubmitting}>
                {isSubmitting ? (
                    <>
                        <Loader2 className="inline-block h-5 w-5 animate-spin mr-2"/>
                        Logging in...
                    </>
                ) : (
                    'Login'
                )}
            </Button>
        </form>
    )
}