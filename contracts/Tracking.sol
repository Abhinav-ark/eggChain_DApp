// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Tracking {
    enum ShipmentStatus {PENDING, INTRANSIT, DELIVERED}

    struct Shipment {
        address sender;
        address receiver;
        string containerId;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        ShipmentStatus status;
        bool isPaid;
    }

    mapping(address => Shipment[]) public shipments;

    address[] private senders;

    uint256 public shipmentCount;

    //another struct for display purpose
    struct TypeShipment {
        address sender;
        address receiver;
        string containerId;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        ShipmentStatus status;
        bool isPaid;
    }

    TypeShipment[] typeShipments; 

    event ShipmentCreated(address indexed sender, address indexed receiver, string containerId, uint256 pickupTime, uint256 distance, uint256 price);
    event ShipmentInTransit(address indexed sender, address indexed receiver, uint256 pickupTime);
    event ShipmentDelivered(address indexed sender, address indexed receiver, uint256 deliveryTime);
    event ShipmentPaid(address indexed sender, address indexed receiver, uint256 price);


    constructor() {
        shipmentCount = 0;
    }

    function createShipment(address _receiver,string memory _containerId, uint256 _pickupTime, uint256 _distance, uint256 _price) public {
        bool containerIdExists = false;
        for (uint256 i = 0; i < senders.length; i++) {
            for (uint256 j = 0; j < shipments[senders[i]].length; j++) {
                if(keccak256(abi.encodePacked(shipments[senders[i]][j].containerId)) == keccak256(abi.encodePacked(_containerId))){
                    containerIdExists = true;
                    break;
                }
            } 
                
        }
        require(!containerIdExists, "The Container with given ID already exixts");

        Shipment memory shipment = Shipment(msg.sender, _receiver, _containerId, _pickupTime, 0, _distance, _price, ShipmentStatus.PENDING, false);
        
        shipments[msg.sender].push(shipment);
        shipmentCount++;

        bool exists = false;
        for (uint256 i = 0; i < senders.length; i++) {
            if (senders[i] == msg.sender) {
                exists = true;
                break;
            }
        }
        if (!exists) {
            senders.push(msg.sender);
        }

        typeShipments.push(TypeShipment(msg.sender, _receiver, _containerId, _pickupTime, 0, _distance, _price, ShipmentStatus.PENDING, false));

        emit ShipmentCreated(msg.sender, _receiver, _containerId, _pickupTime, _distance, _price);
    }


    struct ShipmentData {
    address receiver;
    string containerId;
    uint256 pickupTime;
    uint256 distance;
    uint256 price;
    }

    function createShipments(ShipmentData[] memory shipmentsData) public {
        for (uint256 k = 0; k < shipmentsData.length; k++) {
            bool containerIdExists = false;
            for (uint256 i = 0; i < senders.length; i++) {
                for (uint256 j = 0; j < shipments[senders[i]].length; j++) {
                    if (keccak256(abi.encodePacked(shipments[senders[i]][j].containerId)) == keccak256(abi.encodePacked(shipmentsData[k].containerId))) {
                        containerIdExists = true;
                        break;
                    }
                }
                // Additional logic as needed 
            }

            // Check container ID exists before proceeding
            require(!containerIdExists, "The Container with given ID already exists");

            // Create Shipment struct using input data
            Shipment memory shipment = Shipment(msg.sender, shipmentsData[k].receiver, shipmentsData[k].containerId, shipmentsData[k].pickupTime, 0, shipmentsData[k].distance, shipmentsData[k].price, ShipmentStatus.PENDING, false);

            // Add new shipment to sender's shipments
            shipments[msg.sender].push(shipment);
            shipmentCount++;

            // Check if sender already exists in list
            bool exists = false;
            for (uint256 i = 0; i < senders.length; i++) {
                if (senders[i] == msg.sender) {
                    exists = true;
                    break;
                }
            }
            // Add sender to senders list if not exists
            if (!exists) {
                senders.push(msg.sender);
            }

            // Add shipment to typeShipments list
            typeShipments.push(TypeShipment(msg.sender, shipmentsData[k].receiver, shipmentsData[k].containerId, shipmentsData[k].pickupTime, 0, shipmentsData[k].distance, shipmentsData[k].price, ShipmentStatus.PENDING, false));

            // Emit event for the created shipment
            emit ShipmentCreated(msg.sender, shipmentsData[k].receiver, shipmentsData[k].containerId, shipmentsData[k].pickupTime, shipmentsData[k].distance, shipmentsData[k].price);
        }
    }


    function startShipment(address _sender, address _receiver, uint256 _index) public {
        Shipment storage shipment = shipments[_sender][_index];
        TypeShipment storage typeShipment = typeShipments[_index];

        require(shipment.receiver == _receiver, "Invalid receiver");
        require(shipment.status == ShipmentStatus.PENDING, "Shipment already in Transit.");

        shipment.status = ShipmentStatus.INTRANSIT;
        typeShipment.status = ShipmentStatus.INTRANSIT;

        emit ShipmentInTransit(_sender, _receiver, shipment.pickupTime);

    }

    function completeShipment(address _sender, address _receiver, uint256 _index) public payable {
        Shipment storage shipment = shipments[_sender][_index];
        TypeShipment storage typeShipment = typeShipments[_index];

        require(shipment.receiver == _receiver, "Invalid receiver");
        require(shipment.status == ShipmentStatus.INTRANSIT, "Shipment not in Transit.");
        require(!shipment.isPaid, "Shipment already paid.");

        shipment.status = ShipmentStatus.DELIVERED;
        typeShipment.status = ShipmentStatus.DELIVERED;

        shipment.deliveryTime = block.timestamp/1000 + shipment.pickupTime;
        typeShipment.deliveryTime = block.timestamp/1000 + shipment.pickupTime;

        uint256 amount = shipment.price;

        payable(shipment.sender).transfer(amount);

        shipment.isPaid = true;
        typeShipment.isPaid = true;

        emit ShipmentDelivered(_sender, _receiver, shipment.deliveryTime);
        emit ShipmentPaid(_sender, _receiver, amount);
    }

    function sendShipment(address _newReceiver, string memory _containerId, uint256 _pickupTime, uint256 _distance, uint256 _price) public payable{
        bool containerIdExists = false;
        address _sender=msg.sender;
        Shipment memory oldShipment;
        // Check if provided container ID matches any existing container ID in the chain

        for (uint256 i = 0; i < senders.length; i++) {
            for (uint256 j = 0; j < shipments[senders[i]].length; j++) {
                if(keccak256(abi.encodePacked(shipments[senders[i]][j].containerId)) == keccak256(abi.encodePacked(_containerId)) && shipments[senders[i]][j].receiver == _sender){
                    containerIdExists = true;
                    oldShipment= shipments[senders[i]][j];
                    break;
                }
            } 
                
        }


        require(containerIdExists, "You don't have access to send this container");
        require(oldShipment.status == ShipmentStatus.DELIVERED, "Shipment is not received yet");
        
        
        Shipment memory newShipment;
        // Update shipment details
        newShipment.sender = _sender;
        newShipment.receiver = _newReceiver;
        newShipment.containerId = _containerId;
        newShipment.pickupTime = _pickupTime;
        newShipment.distance = _distance;
        newShipment.price = _price;

        shipments[_sender].push(newShipment);
        shipmentCount++;

        typeShipments.push(TypeShipment(msg.sender, _newReceiver, _containerId, _pickupTime, 0, _distance, _price, ShipmentStatus.PENDING, false));

        emit ShipmentCreated(msg.sender, _newReceiver, _containerId, _pickupTime, _distance, _price);
    }



    function getShipment(address _sender, uint256 _index) public view returns (address, address,string memory, uint256, uint256, uint256, uint256, ShipmentStatus, bool) {
        Shipment memory shipment = shipments[_sender][_index];
        return (shipment.sender, shipment.receiver, shipment.containerId, shipment.pickupTime, shipment.deliveryTime, shipment.distance, shipment.price, shipment.status, shipment.isPaid);
    }

    function getShipmentCount(address _sender) public view returns (uint256) {
        return shipments[_sender].length;
    }

    function getAllTransactions() public view returns (TypeShipment[] memory) {
        return typeShipments;
    }

}