pragma solidity ^0.5.11;

// import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
// import "./SafeMath.sol";
import "./DomainRegistry.sol";

/**
 * @title DomainDAO - Equity based voting system managed by domain investors
 *
 */

contract DomainDAO {
  using SafeMath for uint;
  mapping(address => bool) public investors;
  mapping(address => uint) internal investorIndex;
  address payable[] public investorArray;
  mapping(address => uint) public investorShares; // Equity is counted as shares, (1 wei = 1 share, taken from msg.value in invest())
  uint[] public investorSharesArray;
  uint public totalShares;
  
  mapping(uint => mapping(address => bool)) investorsSnapshot;      // Investors in domainDAO when bid is initiated, by bidID
  mapping(uint => mapping(address => uint)) investorSharesSnapshot; // Shares that each investor has when bid is initiated, by bidID
  mapping(uint => address payable[]) investorArraySnapshot;                 // Array of investor addresses when bid is initiated, by bidID
  mapping(uint => uint[]) investorSharesArraySnapshot;                 // Array of investor addresses when bid is initiated, by bidID
  mapping(uint => mapping(address => bool)) bidVoters;              // Investors that have voted for a bid
  
  mapping(uint => Bid) openBids;
  mapping(uint => bool) closedBids;
  uint[] public approvedBids;
  
  event BidApproved(address domainAddress, uint bidID, bytes32 info, uint timestamp);
  event BidRejected(address domainAddress, uint bidID, bytes32 info, uint timestamp);

  constructor(address domainRegistryAddress, bytes32 domainHash) public payable {
    DomainRegistry domainRegistry = DomainRegistry(domainRegistryAddress);
    require(!domainRegistry.domainExists(domainHash), 'DomainDAO already exists at this URL');
    require(msg.value > 0, 'Must invest some ETH to deploy a domain DAO');
    totalShares = 0;
    invest();
    domainRegistry.addDomain(domainHash, address(this));
  }
  
  modifier isInvestor() {
    require(investors[msg.sender] == true || investors[tx.origin] == true, 'User must be invested in domain');
    _;
  }
  
  modifier isInvestorInBid(uint bidID) {
    require(
      investorsSnapshot[bidID][msg.sender] == true || investorsSnapshot[bidID][tx.origin] == true,
      'User must be invested when bid was created'
    );
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
    uint bidID;   // MAKE bytes32, will be used for graphQL query on domain space for bid info
    bytes32 info; // Temporarily using JSON to contain info about smart contracts to deploy, will make more robust solution later
    uint votesFor;
    uint votesAgainst;
    uint halfOfShares;
    bool exists;
  }
  
  function getBid(uint bidID) public view returns (uint, bytes32, uint, uint, uint, bool) {
    Bid memory bid = openBids[bidID];
    return(bid.bidID, bid.info, bid.votesFor, bid.votesAgainst, bid.halfOfShares, bid.exists);
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
   * @param info JSON information about a bid
   */
  function createBid(uint bidID, bytes32 info) public isInvestor() bidIsUnique(bidID) {
    for(uint i = 0; i < investorArray.length; i += 1) {
      investorsSnapshot[bidID][investorArray[i]] = true;
      investorSharesSnapshot[bidID][investorArray[i]] = investorSharesArray[i];
      investorArraySnapshot[bidID] = investorArray;
      investorSharesArraySnapshot[bidID] = investorSharesArray;
    }
    uint halfOfShares = totalShares.div(2);
    Bid memory bid = Bid(
      bidID,
      info,
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
    bytes32 info = bid.info;
    
    for(uint i = 0; i < investorArraySnapshot[bidID].length; i += 1) {
      delete investorsSnapshot[bidID][investorArraySnapshot[bidID][i]];      // Deletes investor snapshot value at member
      delete investorSharesSnapshot[bidID][investorArraySnapshot[bidID][i]]; // Deletes investor shares snapshot value at member
      delete bidVoters[bidID][investorArraySnapshot[bidID][i]];              // Deletes voter mapping by member
    }
    
    delete openBids[bidID];
    delete investorArraySnapshot[bidID];
    delete investorSharesArraySnapshot[bidID];
    closedBids[bidID] = true;
    if(approved) {
      approvedBids.push(bidID);
      emit BidApproved(address(this), bidID, info, block.timestamp);
    } else {
      emit BidRejected(address(this), bidID, info, block.timestamp);
    }
    return(true);
  }
  
  /**
   * @dev Approves a bid, deletes all data relevant to that bid, and adds bid to approvedBids
   * @param bidID unique identifier for a bid, used to query info in 3box
   * @param approved bool value indicating whether the user approved the bid
   */
  function vote(uint bidID, bool approved, bool externalCall)
  public bidExists(bidID) isInvestorInBid(bidID) hasNotVoted(bidID) returns(uint)
  {
    Bid storage bid = openBids[bidID];
    address voter; // Since some calls are coming froom smart contracts, we must use tx.origin instead
    if(externalCall) {
        voter = tx.origin;
    } else {
        voter = msg.sender;
    }
    if(approved) {
      bid.votesFor += investorSharesSnapshot[bidID][voter];
      bidVoters[bidID][voter] = true;
      if(bid.votesFor > bid.halfOfShares) {
        closeBid(bidID, true);
        return(1); // Approved
      } else {
        return(3); // Not approved
      }
    } else {
      bid.votesAgainst += investorSharesSnapshot[bidID][voter];
      bidVoters[bidID][voter] = true;
      if(bid.votesAgainst > bid.halfOfShares) {
        closeBid(bidID, false);
        return(2); // Rejected
      } else {
        return(3); // Not rejected
      }
    }
  }
  
  function getInvestorArraySnapshot(uint bidID) public view returns (address payable[] memory) {
    return(investorArraySnapshot[bidID]);
  }
  
  function getInvestorSharesArraySnapshot(uint bidID) public view returns (uint[] memory) {
    return(investorSharesArraySnapshot[bidID]);
  }
  
  function getInvestorsSnapshot(uint bidID, address investor) public view returns (bool) {
    return(investorsSnapshot[bidID][investor]);
  }
  
  function getInvestorSharesSnapshot(uint bidID, address investor) public view returns (uint) {
    return(investorSharesSnapshot[bidID][investor]);
  }
  
  function isInvestorCheck(address investor) public view returns (bool) {
    return(investors[investor]);
  }
}
