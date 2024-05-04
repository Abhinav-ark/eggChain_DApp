"use client";

import React, {useState, useEffect} from 'react';
import Web3Modal from 'web3modal';
import Web3 from 'web3';
import { ethers } from 'ethers';

import tracking from "../artifacts/contracts/Tracking.sol/Tracking.json";
const ContractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const ContractABI = tracking.abi;

// Fetch Smart Contract
const fetchContract = (signerOrProvider) => 
    new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);


export const TrackingContext = React.createContext();

export const TrackingProvider = ({children}) => {
    
    // State Variable 
    const DappName = "eggChain App";
    const [currentUser, setCurrentUser] = useState("");

    const createShipment = async (items) => {
        console.log(items);
        const { receiver, pickupTime, distance, price} = items;

        try {
            //console.log("ContractAdd: ",ContractAddress);
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            //console.log("test",receiver, pickupTime, distance, price);
            const createItem = await contract.createShipment(
                receiver, 
                new Date(pickupTime).getTime(),
                distance*1,
                ethers.utils.parseUnits(price, 18),
                {
                     value: ethers.utils.parseUnits(price, 18),
                }
            );
            
            await createItem.wait();

            //console.log(createItem);
        }
        catch (error) {
            console.log("[ERROR-createShipment]: ",error);
        }
    }

    const totalCount = async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const count = await contract.shipmentCount();
            return count.toString();
        } catch (error) {
            console.log("[ERROR-totalCount]: ",error);
        }
    }

    const getAllShipment = async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);

            const shipments = await contract.getAllTransactions();
            const allShipments = shipments.map((shipment) => ({
                sender: shipment.sender,
                receiver: shipment.receiver,
                price: ethers.utils.formatEther(shipment.price.toString()),
                pickupTime: shipment.pickupTime.toNumber(),
                deliveryTime: shipment.deliveryTime.toNumber(),
                distance: shipment.distance.toNumber(),
                isPaid: shipment.isPaid,
                status: shipment.status,
            }));    

            return allShipments;
        } catch (error) {
            console.log("[ERROR-getAllShipment]: ",error);
        }
    }

    const getShipmentsCount = async () => {
        try {
            if(!window.ethereum) return "Install Metamask First";

            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const shipmentsCount = await contract.getShipmentCount(accounts[0]);
            return shipmentsCount.toNumber();

        } catch (error) {
            console.log("[ERROR-getShipmentsCount]: ",error);
        }
    }

    const getBalance = async () => {
        try {
            if(!window.ethereum) return "Install Metamask First";

            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const web3 = new Web3(window.ethereum);
            const accounts = await web3.eth.getAccounts();
            const balance = await web3.eth.getBalance(accounts[0]);
            console.log("Balance:", balance);
            return ethers.utils.formatEther(balance);

        } catch (error) {
            console.log("[ERROR-getBalance]: ",error);
        }   
    }

    const  completeShipment = async (completeShip) => {
        console.log(completeShip);

        const {receiver,index} = completeShip;
        try {
            if(!window.ethereum) return "Install Metamask First";

            const accounts = await window.ethereum.request({ method: 'eth_accounts' });

            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const transaction = await contract.completeShipment(accounts[0], receiver, index,{gasLimit: 300000});

            transaction.wait();
            console.log(transaction);

        } catch (error) {
            console.log("[ERROR-completeShipment]: ",error);
        }
    }

    const getShipment = async (index) => {
        //console.log(index * 1);
        try {
            if (!window.ethereum) return "Install Metamask First";
            
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const shipment = await contract.getShipment(accounts[0], index*1); // multiplied by one, to convert string to number
            
            const SingleShipment = {
                sender: shipment[0],
                receiver: shipment[1],
                pickupTime: shipment[2].toNumber(),
                deliveryTime: shipment[3].toNumber(),
                distance: shipment[4].toNumber(),
                price: ethers.utils.formatEther(shipment[5].toString()),
                status: shipment[6],
                isPaid: shipment[7],
            };

            return SingleShipment;

        } catch (error) {
            console.log("[ERROR-getShipment]: ",error);
        }
    }

    const startShipment = async (getProduct) => {
        const {receiver, index} = getProduct;
        try {
            if (!window.ethereum) return "Install Metamask First";

            const accounts = await window.ethereum.request({ method: 'eth_accounts' });

            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const shipment = await contract.startShipment(accounts[0], receiver, index*1);

            shipment.wait();
            console.log(shipment);
        } catch (error) {
            console.log("[ERROR-startShipment]: ",error);
        }
    };

    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum) return "Connect Wallet First";

            const accounts = await window.ethereum.request({ method: 'eth_accounts' });

            if (accounts.length > 0) {
                setCurrentUser(accounts[0]);
            } else {
                setCurrentUser("");
            }
        } catch (error) {
            console.log("[ERROR-checkIfWalletConnected]: ",error);
        }
    };
    
    const connectWallet = async () => {
        try {
            if (!window.ethereum) return "Install Metamask First";

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setCurrentUser(accounts[0]);
        } catch (error) {
            console.log("[ERROR-connectWallet]: ",error);
        }
    };

    useEffect(() => {
        checkIfWalletConnected();
    }, []);

    return (
        <TrackingContext.Provider
            value={{
                connectWallet,
                createShipment,
                getAllShipment,
                completeShipment,
                getShipment,
                startShipment,
                getShipmentsCount,
                getBalance,
                totalCount,
                DappName,
                currentUser,
            }}
        >
            {children}
        </TrackingContext.Provider>
    )

}
