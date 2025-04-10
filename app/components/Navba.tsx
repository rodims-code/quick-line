"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {UserButton, useUser} from '@clerk/nextjs'
import { AudioWaveform, GlobeLock, Menu, X } from "lucide-react";
import { checkAndUser, getCompanyName } from "../action";

const Navbar = () => {
    const {user} = useUser()
    const email = user?.primaryEmailAddress?.emailAddress
    const [menuOpen, setMenuOpen] = React.useState(false)
    const [pageName, setPageName] = useState<string | null>(null)

    const navLinks = [
        {href: '/', label: 'Accueil'},
        {href: '/services', label: 'Vos services'},


    ]

    const renderLinks = (classNames: string) => (
        <>
            {navLinks.map(({href, label}) => (
                /// eslint-disable-next-line react/jsx-key
                <Link href = {href} key={href} className={`${classNames} btn-sm`}>{label}</Link>
            ))}

            {pageName && (
                <Link href = {`/page${pageName}`}  className={`${classNames} btn-sm`}>
                    <GlobeLock className="w-4 h-4"/>
                </Link>
            )}
        </>
    )

    useEffect(() => {
        const init = async () => {
            if(email && user.fullName){
                await checkAndUser(email, user.fullName)
                const pageNmae = await getCompanyName(email)
                setPageName(pageNmae)
            }
        }
        init()
    }, [email, user])

    return(
        <div className="border-b border-base-300 px-5 md:px-[10%] py-4 relative">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <div className="rounded-full p-2">
                        <AudioWaveform className="w-6 h-6  text-accent" />
                    </div>
                    <span className="font-bold text-xl">
                        QuickLine
                    </span>
                </div>

                <button className="btn w-flit btn-sm sm:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                    <Menu className="w-4"/>
                </button>

                <div className="hidden space-x-2 sm:flex  items-center">
                    {renderLinks("btn")}
                    <UserButton/>
                </div>
            </div>

            <div className={`absolute top-0 w-full bg-base-100 h-screen flex flex-col gap-2 p-4 transition-all duration-300 sm:hidden z-50 ${menuOpen ? "left-0" : "-left-full"}`}>
                <div className="flex  justify-between">
                    <UserButton/>
                    <button className="btn w-flit btn-sm sm:hidden"  onClick={() => setMenuOpen(!menuOpen)}>
                        <X className="w-4"/>
                    </button>

                </div>
                {renderLinks("btn")}
            </div>
            
        </div>
    )
}

export default Navbar;