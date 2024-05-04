"use client";
import React, {useState, useEffect} from 'react';

// Internal Import
import Str1 from './SVG/Str1';

const ShipmentCount = ({openCount, setOpenCount, totalCount}) => {
  
  const [count, setCount] = useState(0);
  const [balance, setBalance] = useState(0);
  
  useEffect(() => {
    
    return async () => {
      const countData = await totalCount();
      setCount(countData);
    };
  }, []);

  return openCount ? (
    <div className='fixed inset-0 z-10 overflow-y-auto'>
      <div 
        className='fixed inset-0 w-full h-full bg-black opacity-40'
        onClick={() => setOpenCount(false)}
      ></div>
      <div className='flex items-center min-h-screen px-4 py-8'>
        <div className='relative w-full max-w-lg p-4 mx-auto bg-white rounded-2xl shadow-lg'>
          <div className='flex justify-end'>
            <button
              className='p-2 text-gray-400 rounded-md hover:bg-gray-100'
              onClick={() => setOpenCount(false)}
            >
              <Str1 />
            </button>
          </div>
          <div className='max-w-sm mx-auto py-3 space-y-3 text-center'>
            <div className = 'flex flex-col items-center pb-10'>                       
              <div className='flex mt-4 space-x-3 md:mt-6'>
                <a 
                  href="./"
                  className="inline-flex items-center px-4 py-2 text-4xl font-medium
                  text-center text-black rounded-lg border-2"
                >
                  Total Shipments: {count}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </div>
  ) : ("");
};

export default ShipmentCount;