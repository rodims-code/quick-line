"use server"

import prisma from "@/lib/prisma"
import { GitPullRequestCreateArrowIcon } from "lucide-react"

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

export async function createServices(email: string, serviceName : string, avgTime: number){
    if (!email || !serviceName || !avgTime == null) return
    try{
        const existingCompany = await prisma.company.findUnique({
            where : {
                email : email
            }
        })
        if(existingCompany){
            const newService = await prisma.service.create({
                data : {
                    name : serviceName,
                    avgTime : avgTime,
                    companyId : existingCompany.id
                }
            })
        } else{
            console.error(`Company not found with email : ${email}`)
        }
    }catch (error) {
    console.error(error)
}
}

export async function getServicesByEmail(email : string){
    if (!email) return
    try{
        const company = await prisma.company.findUnique({
            where : {
                email : email
            }
        })

        if(!company){
            throw new Error(`Company not found with email : ${email}`)
        }

        const services = await prisma.service.findMany({
            where : {
                companyId : company.id
            },
            include : {
                company : true
            }
        })

        return services

    }catch(error){
        console.error(error)
    }
}

export async function deleteService(serviceId : string){
    if(!serviceId) return
    try{
        const service = await prisma.service.findUnique({
            where : {id: serviceId}
        })

        await prisma.service.delete({
            where : {id : serviceId}
        })
    }catch (error){
        console.log(error)
    }

}

export async function getCompanyName(email : string){
    try{
        const company = await prisma.company.findUnique({
            where : {
                email : email
            },
            select : {
                pageName : true
            }
        })

        if(company){
            return company.pageName
        }

    }catch(error){
        console.error(error)
    }
}

export async function setCompanyName(email : string, pageName:string){
    try{    
        const company = await prisma.company.findUnique({
            where : {
                email : email
            }
        })
        await prisma.company.update({
            where : {email},
            data : {pageName}
        })
    }catch(error){
        console.error(error)
    }

}