'use client'

import { useRouter } from "next/navigation";
import { useUserStore } from "../model/store";
import { ArrowLeft, MoreHorizontal } from "lucide-react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

export const ProfileHeader = ({ showBackButton = false }: { showBackButton?: boolean }) => {
    const router = useRouter();
    const { profile, logout } = useUserStore();

    const handleLogout = () => {
        logout();
        router.replace('/login');
    };

    return (
        <header className="flex justify-between items-center p-4">
            {showBackButton ? (
                <button onClick={() => router.back()} className="hover:text-gold">
                    <ArrowLeft />
                </button>
            ) : (
                <div className="w-6 h-6"></div> 
            )}
            <span className="font-bold">@{profile?.username || '...'}</span>
            
            <div className="relative">
                <Menu as="div" className="inline-block text-left">
                    <div>
                        <Menu.Button className="hover:text-gold">
                            <MoreHorizontal />
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right rounded-md bg-background-light shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={handleLogout}
                                            className={`${
                                                active ? 'bg-red-500/20 text-red-400' : 'text-text-secondary'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            Logout
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </header>
    )
}