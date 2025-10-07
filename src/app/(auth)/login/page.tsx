import { LoginForm } from "@/features/auth/components";
import Link from "next/link";

const LoginPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[radial-gradient(circle_at_top_right,_theme(colors.background.light)_0%,_theme(colors.background.DEFAULT)_56%,_theme(colors.background.dark)_100%)] text-text-primary">
            <div className="flex-grow container mx-auto flex flex-col justify-center p-6 max-w-sm">

                <div className="mb-10">
                    <h1 className="text-heading">Login</h1>
                </div>

                <LoginForm/>

                <div className="mt-8 text-center text-body">
                    <span>No account? </span>
                    <Link href={"/register"} className="text-gold font-bold underline">
                        Register here
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default LoginPage;