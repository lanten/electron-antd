pragma solidity ^0.5.11;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

/**
 * @title DomainDAO - Equity based voting system managed by domain investors
 *
 */

contract DomainDAO {
  using SafeMath for uint;
  mapping(address => bool) public investors;
  mapping(address => uint) internal investorIndex;
  address[] public investorArray;
  mapping(address => uint) public investorShares; // Equity is counted as shares, (1 wei = 1 share, taken from msg.value in invest())
  uint[] public investorSharesArray;
  uint public totalShares;
  
  mapping(uint => mapping(address => bool)) investorsSnapshot;      // Investors in domainDAO when bid is initiated, by bidID
  mapping(uint => mapping(address => uint)) investorSharesSnapshot; // Shares that each investor has when bid is initiated, by bidID
  mapping(uint => address[]) investorArraySnapshot;                 // Array of investor addresses when bid is initiated, by bidID
  mapping(uint => mapping(address => bool)) bidVoters;              // Investors that have voted for a bid
  
  mapping(uint => Bid) openBids;
  mapping(uint => bool) closedBids;
  uint[] public approvedBids;
  
  event BidApproved(address domainAddress, uint bidID, string smartContractFile, uint timestamp);
  event BidRejected(address domainAddress, uint bidID, string smartContractFile, uint timestamp);

  constructor() public payable {
    require(msg.value > 0, 'Must invest some ETH to deploy a domain DAO');
    totalShares = 0;
    invest();
  }
  
  modifier isInvestor() {
    require(investors[msg.sender] == true, 'User must be invested in domain');
    _;
  }
  
  modifier isInvestorInBid(uint bidID) {
    require(investorsSnapshot[bidID][msg.sender] == true, 'User must be invested when bid was created');
    _;
  }

  modifier bidExists(uint bidID) {
    Bid memory bid = openBids[bidID];
    require(bid.exists, 'Bid does not exist at this ID');
    _;
  }
  
  modifier bidIsUnique(uint bidID) {
    Bid memory bid = openBids[bidID];
    require(!bid.exists, 'Bid with this ID exists and is open');
    require(!closedBids[bidID], 'Bid with this ID exists and has been closed');
    _;
  }
  
  modifier hasNotVoted(uint bidID) {
    require(!bidVoters[bidID][msg.sender], 'User has already voted on this bid');
    _;
  }
  
  struct Bid {
    uint bidID;               // MAKE bytes32, will be used for graphQL query on domain space for bid info
    string smartContractFile; // Temporarily using filename for the scope of this PoC, will make more robust later
    uint votesFor;
    uint votesAgainst;
    uint halfOfShares;
    bool exists;
  }
  
  function getBid(uint bidID) public view returns (uint, string memory, uint, uint, uint, bool) {
    Bid memory bid = openBids[bidID];
    return(bid.bidID, bid.smartContractFile, bid.votesFor, bid.votesAgainst, bid.halfOfShares, bid.exists);
  }

  /**
   * @dev Uses msg.value to add amount of shares in wei to be used for equity in the domainDAO
   */
  function invest() public payable {
    require(msg.value > 0, 'Must invest some ETH become a domainDAO investor');
    if(!investors[msg.sender]) {
      investors[msg.sender] = true;
      investorArray.push(msg.sender);
      investorSharesArray.push(msg.value);
      investorIndex[msg.sender] = investorArray.length - 1;
    } else {
      investorSharesArray[investorIndex[msg.sender]] += msg.value;
    }
    investorShares[msg.sender] += msg.value;
    totalShares += msg.value;
    assert(investorArray.length == investorSharesArray.length);
  }

  /**
   * @dev Returns the amount of shares an investor owns, as well as the total shares in the domain. Used as numerator and denominator
   */
  function getInvestorEquity(address investor) public view returns(uint, uint) {
    uint shares = investorShares[investor];
    return(shares, totalShares);
  }
  
  /**
   * @dev Returns the amount of shares an investor owns, as well as the total shares in the domain. Used as numerator and denominator
   * @param bidID unique identifier for a bid, used to query info in 3box
   * @param smartContractFile temporary solution for deploying smart contracts dynamically once a bid is approved
   */
  function createBid(uint bidID, string memory smartContractFile) public payable isInvestor() bidIsUnique(bidID) {
    for(uint i = 0; i < investorArray.length; i += 1) {
      investorsSnapshot[bidID][investorArray[i]] = true;
      investorSharesSnapshot[bidID][investorArray[i]] = investorSharesArray[i];
      investorArraySnapshot[bidID] = investorArray;
    }
    uint halfOfShares = totalShares.div(2);
    Bid memory bid = Bid(
      bidID,
      smartContractFile,
      0,
      0,
      halfOfShares,
      true
    );
    openBids[bidID] = bid;
  }
  
  /**
   * @dev Approves or rejects a bid, deletes all data relevant to that bid, and adds bid to approvedBids if approved
   * @param bidID unique identifier for a bid, used to query info in 3box
   */
  function closeBid(uint bidID, bool approved) private returns(bool) {
    Bid memory bid = openBids[bidID];
    string memory smartContractFile = bid.smartContractFile;
    
    for(uint i = 0; i < investorArraySnapshot[bidID].length; i += 1) {
      delete investorsSnapshot[bidID][investorArraySnapshot[bidID][i]];      // Deletes investor snapshot value at member
      delete investorSharesSnapshot[bidID][investorArraySnapshot[bidID][i]]; // Deletes investor shares snapshot value at member
      delete bidVoters[bidID][investorArraySnapshot[bidID][i]];              // Deletes voter mapping by member
    }
    
    delete openBids[bidID];
    delete investorArraySnapshot[bidID];
    closedBids[bidID] = true;
    if(approved) {
      approvedBids.push(bidID);
      emit BidApproved(address(this), bidID, smartContractFile, block.timestamp);
    } else {
      emit BidRejected(address(this), bidID, smartContractFile, block.timestamp);
    }
    return(true);
  }
  /**
   * @dev Approves a bid, deletes all data relevant to that bid, and adds bid to approvedBids
   * @param bidID unique identifier for a bid, used to query info in 3box
   * @param approved bool value indicating whether the user approved the bid
   */
  function vote(uint bidID, bool approved)
  public bidExists(bidID) isInvestorInBid(bidID) hasNotVoted(bidID) returns(bool)
  {
    Bid storage bid = openBids[bidID];
    if(approved) {
      bid.votesFor += investorSharesSnapshot[bidID][msg.sender];
      bidVoters[bidID][msg.sender] = true;
      if(bid.votesFor > bid.halfOfShares) {
        closeBid(bidID, true);
        return(true);
        // return(closeBid(bidID, true));
      } else {
        return(false);
      }
    } else {
      bid.votesAgainst += investorSharesSnapshot[bidID][msg.sender];
      bidVoters[bidID][msg.sender] = true;
      if(bid.votesAgainst > bid.halfOfShares) {
        return(closeBid(bidID, false));
      } else {
        return(false);
      }
    }
  }
  
  function getInvestorArraySnapshot(uint bidID) public view returns (address[] memory) {
    return(investorArraySnapshot[bidID]);
  }
  
  function getInvestorsSnapshot(uint bidID, address investor) public view returns (bool) {
    return(investorsSnapshot[bidID][investor]);
  }
  
  function getInvestorSharesSnapshot(uint bidID, address investor) public view returns (uint) {
    return(investorSharesSnapshot[bidID][investor]);
  }
}
