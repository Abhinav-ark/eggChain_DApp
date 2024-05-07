import React from 'react'

const CreateShipment = ({setCreateShipmentModal}) => {
  return (
    <div className='max-w-screen-xl mx-auto px-4 md:px-8 mt-10'>
        <div className="items-start justify-between md:flex">
            <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                Create New Shipment
            </h3>
            <p className="text-gray-600 mt-2">
                Use JSON option to create multiple shipments at once.
            </p>
            </div>
            <div className="mt-3 md:mt-0">
            <p onClick={() => setCreateShipmentModal(true)} className="inline-block px-4 py-2 text-white duration-150 font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 md:text-sm rounded-lg md:inline-flex" href="#">
                Add Tracking
            </p>
            </div>
        </div>
    </div>
  )
}

export default CreateShipment