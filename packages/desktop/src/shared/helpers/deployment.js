import { DomainDAO, DomainRegistry, AdvertisingDAO } from './contracts';
import { ethers } from 'ethers';
import Web3 from 'web3';
const { utils } = ethers;

const setupWallet = async(wallet) => {
  const web3Provider = new Web3.providers.HttpProvider('https://goerli.infura.io/v3/82c35d2e074c4021a54f6fd4c0bde238')
  let ethersProvider = new ethers.providers.Web3Provider(web3Provider);
  let pk = wallet.privateKey;
  let ww = new ethers.Wallet(pk, ethersProvider);
  return(ww)
}

export const deployDomainRegistry = async (_wallet) => {
  const wallet = await setupWallet(_wallet);
  console.log("deploying registry")
  try {
    let factory = new ethers.ContractFactory(DomainRegistry.abi, DomainRegistry.bytecode, wallet);
    let contract = await factory.deploy();
    const response = await contract.deployed();
    console.log(`registry deployed at ${response.address}`)
    return response.address;
  } catch (e) {
    console.log({ e })
  }
}

export const deployDomainDAO = async (_wallet, url, domainRegistryAddress) => {
  const wallet = await setupWallet(_wallet);
  console.log("deploying DAO")
  try {
    let factory = new ethers.ContractFactory(DomainDAO.abi, DomainDAO.bytecode, wallet);
    let contract = await factory.deploy(domainRegistryAddress, ethers.utils.id(url), {gasLimit: 8000000, value: 1});
    const response = await contract.deployed();
    console.log(`domain DAO deployed at ${response.address}`)
    return response.address;
  } catch (e) {
    console.log({ e })
  }
}

export const deployAdvertisingDAO = async (_wallet, domainDAOAddress) => {
  const wallet = await setupWallet(_wallet);
  console.log("deploying advertising DAO")
  try {
    let factory = new ethers.ContractFactory(AdvertisingDAO.abi, AdvertisingDAO.bytecode, wallet);
    let contract = await factory.deploy(domainDAOAddress, {gasLimit: 8000000});
    const response = await contract.deployed();
    console.log(`advertising DAO deployed at ${response.address}`)
    return response.address;
  } catch (e) {
    console.log({ e })
  }
}