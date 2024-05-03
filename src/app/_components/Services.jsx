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
    images.compShipment,images.getShipment, images.startShipment,images.userProfile,images.shipCount,images.send
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
    <section className="py-0 pb-1">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {team.map((item, index) => (
            <li key={index}>
              <div onClick={() => openModalBox(index + 1)} className="w-full h-60 sm:h-52 md:h-56">
                <Image src={item} alt="avatar" className="w-full h-full object-cover object-center shadow-md rounded-xl z-100"/>
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