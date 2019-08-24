import { ethers } from 'ethers';
const { utils } = ethers;
require('dotenv').config()

// will create a random key pair
export const generateWallet = (provider) => {
  return new ethers.Wallet(`${process.env.REACT_APP_PRIVATE_KEY}`, provider);
}

export const encryptKeys = () => {}

