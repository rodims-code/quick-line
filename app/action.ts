"use server"

import prisma from "@/lib/prisma"

export async function checkAndUser(email : string, name: string){
    if(!email) return
    try {
        const existingUser = await prisma.company.findUnique({
            where : {
                email : email
            }
        })


        if(!existingUser && name){
            await prisma.company.create({
                data : {
                    email : email,
                    name : name
                }
            })
        }

    } catch (error){
        console.error(error)
    }
}