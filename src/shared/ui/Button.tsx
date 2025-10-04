import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, children, disabled, ...props}, ref) => {
        return (
            <button
                className={`
                    w-full h-12 px-6 rounded-md text-text-primary font-bold
                    transition-all duration-300 cursor-pointer
                    bg-gradient-to-r from-gradient-cyan to-gradient-blue
                    hover:scale-105 hover:shadow-lg hover:shadow-gradient-cyan/20
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark focus:ring-gradient-cyan
                    disabled:opacity-30 disabled:scale-100 disabled:cursor-default
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

Button.displayName = "Button"

export default Button;