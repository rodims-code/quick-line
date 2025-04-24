"use client"
import React, { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import { useUser } from "@clerk/nextjs";
import { createServices, deleteService, getServicesByEmail } from "../action";
import { Service } from "@prisma/client";
import { Clock10, ClockArrowUp, Trash } from "lucide-react";

const Page = () => {
    const {user} = useUser()
    const email = user?.primaryEmailAddress?.emailAddress
    const [serviceName, setServiceName] = useState("")
    const [avgTime, setAgvTime] = useState(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [services, setServices] = useState<Service[]>([])

    const handleCreateService = async () =>{
/*         alert(`Service ${serviceName} créé avec succès pour ${user?.firstName} ${user?.lastName}`) */
        if(serviceName && avgTime > 0 && email){
            try{
                await createServices(email, serviceName, avgTime)
                setAgvTime(0)
                setServiceName("")
                fetchServices()
            }catch(error){
                console.log(error)
            }
        }
    }

    const fetchServices = async () =>{
        setLoading(true)
        try{
            if(email){
                const serviceData = await getServicesByEmail(email)
                if(serviceData){
                    setServices(serviceData)
                }
                setLoading(false)
            }
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        fetchServices()
    }, [email])


    const handeleDeleteService = async (serviceId : string) =>{
        const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer ce service ? Tous les tikets seront egalement supprimer !");
        if (confirmation) {
            try {
                // Assuming you have a deleteService function to handle deletion
                await deleteService(serviceId);
                fetchServices(); // Refresh the list after deletion
            } catch (error) {
                console.log(error);
            }
        }
    }

    return(
        <Wrapper>
            <div className="flex  w-full flex-col md:flex-row">

                <div className="space-y-2 md:w-1/4 w-full">
                    <span className="label-text">Nom du service</span>
                    <div>
                        <input 
                        type="text" 
                        name="" 
                        placeholder="Nom du service"
                        className="input input-bordered input-sm w-full" 
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        />
                    </div>

                    <span>Temps moyen du service</span>
                    <label className="input input-bordered flex items-center input-sm gap-2 w-full">
                        <ClockArrowUp className="h-4 w-4" />
                        <input 
                            type="number" 
                            className="grow" 
                            placeholder="20min" 
                            value={avgTime}
                            onChange={(e) => setAgvTime(Number(e.target.value))}
                            />
                    </label>
                    <button className="btn btn-sn btn-accent mt-4"
                    onClick={handleCreateService}
                    >
                        Nouveau
                    </button>
                </div>

                <div className="mt-4 md:mt-0 md:ml-4 md:w-3/4 md:border-1 border-base-200 pl-4 w-full">
                    <h3 className="font-semibold">Liste des services</h3>

                    {loading ?(
                        <div className="flex justify-center items-center w-full">
                            <span className="loading loading-spinner loading-xs"></span>
                        </div>
                    ): services.length === 0 ? (
                        <div>

                        </div>
                    ) : (
                        <div>
                            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                            <table className="table w-fit">
                                {/* head */}
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nom du services</th>
                                    <th>Temps moyen</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {/* row 1 */}
                                {services.map((service, index) =>(
                                    <tr key={service.id}>
                                        <th>{index + 1}</th>
                                        <td>{service.name}</td>
                                        <td className="flex items-center"><Clock10 className="w-4 h-4 mr-1"/> {service.avgTime} min</td>
                                        <td>Blue</td>

                                        <td>
                                            <button className="btn btn-xs btn-error">
                                                <Trash
                                                onClick={() => handeleDeleteService(service.id)}
                                                className="w-4 h-4"/>
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </Wrapper>
    )
}

export default Page;