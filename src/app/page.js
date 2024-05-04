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
  ShipmentCount,
  SendShipment,
  } from "./_components";
  
import { TrackingContext } from "../../context/TrackingContext";
import { Sen } from "next/font/google";


const Page = () => {
  const {
    currentUser,
    createShipment,
    getAllShipment,
    completeShipment,
    getShipment,
    startShipment,
    getShipmentsCount,
    getBalance,
    totalCount,
    sendShipment,
    } = useContext(TrackingContext);

    //STATE VARIABLES

    const [createShipmentModal, setCreateShipmentModal] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [openCount, setOpenCount] = useState(false);
    const [startModal, setStartModal] = useState(false);
    const [completeModal, setCompleteModal] = useState(false);
    const [getModal, setGetModal] = useState(false);
    const [sendModal, setSendModal] = useState(false);
    //DATA STATE VARIABLE
    const [allShipmentsdata, setallShipmentsdata] = useState([]);
  
    useEffect(() => {
      const getCampaignsData = getAllShipment() ;
      
      return async () => {
        const allData = await getCampaignsData;
        console.log('all',allData);
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
          setOpenCount={setOpenCount}
          setSendModal={setSendModal}
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
          getBalance={getBalance}
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
        <ShipmentCount
          openCount={openCount}
          setOpenCount={setOpenCount}
          totalCount={totalCount}
        />
        <SendShipment 
          sendModal={sendModal}
          setSendModal={setSendModal}
          sendShipment={sendShipment}
        />
      </>
    );
  }

  export default Page;



        
        
        
        


