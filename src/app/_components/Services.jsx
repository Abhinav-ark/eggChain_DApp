"use client";
import images from "../_images";
import Image from "next/image";


const Services = ({
  setOpenProfile,
  setCompleteModal,
  setGetModal,
  setStartModal,
}) => {
  
  const team = [
    "Complete Shipment","Get Shipment","Start Shipment", "User Profile", "Shipment Count", "Send Shipment"
  ];

  const openModalBox = (text) => {
    if (text === 1) {
      setCompleteModal(true);
    }
    else if (text === 2) {
      setGetModal(true);
    }
    else if (text === 3) {
      setStartModal(true);
    }
    else if (text === 4){
      setOpenProfile(true);
    }

  };
  return (
    <section className="py-0 my-10 pb-1">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {team.map((item, index) => (
            <li key={index}>
              <div onClick={() => openModalBox(index + 1)} className="flex w-full h-60 sm:h-52 md:h-56 bg-[#232324] rounded-3xl text-center items-center justify-center text-white hover:scale-105 transition-all">
                <h2 className="font-bold text-2xl">{item}</h2>
              </div>
            </li>
          ))}        
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Services;