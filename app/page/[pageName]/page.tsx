"use client";
import { createTicket, getServicesByPageName } from "@/app/action";
import { Service } from "@prisma/client";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: { pageName: string } }) => {
  const [pageName, setPageName] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [nameComplete, setNameComplete] = useState<string>("")

  const resolveParamsAndFetchServices = async () => {
    try {
      console.log("Params:", params); // Debug
      setPageName(params.pageName);
      const servicesListe = await getServicesByPageName(params.pageName);
      console.log("Services fetched:", servicesListe); // Debug
      if (servicesListe) {
        setServices(servicesListe); // Utilisez directement `servicesListe`
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    resolveParamsAndFetchServices();
  }, []);

  const hundleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if(!selectedServiceId || !nameComplete) {
      alert("Veuillez remplir tous les champs. Selectionnez un service et entrez votre nom.")
      return
    }
    try{
      const ticketNum  = await createTicket(selectedServiceId, nameComplete, pageName || '')
      setSelectedServiceId(null)
      setNameComplete("")
      alert(`Votre ticket a été créé avec succès. Votre numéro de ticket est : ${ticketNum}`)
    }catch(error){
      console.error("Error submitting form:", error);
    }
  }

/*   if (!services || services.length === 0) {
    return <p>Aucun service disponible.</p>;
  } */

  return (
    <div className="px-5 md:px-[10%] mt-8 mb-10">
      <div>
        <h1 className="text-2xl font-bold">
          Bienvenue sur
          <span className="badge badge-accent ml-2">@{pageName}</span>
        </h1>
        <p className="text-md">Aller créer votre ticket</p>
      </div>

      <div className="flex flex-col md:flex-row w-full mt-4">
        <form action="" className="flex flex-col space-y-2 md-w-96" onSubmit={hundleSubmit}>
          <select 
          className="select select-bordered w-full
          onChange={(e) => setSelectedServiceId(e.target.value)}
          value={selectedServiceId || ``}">
            <option disabled value="">
              Choisissez un service
            </option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name} - ({service.avgTime}) min
              </option>
            ))}
          </select>
          <input type="text" 
          placeholder="Quel est votre nom ?"
          className="input input-bordered w-full" 
          onChange={(e) => setNameComplete(e.target.value)}
          value={nameComplete}
          />
          <button type="submit" className="btn btn-accent w-fit">Go</button>
        </form>
      </div>
    </div>
  );
};

export default Page;
