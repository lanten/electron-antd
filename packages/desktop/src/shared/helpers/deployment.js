import { DomainDao, DomainRegistry, AdvertisingDAO } from './contracts';
import { ethers } from 'ethers';
const { utils } = ethers;

export const deployContract = async (wallet, provider, hash, url, type) => {
  console.log('====================================');
  console.log({ DomainDao, wallet, provider, hash, url });
  console.log('====================================');

  let pKey = wallet.privateKey;
  let w = new ethers.Wallet(pKey, 'https://mainnet.infura.io/v3/c4f1200594d142dc9927d5ea8c1672e6');

  // let infuraProvider = new ethers.providers.InfuraProvider('https://mainnet.infura.io/v3/c4f1200594d142dc9927d5ea8c1672e6');
  // console.log({ infuraProvider })

  console.log('====================================');
  console.log({ w  });
  console.log('====================================');
  // if (type === 'ad') {
  //   try {
  //     let factory = new ethers.ContractFactory(DomainDao.abi, DomainDao.bytecode, wallet);
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
