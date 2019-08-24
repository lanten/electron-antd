// const { utf8ToHex } = require('dapp-utils');
const { expect, assert } = require('chai');
const { BN } = require('openzeppelin-test-helpers');
const DomainDAO = artifacts.require('DomainDAO');
const DomainRegistry = artifacts.require('DomainRegistry');
const Web3 = require('web3');

contract('DomainDAO', (accounts) => {
  beforeEach(async() => {
	domainRegistry = await DomainRegistry.new();
	domainRegistryAddress = domainRegistry.address;
	domainHash = Web3.utils.toHex('https://ethberlinzwei.com/');
  });

  describe('Investing/Deploying', function () {
    it('Should not be able to deploy without investing', async () => {     
      try {
        await DomainDAO.new(domainRegistryAddress, domainHash, {value: 0});
        assert.isTrue(false);
      } catch (err) {
        expect(err.message).to.include("Must invest some ETH to deploy a domain DAO");
      }
    });
  
    it('Should be able to deploy if investing', async () => {
      const domain = await DomainDAO.new(domainRegistryAddress, domainHash, {value: 1});
      expect(domain.address.length).to.be.equal(42);
		});
		
		it('Should be able to deploy two domains with the same URL', async () => {
      const domain = await DomainDAO.new(domainRegistryAddress, domainHash, {value: 1});
      try {
				await DomainDAO.new(domainRegistryAddress, domainHash, {value: 1});
			} catch (err) {
				expect(err.message).to.include("DomainDAO already exists at this URL");
			}
    });


    it('Should get 100% equity if deploying', async () => {
			const domain = await DomainDAO.new(domainRegistryAddress, domainHash, {value: 1});
			const equityInfo = await domain.getInvestorEquity(accounts[0]);
			const shares = equityInfo[0];
			const totalShares = equityInfo[1];
			expect(shares/totalShares).to.be.equal(1);
    });

    it('Should not be able to invest if msg.value <= 0', async () => {
			const domain = await DomainDAO.new(domainRegistryAddress, domainHash, {value: 1});
      try {
        await domain.invest({value: 0});
        assert.isTrue(false);
      } catch (err) {
        expect(err.message).to.include("Must invest some ETH become a domainDAO investor");
      }
		});
		
		it('Should be able to invest if msg.value > 0', async () => {
			const domain = await DomainDAO.new(domainRegistryAddress, domainHash, {value: 1});
      await domain.invest({value: 1});
    });

    it('Should add equity if investing and subtract from others', async () => {
			const domain = await DomainDAO.new(domainRegistryAddress, domainHash, {from: accounts[0], value: 1});
			const firstUserInitialEquityInfo = await domain.getInvestorEquity(accounts[0]);
			const firstUserInitialEquity = firstUserInitialEquityInfo[0]/firstUserInitialEquityInfo[1];
			await domain.invest({from: accounts[1], value: 1});
			const secondUserEquityInfo = await domain.getInvestorEquity(accounts[1]);
			const secondUserEquity = secondUserEquityInfo[0]/secondUserEquityInfo[1];
			const firstUserSecondEquityInfo = await domain.getInvestorEquity(accounts[0]);
			const firstUserSecondEquity = firstUserSecondEquityInfo[0]/firstUserSecondEquityInfo[1];
			expect(firstUserSecondEquity/firstUserInitialEquity).to.be.equal(0.5); // Dropped 50%
			expect(secondUserEquity).to.be.equal(0.5);
    });
  });

  describe('Creating Bids', function () {
		const bidID = 123;
		const info = Web3.utils.toHex('JSON Stringified Object');

    it('Should not be able to create a bid if not invested in domain', async () => {     
			domain = await DomainDAO.new(domainRegistryAddress, domainHash, {from: accounts[0], value: 1});
      try {
        await domain.createBid(bidID, info, {from: accounts[1]});
        assert.isTrue(false);
      } catch (err) {
        expect(err.message).to.include("User must be invested in domain");
      }
    });
  
    it('Should be able to create a bid if invested in domain', async () => {
			domain = await DomainDAO.new(domainRegistryAddress, domainHash, {from: accounts[0], value: 1});
			await domain.createBid(bidID, info, {from: accounts[0]});
			const bid = await domain.getBid(bidID);
			expect(bid[0]).to.be.bignumber.that.equals(new BN(123));
			expect(expect(web3.utils.hexToAscii(bid[1]).replace(/\0/g, '')).to.be.equal('JSON Stringified Object'));
			expect(bid[2]).to.be.bignumber.that.equals(new BN(0));
			expect(bid[3]).to.be.bignumber.that.equals(new BN(0));
			assert(bid[4]);
    });

    it('Bid should contain snapshot equity and investor info', async () => {
			domain = await DomainDAO.new(domainRegistryAddress, domainHash, {from: accounts[0], value: 1});
			await domain.createBid(bidID, info, {from: accounts[0]});
			const investorArraySnapShot = await domain.getInvestorArraySnapshot(bidID);
			assert.equal(investorArraySnapShot.length, 1, "Investor array wrong length");
			const investorsSnapShotAcct1 = await domain.getInvestorsSnapshot(bidID, accounts[0]);
			assert(investorsSnapShotAcct1, "Investor mapping snapshot wrong");
			const investorSharesSnapshot = await domain.getInvestorSharesSnapshot(bidID, accounts[0]);
			expect(investorSharesSnapshot).to.be.bignumber.that.equals(new BN(1));
			await domain.invest({value: "1", from: accounts[0]});
			await domain.invest({value: "1", from: accounts[1]});
			const investorsSnapShotAcct2 = await domain.getInvestorsSnapshot(bidID, accounts[1]);
			assert.isFalse(investorsSnapShotAcct2, "Investor 2 added to array");
			const investorSharesSnapshot2 = await domain.getInvestorSharesSnapshot(bidID, accounts[0]);
			expect(investorSharesSnapshot2).to.be.bignumber.that.equals(new BN(1));
    });
  });

  describe('Voting on Bids', function () {
    it('Should not be able to vote on bids if not an investor', async () => {  
			const bidID = 123;
			const info = Web3.utils.toHex('JSON Stringified Object');
			domain = await DomainDAO.new(domainRegistryAddress, domainHash, {from: accounts[0], value: 1});
			await domain.invest({from: accounts[1], value: 1});   
			await domain.createBid(bidID, info, {from: accounts[0]});
      try {
        await domain.vote(bidID, true, false, { from: accounts[2] });
        assert.isTrue(false);
      } catch (err) {
				expect(err.message).to.include("User must be invested when bid was created")
      }
    });

    it('Should not be able to vote on bids if invested AFTER bid was created', async () => { 
			const bidID = 123;
			const info = Web3.utils.toHex('JSON Stringified Object');
			domain = await DomainDAO.new(domainRegistryAddress, domainHash, {from: accounts[0], value: 1});
			await domain.invest({from: accounts[1], value: 1});
			await domain.createBid(bidID, info, {from: accounts[0]});
			await domain.invest({from: accounts[2], value: 1});
        try {
          await domain.vote(bidID, true, false, { from: accounts[2] });
          assert.isTrue(false);
        } catch (err) {
          expect(err.message).to.include("User must be invested when bid was created")
        }
      });
  
    it('Should be able to vote on bids if invested BEFORE bid was created', async () => {
			const bidID = 123;
			const info = Web3.utils.toHex('JSON Stringified Object');
			domain = await DomainDAO.new(domainRegistryAddress, domainHash, {from: accounts[0], value: 1});
			await domain.invest({from: accounts[1], value: 1});
			await domain.createBid(bidID, info, {from: accounts[0]});  
			await domain.invest({from: accounts[2], value: 1});
      await domain.vote(bidID, true, false, { from: accounts[1] });
    });

    it('Should not be able to vote twice', async () => {
			const bidID = 123;
			const info = Web3.utils.toHex('JSON Stringified Object');
			domain = await DomainDAO.new(domainRegistryAddress, domainHash, {from: accounts[0], value: 1});
			await domain.invest({from: accounts[1], value: 1}); 
			await domain.createBid(bidID, info, {from: accounts[0]}); 
			await domain.invest({from: accounts[2], value: 1});
			await domain.vote(bidID, true, false, { from: accounts[1] });
			try {
        await domain.vote(bidID, true, false, { from: accounts[1] });
        assert.isTrue(false);
      } catch (err) {
				expect(err.message).to.include('User has already voted on this bid');
      }
    });

    it('Should be able to approve a bid if votesFor is above 50% and emit an event and add to approvedBids', async () => {
			const bidID = 123;
			const info = Web3.utils.toHex('JSON Stringified Object');
			domain = await DomainDAO.new(domainRegistryAddress, domainHash, {from: accounts[0], value: 1});
			await domain.invest({from: accounts[1], value: 1});
			await domain.invest({from: accounts[2], value: 1});
			await domain.createBid(bidID, info, {from: accounts[0]});  
			await domain.vote(bidID, true, false, { from: accounts[0] });
			let receipt = await domain.vote(bidID, true, false, { from: accounts[1] });

			const logs = receipt.logs && receipt.logs.length ? receipt.logs : [];
      const event = logs.filter(log => log.event === 'BidApproved');
      if (!logs.length || !event.length) {
        assert.fail('BidApproved Event not emitted');
      }
			const eventArgs = event[0].args;
			expect(eventArgs.domainAddress.length).to.be.equal(42);
			expect(eventArgs.bidID).to.be.bignumber.that.equals(new BN(123));
			expect(web3.utils.hexToAscii(eventArgs.info).replace(/\0/g, '')).to.be.equal('JSON Stringified Object');
    });

    it('Should be able to reject a bid if votesAgainst is above 50% and emit an event', async () => {
			const bidID = 123;
			const info = Web3.utils.toHex('JSON Stringified Object');
			domain = await DomainDAO.new(domainRegistryAddress, domainHash, {from: accounts[0], value: 1});
			await domain.invest({from: accounts[1], value: 1});
			await domain.invest({from: accounts[2], value: 1});
			await domain.createBid(bidID, info, {from: accounts[0]});  
			await domain.vote(bidID, false, false, { from: accounts[0] });
			let receipt = await domain.vote(bidID, false, false, { from: accounts[1] });

			const logs = receipt.logs && receipt.logs.length ? receipt.logs : [];
      const event = logs.filter(log => log.event === 'BidRejected');
      if (!logs.length || !event.length) {
        assert.fail('BidRejected Event not emitted');
      }
			const eventArgs = event[0].args;
			expect(eventArgs.domainAddress.length).to.be.equal(42);
			expect(eventArgs.bidID).to.be.bignumber.that.equals(new BN(123));
			expect(web3.utils.hexToAscii(eventArgs.info).replace(/\0/g, '')).to.be.equal('JSON Stringified Object');
		});
		
		it('Should have weighted voting', async () => {
			const bidID = 123;
			const info = Web3.utils.toHex('JSON Stringified Object');
			domain = await DomainDAO.new(domainRegistryAddress, domainHash, {from: accounts[0], value: 1});
			await domain.invest({from: accounts[1], value: 1});
			await domain.invest({from: accounts[2], value: 1});
			await domain.invest({from: accounts[3], value: 5});
			await domain.createBid(bidID, info, {from: accounts[0]});  
			let receipt = await domain.vote(bidID, false, false, { from: accounts[3] });
			const logs = receipt.logs && receipt.logs.length ? receipt.logs : [];
      const event = logs.filter(log => log.event === 'BidApproved');
      assert(logs.length || event.length);
    });
  });

  describe('Closed Bids', function () {
    it('Should delete all snapshot equity and investor info related to a bid', async () => {     
			const bidID = 123;
			const info = Web3.utils.toHex('JSON Stringified Object');
			domain = await DomainDAO.new(domainRegistryAddress, domainHash, {from: accounts[0], value: 1});
			await domain.invest({from: accounts[1], value: 1});   
			await domain.createBid(bidID, info, {from: accounts[0]});

			const investorArraySnapShot = await domain.getInvestorArraySnapshot(bidID);
			const investorsSnapShot = await domain.getInvestorsSnapshot(bidID, accounts[0]);
			const investorSharesSnapshot = await domain.getInvestorSharesSnapshot(bidID, accounts[0]);
			assert.equal(investorArraySnapShot.length, 2, "Investor array wrong length");
			assert.isTrue(investorsSnapShot);
			expect(investorSharesSnapshot).to.be.bignumber.that.equals(new BN(1));

			await domain.vote(bidID, true, false, { from: accounts[0] });
			await domain.vote(bidID, true, false, { from: accounts[1] });

			const investorArraySnapShot2 = await domain.getInvestorArraySnapshot(bidID);		
			const investorsSnapShot2 = await domain.getInvestorsSnapshot(bidID, accounts[0]);
			const investorSharesSnapshot2 = await domain.getInvestorSharesSnapshot(bidID, accounts[0]);
			assert.equal(investorArraySnapShot2.length, 0, 'Investor array not deleted')
			assert.isFalse(investorsSnapShot2);
			expect(investorSharesSnapshot2).to.be.bignumber.that.equals(new BN(0));
    });
  
    it('Should delete bid from openBids', async () => {
			const bidID = 123;
			const info = Web3.utils.toHex('JSON Stringified Object');
			domain = await DomainDAO.new(domainRegistryAddress, domainHash, {from: accounts[0], value: 1});
			await domain.invest({from: accounts[1], value: 1});   
			await domain.createBid(bidID, info, {from: accounts[0]});
			await domain.vote(bidID, true, false, { from: accounts[0] });
			await domain.vote(bidID, true, false, { from: accounts[1] });
			const bid = await domain.getBid(bidID);
			expect(bid[0]).to.be.bignumber.that.equals(new BN(0));
			expect(web3.utils.hexToAscii(bid[1]).replace(/\0/g, '')).to.be.equal('');
			expect(bid[2]).to.be.bignumber.that.equals(new BN(0));
			expect(bid[3]).to.be.bignumber.that.equals(new BN(0));
			expect(bid[4]).to.be.bignumber.that.equals(new BN(0));
			assert.isFalse(bid[5]);
    });

    it('Should not be able to create a bid with the same ID as a bid that has been closed', async () => {
			const bidID = 123;
			const info = Web3.utils.toHex('JSON Stringified Object');
			domain = await DomainDAO.new(domainRegistryAddress, domainHash, {from: accounts[0], value: 1});
			await domain.invest({from: accounts[1], value: 1});   
			await domain.createBid(bidID, info, {from: accounts[0]});
			await domain.vote(bidID, true, false, { from: accounts[0] });
			await domain.vote(bidID, true, false, { from: accounts[1] });
			try {
				await domain.createBid(bidID, info, {from: accounts[0]});
			} catch (err) {
				expect(err.message).to.include("Bid with this ID exists and has been closed");
			}
    });
  });
});