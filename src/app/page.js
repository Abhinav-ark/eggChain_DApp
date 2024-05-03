import React, { useState, useEffect, useCoontext } from "react";

//INTERNAL IMPORT
import {
  Table,
  Form,
  Services,
  Profile,
  CompleteShipment,
  GetShipment,
  StartShipment,
  } from "../Components/Page";
  import { TrackingContext } from "../Context/TrackingContext";


const Page = () => {
  const {
    currentUser,
    createShipment,
    getAllShipment,
    completeShipment,
    getShipment,
    startShipment,
    getShipmentsCount,
    } = useContext(TrackingContext);

    //STATE VARIABLES

    const [createShipmentModel, setCreateShipmentModel] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [startModal, setStartModal] = useState(false);
    const [completeModal, setCompleteModal] = useState(false);
    const [getModel, setGetModet] = useState(false);
    //DATA STATE VARIABLE
    const [allShipmentsdata, setallShipmentsdata] = useState();
  
    useEffect(() => {
      const getCampaignsData = getAltShipment() ;
      
      return async () => {
        const allData = await getCampaignsData;
        setaltShipmentsdata(allData);
      };
    }, []);

    return (
      <>
        <Services
          setOpenProfile={setOpenProfile}
          setCompleteModal={setCompleteModal}
          setGetModel={setGetModel}
          setStartModal={setStartModal}
        />
        <Table
          setCreateShipmentModel={setCreateShipmentModel}
          allShipmentsdata={allShipmentsdata}
        />
        <Form
          createShipmentModel={createShipmentModel}
          setCreateShipmentModel={setCreateShipmentModel}
          createShipment={createShipment}
        />
        <Profile
          openProfile={openProfile}
          setOpenProfile={setOpenProfile}
          currentUser={currentUser}
          getShipmentsCount={getShipmentsCount}
        />
        <CompleteShipment
          completeModal={completeModal}
          setCompleteModal={setCompleteModal}
          completeShipment={completeShipment}
        />
        <GetShipment
          getModel={getModel}
          setGetModel={setGetModel}
          getShipment={getShipment}
        />
        <StartShipment
          startModal={startModal}
          setStartModal={setStartModal}
          startShipment={startShipment}
        />
      </>
    );
  }

  export default Page;



        
        
        
        


