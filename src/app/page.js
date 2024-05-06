"use client";
import React, { useState, useEffect, useContext } from "react";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from '@mui/material/Collapse';

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
  FileCreateShipment,
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
    const [fileCreateShipmentModal, setFileCreateShipmentModal] = useState(false);
    //DATA STATE VARIABLE
    const [allShipmentsdata, setallShipmentsdata] = useState([]);

    //SUCCESS AND ERRORS
    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);

    
    useEffect(() => {
      const getCampaignsData = getAllShipment() ;
      
      return async () => {
        const allData = await getCampaignsData;
        console.log('all',allData);
        setallShipmentsdata(allData);
      };
    }, [successOpen, getAllShipment]);

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
          setOpenCount={setOpenCount}
          setSendModal={setSendModal}
        />
        <Table
          setCreateShipmentModal={setCreateShipmentModal}
          allShipmentsdata={allShipmentsdata}
          currentUser={currentUser}
        />
        <Form
          createShipmentModal={createShipmentModal}
          setCreateShipmentModal={setCreateShipmentModal}
          createShipment={createShipment}
          setSuccessOpen={setSuccessOpen}
          setErrorOpen={setErrorOpen}
          setFileCreateShipmentModal={setFileCreateShipmentModal}
        />
        <FileCreateShipment
          setFileCreateShipmentModal={setFileCreateShipmentModal}
          fileCreateShipmentModal={fileCreateShipmentModal}
          setCreateShipmentModal={setCreateShipmentModal}
          createShipment={createShipment}
          setSuccessOpen={setSuccessOpen}
          setErrorOpen={setErrorOpen}
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
          setSuccessOpen={setSuccessOpen}
          setErrorOpen={setErrorOpen}
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
          setSuccessOpen={setSuccessOpen}
          setErrorOpen={setErrorOpen}
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
          setSuccessOpen={setSuccessOpen}
          setErrorOpen={setErrorOpen}
        />
        <div className={`fixed z-100 bottom-10 mx-auto items-center justify-center w-full h-30 ${successOpen ? 'flex' : 'hidden'}`}>
          <div className="">
            <Collapse in={successOpen}>
              <Alert
                severity="success"
              >
                <AlertTitle>Success</AlertTitle>
                Transaction Successful
              </Alert>
            </Collapse>
          </div>
        </div>
        <div className={`fixed z-100 bottom-10 flex mx-auto items-center justify-center w-full h-30`}>
          <div className="">
            <Collapse in={errorOpen}>
              <Alert
                severity="error"
              >
                <AlertTitle>Error</AlertTitle>
                Transaction Failed
              </Alert>
            </Collapse>
          </div>
        </div>
      </>
    );
  }

  export default Page;



        
        
        
        


