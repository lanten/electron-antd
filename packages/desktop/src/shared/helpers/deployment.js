import { DomainDAO, DomainRegistry, AdvertisingDAO } from './contracts';
import { ethers } from 'ethers';
import Web3 from 'web3';
const { utils } = ethers;

export const deployContract = async (wallet, provider, hash, url, type) => {
  const web3Provider = new Web3.providers.HttpProvider('https://goerli.infura.io/v3/82c35d2e074c4021a54f6fd4c0bde238')
  // const web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545')
  let ethersProvider = new ethers.providers.Web3Provider(web3Provider);
  let pk = wallet.privateKey;
  let ww = new ethers.Wallet(pk, ethersProvider);
  console.log('====================================');
  console.log({ ww });
  console.log('====================================');
  try {
    let factory = new ethers.ContractFactory(DomainRegistry.abi, DomainRegistry.bytecode, ww);
    const web3 = new Web3(web3Provider);
    let count = await web3.eth.getTransactionCount(ww.address, 'pending');
    console.log({count})
    let contract = await factory.deploy();
    const response = await contract.deployed();
    console.log('====================================');
    // console.log({ factory, contract, response });
    console.log({ factory, contract, response  });
    console.log('====================================');
  } catch (e) {
    console.log({ e })
  }

  //   console.log({transactionObject})
  //   try {
  //     const rawTx = await web3.eth.accounts.signTransaction(transactionObject, wallet.privateKey);
  //   } catch(err) {
  //     console.log(err.message)
  //   }
    
  //   console.log({rawTx})
  //   const tx = await web3.eth.sendSignedTransaction(rawTx)
  //   console.log({tx})
  // } catch (err) {
  //   console.log(err.message)
  // }

  // console.log({receipt});
  // console.log(domainRegistry)
  // const urlHash = web3.utils.toHex(url);
  // if (type === 'ad') {
  //   try {
  //     let domainDAO = new web3.eth.Contract(DomainRegistry.abi);
  //     console.log({factory})
  //     let contract = await factory.deploy({ gasLimit: 8000000 });
  //     // const response = await contract.deployed(); 
  //     console.log('====================================');
  //     // console.log({ factory, contract, response });
  //     console.log({ factory, contract  });
  //     console.log('====================================');
  //   } catch (e) {
  //     console.log({ e })
  //   }
  // }
}
