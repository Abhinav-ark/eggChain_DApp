"use client";
import React,{ useState, useEffect } from "react";

const Table = ({ setCreateShipmentModal, allShipmentsdata, currentUser }) => {
  
  const [search, setSearch] = useState('');
  const [allShipments, setallShipments] = useState([...allShipmentsdata]);

  useEffect(() => {
    console.log('all1',allShipmentsdata,"all1", currentUser);
  }, []);

  useEffect(() => {
    const searchFilter = allShipmentsdata.filter((shipment) => {
      if (search === '') return true;
      return shipment.sender.toLowerCase().includes(search.toLowerCase()) || shipment.receiver.toLowerCase().includes(search.toLowerCase()) || shipment.containerId.toLowerCase().includes(search.toLowerCase());
    });
    setallShipments(searchFilter);
  }, [search, allShipmentsdata]);

  const convertTime = (time) => {
    if (time == 0 ){
      return 'Not Delivered'
    }
    const newTime = new Date(time);
    const dataTime = new Intl.DateTimeFormat('en-UK', {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(newTime);
    return dataTime;
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Create Tracking

          </h3>
          <p className="text-gray-600 mt-2">
            Create a new tracking for your shipment
          </p>
        </div>
        <div className="mt-3 md:mt-0">
          <p onClick={() => setCreateShipmentModal(true)} className="inline-block px-4 py-2 text-white duration-150 font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 md:text-sm rounded-lg md:inline-flex" href="#">
            Add Tracking
          </p>
        </div>
      </div>
      <div className="my-5 flex justify-end">
        <input type="text" placeholder="Search Containers (sender, receiver or containerId) ..." onChange={(e) => (setSearch(e.target.value))} className="w-2/5 pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-[#f7ab05] shadow-sm rounded-lg" />
      </div>
      <div className="shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">ID</th>
              <th className="py-3 px-6">Sender</th>
              <th className="py-3 px-6">Reciever</th>
              <th className="py-3 px-6">ContainerId</th>
              <th className="py-3 px-6">PickupDate</th>
              <th className="py-3 px-6">Distance</th>
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">DeliveryDate</th>
              <th className="py-3 px-6">Payment</th>
              <th className="py-3 px-6">Status</th>
            </tr>

          </thead>
          <tbody className="text-gray-600 divide-y">
            {allShipments.map((shipment, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">{shipment.sender!==currentUser?idx:""}</td>
                <td className="px-6 py-4 whitespace-nowrap">{shipment.sender.slice(0, 10)}... </td>
                <td className="px-6 py-4 whitespace-nowrap">{shipment.receiver.slice(0, 10)}... </td>
                <td className="px-6 py-4 whitespace-nowrap">{shipment.containerId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{convertTime(shipment.pickupTime)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{shipment.distance} Km</td>
                <td className="px-6 py-4 whitespace-nowrap">{shipment.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">{convertTime(shipment.deliveryTime)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{shipment.isPaid ? 'Completed' : 'Not Complete'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{shipment.status==0 ? "Pending" : shipment.status==1 ? "In_Transit" : "Delivered"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
