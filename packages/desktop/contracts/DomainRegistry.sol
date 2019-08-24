pragma solidity ^0.5.11;

/**
 * @title DomainRegistry - Used as a universal registry to store deployed domainDAOs.
 *
 */

contract DomainRegistry {
  mapping(bytes32 => address) public deployedDomains;

  function addDomain(bytes32 domainHash, address domainAddress) public {
      deployedDomains[domainHash] = domainAddress;
  }
  
  function domainExists(bytes32 domainHash) public view returns(bool) {
      return(deployedDomains[domainHash] != address(0x0));
  }
  
  function getDomainAddress(bytes32 domainHash) public view returns(address) {
      return(deployedDomains[domainHash]);
  }
}