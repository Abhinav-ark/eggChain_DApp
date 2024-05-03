"use client";
import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import {
  Table,
  Form,
  Services,
  Profile,
  CompleteShipment,
  GetShipment,
  StartShipment,
  } from "./_components";
  import { TrackingContext } from "../../context/TrackingContext";


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

    const [createShipmentModal, setCreateShipmentModal] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [startModal, setStartModal] = useState(false);
    const [completeModal, setCompleteModal] = useState(false);
    const [getModal, setGetModal] = useState(false);
    //DATA STATE VARIABLE
    const [allShipmentsdata, setallShipmentsdata] = useState([]);
  
    useEffect(() => {
      const getCampaignsData = getAllShipment() ;
      
      return async () => {
        const allData = await getCampaignsData;
        setallShipmentsdata(allData);
      };
    }, []);

    return (
      <>
        <Services
          setOpenProfile={setOpenProfile}
          setCompleteModal={setCompleteModal}
          setGetModal={setGetModal}
          setStartModal={setStartModal}
        />
        <Table
          setCreateShipmentModal={setCreateShipmentModal}
          allShipmentsdata={allShipmentsdata}
        />
        <Form
          createShipmentModal={createShipmentModal}
          setCreateShipmentModal={setCreateShipmentModal}
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
          getModal={getModal}
          setGetModal={setGetModal}
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



        
        
        
        


