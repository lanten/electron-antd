pragma solidity ^0.5.11;

import "openzeppelin-solidity/contracts/payment/escrow/Escrow.sol";
import "./PaymentSplitter.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./DomainDAO.sol";

/**
 * @title AdvertisingDAO - Example of how a DApp/DAO can be integrated into a given domain once approved by the domain DAO
 *
 */

contract AdvertisingDAO {
  using SafeMath for uint;
  address domainDAOAddress;
  mapping(uint => Bid) bids;
  
  constructor(address _domainDAOAddress) public {
    domainDAOAddress = _domainDAOAddress;
  }
  
  struct Bid {
    uint bidID;   // MAKE bytes32, will be used for graphQL query on domain space for bid info
    address payable paymentSplitter;
    Escrow escrow;
    address payable[] investorArray;
  }
  
  /**
   * @dev Returns the amount of shares an investor owns, as well as the total shares in the domain. Used as numerator and denominator
   * Uses info from DomainDAO
   * @param bidID unique identifier for a bid, used to query info in 3box
   * @param info JSON information about a bid
   */
  function createBid(uint bidID, bytes32 info) public payable { // Modifiers are handled by domainDAO
    require(msg.value > 0, 'Must have a bid price in order to bid on an advertisement');
    DomainDAO domainDAO = DomainDAO(domainDAOAddress);
    domainDAO.createBid(bidID, info);
    address payable[] memory investorArray = domainDAO.getInvestorArraySnapshot(bidID);
    uint[] memory investorSharesArray = domainDAO.getInvestorSharesArraySnapshot(bidID);
    PaymentSplitter paymentSplitter = new PaymentSplitter(investorArray, investorSharesArray, msg.sender);
    Escrow escrow = new Escrow();
    escrow.deposit.value(msg.value)(address(paymentSplitter));
    Bid memory bid = Bid(bidID, address(paymentSplitter), escrow, investorArray);
    bids[bidID] = bid;
  }
  
  /**
   * @dev Approves a bid, deletes all data relevant to that bid, and adds bid to approvedBids
   * @param bidID unique identifier for a bid, used to query info in 3box
   * @param approved bool value indicating whether the user approved the bid
   */
  function vote(uint bidID, bool approved) public returns (string memory) { // Modifiers are handled by domainDAO
    DomainDAO domainDAO = DomainDAO(domainDAOAddress);
    uint response = domainDAO.vote(bidID, approved, true);
    if(response == 1) { // approved
      closeBid(bidID, true);
      return("approved");
    } else if(response == 2) {
      closeBid(bidID, false);
      return("rejected");
    } else {
      return("neutral");
    }
  }
  
  /**
   * @dev Approves or rejects a bid, deletes all data relevant to that bid, and adds bid to approvedBids if approved
   * @param bidID unique identifier for a bid, used to query info in 3box
   */
  function closeBid(uint bidID, bool approved) private {
    Escrow escrow = bids[bidID].escrow;
    escrow.withdraw(bids[bidID].paymentSplitter); // Send ETH to Payment Splitter when bid is closed
    PaymentSplitter paymentSplitter = PaymentSplitter(bids[bidID].paymentSplitter);
    if(approved) {
      DomainDAO domainDAO = DomainDAO(domainDAOAddress);
      address payable[] memory investorArray = bids[bidID].investorArray;
      for(uint i = 0; i < investorArray.length; i += 1) {
        paymentSplitter.release(investorArray[i]);
      }
    } else {
      paymentSplitter.returnFunds();
    }
  }
  
  function getPaymentSplitter(uint bidID) public view returns(address) {
    return(address(bids[bidID].paymentSplitter));
  }
  
  function getEscrow(uint bidID) public view returns(address) {
    return(address(bids[bidID].escrow));
  }
}