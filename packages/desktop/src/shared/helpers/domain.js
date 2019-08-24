import { ethers } from 'ethers';
const { utils } = ethers;

export const hashDomainUrl = (url) => {
    let domainBytes = utils.toUtf8Bytes(url);
    return utils.keccak256(domainBytes);
}