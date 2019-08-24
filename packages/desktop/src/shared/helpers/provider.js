import { ethers } from 'ethers';
import HDWalletProvider from "truffle-hdwallet-provider";
const { utils } = ethers;
require('dotenv').config()

export const getWalletProvider = () => {
	var provider = new HDWalletProvider(`${process.env.REACT_APP_PRIVATE_KEY}`, "https://goerli.infura.io/v3/82c35d2e074c4021a54f6fd4c0bde238");
	return provider;
}