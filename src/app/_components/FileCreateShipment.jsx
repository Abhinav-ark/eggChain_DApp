"use client";
import React from 'react';
import { useState } from 'react';
import Str1 from './SVG/Str1';

const FileCreateShipment = ({
  setFileCreateShipmentModal,
  fileCreateShipmentModal,
  setCreateShipmentModal,
  createShipment,
  setSuccessOpen,
  setErrorOpen,
}) => {
  
    
  const createItem = async (content) => {
    try {
      const res = await createShipment({receiver:content.receiver, containerId:content.containerId, pickupTime:content.pickupTime, distance:content.distance, price:content.price});
      if (res) {
        setSuccessOpen(true);
        setTimeout(() => {
          setSuccessOpen(false);
          setFileCreateShipmentModal(false);
        }, 2000);
      } else {
        setErrorOpen(true);
        setTimeout(() => {
          setErrorOpen(false);
        }, 2000);
      }
    } catch (error){
      console.log("Wrong Creating item");
    }
  };

    const [file, setFile] = useState(null);
  
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }
  
    const handleFileUpload = async () => {
        if (!file) {
            alert('Please select a file');
            return;
        }
  
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = JSON.parse(e.target.result);
          createItem(content);
        }
        reader.readAsText(file);

    }

  return fileCreateShipmentModal ? (
    <div className='fixed inset-0 z-10 overflow-y-auto'>
      <div
        className='fixed inset-0 w-full h-full bg-black opacity-40'
        onClick={() => setFileCreateShipmentModal(false)}
      ></div>
      <div className='flex items-center min-h-screen px-4 py-8'>
        <div className='relative w-full max-w-lg p-4 mx-auto bg-white rounded-2xl shadow-lg'>
          <div className='flex justify-end'>
            <button
              className='p-2 text-gray-400 rounded-md hover:bg-gray-100'
              onClick={() => setFileCreateShipmentModal(false)}
            >
              <Str1 />
            </button>
          </div>
          <div className='max-w-sm mx-auto py-3 space-y-3 text-center'>
            <h4 className='text-lg text-gray-800 font-semibold'>
              Create Egg Shipment
            </h4>
            <div className='space-y-5 pb-10'>
                <h1 className='font-semibold'>Upload a JSON file</h1>
                <input type="file" className='border-2 border-black rounded-xl' onChange={handleFileChange} />
            </div>
            <button
                onClick={() => handleFileUpload()}
                className='block w-full mt-3 py-3 px-4 font-medium text-sm text-center
                text-black bg-[#f7ab05]/95 hover:bg-[#f7ab05]/85 active:bg-[#f7ab05]/100
                rounded-lg ring-offset-2 ring-[#f7ab05] focus:ring-2'
              >
                Create Shipment
            </button>
            <button onClick={() => {setFileCreateShipmentModal(false); setCreateShipmentModal(true);}} className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center
                text-black bg-[#f7ab05]/95 hover:bg-[#f7ab05]/85 active:bg-[#f7ab05]/100
                rounded-lg ring-offset-2 ring-[#f7ab05] focus:ring-2"
              >
                Use GUI Input
            </button>
          </div>  
        </div>
      </div>
    </div>
  ) : ("");
};

export default FileCreateShipment;


