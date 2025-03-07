"use client";
import React from 'react';
import { useState } from 'react';
import Str1 from './SVG/Str1';

const StartShipment = ({startModal, setStartModal, startShipment, setSuccessOpen, setErrorOpen}) => {
  
  const [getProduct, setGetProduct] = useState({receiver:"", index:"",});
  
  const startShipping = async () => {
    const res = await startShipment(getProduct);
      if (res) {
        setSuccessOpen(true);
        setTimeout(() => {
          setSuccessOpen(false);
          setStartModal(false);
        }, 2000);
      } else {
        setErrorOpen(true);
        setTimeout(() => {
          setErrorOpen(false);
        }, 2000);
      }
  }

  return startModal ? (
    <div className='fixed inset-0 z-1 overflow-y-auto'>
      <div
        className='fixed inset-0 w-full h-full bg-black opacity-40'
        onClick={() => setStartModal(false)}
      ></div>
      <div className='flex items-center min-h-screen px-4 py-8'>
        <div className='relative w-full max-w-lg p-4 mx-auto bg-white rounded-2xl shadow-lg'>
          <div className='flex justify-end'>
            <button
              className='p-2 text-gray-400 rounded-md hover:bg-gray-100'
              onClick={() => setStartModal(false)}
            >
              <Str1 />
            </button>
          </div>
          <div className='max-w-sm mx-auto py-3 space-y-3 text-center'>
            <h4 className='text-lg font-medium text-gray-800'>
              Start Shipment
            </h4>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className='relative mt-3'>
                <input
                  type='text'
                  placeholder='Receiver'
                  className='w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent
                  outline-none border focus:border-[#f7ab05] shadow-sm rounded-lg'
                  onChange={(e) => setGetProduct({...getProduct, receiver:e.target.value})}
                />
              </div>
              <div className='relative mt-3'>
                <input
                  type='number'
                  placeholder='Id'
                  className='w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent
                  outline-none border focus:border-[#f7ab05] shadow-sm rounded-lg'
                  onChange={(e) => setGetProduct({...getProduct, index:e.target.value})}
                />
              </div>
              <button
                onClick={startShipping}
                className='block w-full mt-3 py-3 px-4 font-medium text-sm text-center
                text-black bg-[#f7ab05]/95 hover:bg-[#f7ab05]/85 active:bg-[#f7ab05]/100
                rounded-lg ring-offset-2 ring-[#f7ab05] focus:ring-2'
              >
                Start Shipment
              </button>
            </form>
          </div>  
        </div>
      </div>
    </div>
  ) : ("");
};

export default StartShipment;