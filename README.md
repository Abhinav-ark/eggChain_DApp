<div align="center" style="display:flex; align-items: center; justify: center; text-decoration: none ">
    <a href="https://github.com/Abhinav-ark/eggChain_DApp/blob/main/LICENSE" target="_blank" rel="noreferrer">
      <img align='center' src="https://img.shields.io/badge/LICENSE-MIT-green"/>
    </a>
    <a href="https://github.com/Abhinav-ark/eggChain_DApp" target="_blank" rel="noreferrer">
      <img align='center' src="https://img.shields.io/github/created-at/Abhinav-ark/eggChain_DApp"/>
    </a>  
</div>

<h1 align='center'>eggChain Decentralized App</h1>

<div align='center'>
  <img src='./Assets/gif.gif' width='600px'/>
</div>

<br>

<!-- <h2 align='center'>About</h2> -->

EggChain is a Decentralized Application based on `Etherium` Blockchain to track egg shipments from the place of production to the final destination of sale.

Every transaction is public to the consumer, to view the entire history of every single trasaction in the `supply chain`.

<h2 align='center'>Tech Stack</h2>
<div align='center'>
    <img src="./Assets/hardhat.png" width='60px' title='Hardhat' style='margin-right:5px'/>
    <img src="./Assets/etherium.png" width='45px' title='Etherium' style='margin-right:7px'/>
    <img src="./Assets/web3js.jpg" width='55px' title='Web3.js' style='margin-right:10px'/>
    <img src="./Assets/solidity.svg" title='Solidity' style='margin-right:5px'/>
    <img src="./Assets/react.svg" title='React' style='margin-right:5px'/>
    <img src="./Assets/next.svg" title='NextJs' style='margin-right:5px'/>
    <img src="./Assets/mui.svg" title='MUI React' style='margin-right:5px'/>
    <img src="./Assets/tailwind.svg" title='TailwindCSS' style='margin-right:5px'/>
</div>

## Features
- [x] Creation of Shipments, one at a time or multiple entries at a time using `JSON` file format.
- [x] Starting the Shipment from the Sender to Receiver.
- [x] Receive and `Pay` in `Ether` for shipments at Receiver's End
- [x] Wallet based `authentication` to ensure, only the owner of a shipment can perform operations on it.
- [x] Looking up `Current Shipment Status & Details` By ID.
- [x] `Search for shipments` based on containerId, sender address and receiver address.

## How to Run the DApp
- Either clone the repository (or) download the Source Code from the latest release.
- Make sure you have [`nodeJS`](https://nodejs.org/en/download) installed on your Computer (Node 20 LTS is recommended).
- Run this command from the parent directory, to install all dependencies.
```bash
> npm install --force
```
- Run a local hardhat node.
```bash
> npx hardhat node
```
- A `JSON RPC Server` is started in your localhost:8545 and you get 20 Accounts with 10000 Eth. in each account.

<div align="center">
    <img src="./Assets/hardhat_node.png" width="500px" />
</div>

- Create a new terminal instance and `deploy the smart contract` to the local network.
```bash
> npx hardhat ignition deploy ignition/modules/Tracking.js --network localhost
```
<div align="center">
    <img src="./Assets/hardhat_ignition.png" width="500px" />
</div>

> [!IMPORTANT]
> Run `npx hardhat clean` and `npx hardhat compile` to clean the artifacts of the previous smart contract and compile the new one, whenever you modify the smart contract.

- Create a .env file to enter the contract address you got in the previous step as an Environmental Variable.
<div align="center">
    <img src="./Assets/env.png" width="500px" />
</div>

- Start a local NextJS development server.
```bash
> npm run dev
```

- You can access the DApp from `http://localhost:3000` in your `Google Chrome` Browser.

- Install `Metamask wallet` extension for Google Chrome.

- Login to your Metamask Wallet

- Add and connect to the local Etherium network. `Settings > Networks > Add A Network > Add a network manually`
<div align="center">
    <img src="./Assets/add_network.png" width="400px" />
</div>

- Add any accounts to the Metamask Wallet from the 20 you got after running the hardhat node. Goto `Add account > Import Account`. Enter the private key of the account you want to import and click on Import.

- You can interact with the DApp now after logging in to an Account on the network.

> [!WARNING]
> If you transactions keep failing and you get a `MetaMask - RPC Error: Internal JSON-RPC error` on the console, It is most likely due to an Issue with Metamask. In that Case goto `Settings > Advanced` and click on `Clear activity tab data` and try again.











