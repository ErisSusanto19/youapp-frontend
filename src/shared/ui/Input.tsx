import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, ...props}, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const isPasswordType = type === 'password';

        const tooglePasswordVisibility = () => {
            setShowPassword(!showPassword);
        }

        return (
            <div className="w-full">
                {label && <label className="block text-text-primary text-body mb-2">{label}</label>}
                <div className="relative">
                    <input 
                        type={isPasswordType? showPassword? 'text': 'password' : type}
                        className={`
                            w-full bg-background-light/10 border border-white/20 rounded-md
                            px-4 py-3 text-body text-text-primary placeholder:text-text-secondary/50
                            focus:outline-none focus:ring-2 focus:ring-gradient-cyan/50
                            ${className}
                        `}
                        ref={ref}
                        {...props}
                    />
                    {isPasswordType && (
                        <button
                            type="button"
                            onClick={tooglePasswordVisibility}
                            className="absolute inset-y-0 right-0 flex items-center pr-4 text-text-secondary"
                        >
                            {showPassword? <Eye size={18}/> : <EyeOff size={18}/>}
                        </button>
                    )}
                </div>
            </div>
        )

    }
);

Input.displayName = "Input";