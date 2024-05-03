import images from "../_images/index";
import Image from "next/image";

const Services = ({
  setOpenProfile,
  SetCompleteModal,
  setGetModal,
  setstartMoadal,
}) => {
  const team = [
    {
      avatar : images.compShipment,
    },
    {
      avatar : images.getShipment,
    },
    {
      avatar : images.startShipment,
    },
    {
      avatar : images.userProfile,
    },
    {
      avatar : images.shipcount,
    },
    {
      avatar : images.send,
    },
  ];
  const openModelBox = (text) => {
    if (text === 1) {
      SetCompleteModal(true);
    }
    else if (text === 2) {
      setGetModel(true);
    }
    else if (text === 3) {
      setstartModal(true);
    }
    else if (text === 4){
      setOpenProfile(true);
    }

  };
  return (
    <section className="py-0 pb-14">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {team.map((item, i) => {
              <li key={i}>
                <div onClick={() => openModelBox(i+1)} className="w-full h-60 sm:h-52 md:h-56">
                  <Image src={item.avatar} alt="avatar" className="w-full h-full object-cover object-center shadow-md rounded-xl"/>
                </div>
              </li>
            })}
          </ul>

        </div>
      </div>
    </section>
  );
};

export default Services;