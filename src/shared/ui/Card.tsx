import React from 'react';

interface CardProps {
    title?: string;
    onEdit?: () => void;
    actions?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
}

export const Card = ({ title, onEdit, actions, children, className = '' }: CardProps) => {
    return (
        <div className={`bg-background p-4 rounded-xl ${className}`}>
            {(title || actions) && (
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-text-primary">{title}</h3>
                    <div>{actions}</div>
                </div>
            )}
            {children}
        </div>
    );
};