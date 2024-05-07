"use client";
import Image from "next/image";
import images from "../_images"

const Services = ({
  setOpenProfile,
  setCompleteModal,
  setGetModal,
  setStartModal,
  setOpenCount,
  setSendModal,
}) => {
  
  const team = [
    {
      text:"Complete Shipment",
      image: images.shipped
    },
    {
      text:"Get Shipment",
      image: images.search
    },
    {
      text:"Start Shipment",
      image: images.box
    },    
    {
      text:"User Profile",
      image: images.user
    },
    {
      text:"Shipment Count",
      image: images.counting
    },
    {
      text:"Send Shipment",
      image:images.delivery
    }
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
    else if (text === 5){
      setOpenCount(true);
    }
    else if (text === 6){
      setSendModal(true);
      //console.log("Send Shipment");
    }

  };
  return (
    <section className="py-0 my-10 pb-1">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {team.map((item, index) => (
            <li key={index}>
              <div onClick={() => openModalBox(index + 1)} className="flex flex-wrap px-8 w-full h-32 sm:h-20 md:h-32 bg-white border border-black rounded-3xl text-center items-center justify-center text-black shadow-lg hover:scale-105 transition-all">
                <Image src={item.image} alt='search' className="h-8 w-8"/>
                <h2 className="pl-5 font-bold text-2xl">{item.text}</h2>
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