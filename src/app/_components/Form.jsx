"use client";
import { useState } from 'react';

const Form = ({ 
  setCreateShipmentModal,
  createShipmentModal,
  setFileCreateShipmentModal,
  createShipment,
  setSuccessOpen,
  setErrorOpen,
}) => {
  const [shipment, setShipment] = useState({
    receiver: '',
    containerId: '',
    pickupTime: '',
    distance: '',
    price: '',

  });

  // const createItem = async () => {
  //   try {
  //     const res = await createShipment(shipment);
  //     if (res) {
  //       setSuccessOpen(true);
  //       setCreateShipmentModal(false);
  //     } else {
  //       setErrorOpen(true);
  //     }
  //   } catch (error){
  //     console.log("Wrong Creating item");
  //   }
  // };

  const createItem = async () => {
    try {
      const res = await createShipment(shipment);
      if (res) {
        setSuccessOpen(true);
        setTimeout(() => {
          setSuccessOpen(false);
          setCreateShipmentModal(false);
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

  return createShipmentModal ? (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => setCreateShipmentModal(false)}></div>
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="flex justify-end">
            <button onClick={() => setCreateShipmentModal(false)} className="p-2 text-gray-400 rounded-2xl hover:bg-gray-100">
              <svg xmlns="http:www.w3.org/2000/svg" className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" 
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"/>
              </svg>
            </button>
          </div>
          <div className="max-w-sm mx-auto-3 py-3 space-y-3 text-center items-center justify-center mx-auto">
            <h4 className="text-lg font-medium text-gray-800">
              Create Egg Shipment
            </h4>
            <p className="text-[15px] text-gray-600">
              Create a new shipment

            </p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="relative mt-3">
                <input type="text" placeholder="receiver" onChange={(e) => setShipment({...shipment, receiver: e.target.value,})} className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-[#f7ab05] shadow-sm rounded-lg" />
              </div>
              <div className="relative mt-3">
                <input type="text" placeholder="containerId" onChange={(e) => setShipment({...shipment, containerId: e.target.value,})} className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-[#f7ab05] shadow-sm rounded-lg" />
              </div>
              <div className="relative mt-3">
                <input type="date" placeholder="pickupTime" onChange={(e) => setShipment({...shipment, pickupTime: e.target.value,})} className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-[#f7ab05] shadow-sm rounded-lg" />
              </div>
              <div className="relative mt-3">
                <input type="text" placeholder="distance"  onChange={(e) => setShipment({...shipment, distance: e.target.value,})} className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-[#f7ab05] shadow-sm rounded-lg" />
              </div>
              <div className="relative mt-3">
                <input type="text" placeholder="price" onChange={(e) => setShipment({...shipment, price: e.target.value,})} className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-[#f7ab05] shadow-sm rounded-lg" />
              </div>


              <button onClick={() => createItem()} className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center
                text-black bg-[#f7ab05]/95 hover:bg-[#f7ab05]/85 active:bg-[#f7ab05]/100
                rounded-lg ring-offset-2 ring-[#f7ab05] focus:ring-2"
              >
                Create Shipment
              </button>
              <button onClick={() => {setCreateShipmentModal(false); setFileCreateShipmentModal(true)}} className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center
                text-black bg-[#f7ab05]/95 hover:bg-[#f7ab05]/85 active:bg-[#f7ab05]/100
                rounded-lg ring-offset-2 ring-[#f7ab05] focus:ring-2"
              >
                Use JSON File
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Form;