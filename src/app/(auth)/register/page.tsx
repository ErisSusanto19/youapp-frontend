import { RegisterForm } from "@/features/auth/components";
import Link from "next/link";

const RegisterPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[radial-gradient(circle_at_top_right,_theme(colors.background.light)_0%,_theme(colors.background.DEFAULT)_56%,_theme(colors.background.dark)_100%)] text-text-primary">
            <div className="flex-grow container mx-auto flex flex-col justify-center p-6 max-w-sm">

                <div className="mb-10">
                    <h1 className="text-heading">Register</h1>
                </div>

                <RegisterForm/>

                <div className="mt-8 text-center text-body">
                    <span>Have an account? </span>
                    <Link href={"/login"} className="text-gold font-bold underline">
                        Login here
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default RegisterPage;