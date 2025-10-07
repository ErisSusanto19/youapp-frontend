import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, children, disabled, ...props}, ref) => {
        return (
            <button
                className={`
                    w-full h-12 px-6 rounded-md text-text-primary font-bold
                    transition-all duration-300 cursor-pointer
                    bg-gradient-to-tr from-teal-400 to-blue-600
                    hover:scale-105 hover:shadow-lg hover:shadow-teal-200/30 hover:from-teal-200 hover:to-blue-700
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark focus:ring-teal-200
                    disabled:opacity-30 disabled:scale-100 disabled:cursor-default
                    ${className}
                `}
                disabled={disabled}
                ref={ref}
                {...props}
            >
                {children}
            </button>
        )
    }
);

Button.displayName = "Button";