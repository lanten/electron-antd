
// will deploy contracts & save name, domain associated & address in db.
export const DomainDAO = require('../../../build/contracts/DomainDAO');
export const AdvertisingDAO = require('../../../build/contracts/AdvertisingDAO');
export const DomainRegistry = require('../../../build/contracts/DomainRegistry');
export const Escrow = require('../../../build/contracts/Escrow');
export const PaymentSplitter = require('../../../build/contracts/PaymentSplitter');
export const Secondary = require('../../../build/contracts/Secondary');

export const contracts = {
  domainRegistry: DomainRegistry,
  domainDAO: DomainDAO,
  advertisingDAO: AdvertisingDAO,
  escrow: Escrow,
  paymentSplitter: PaymentSplitter,
  secondary: Secondary
};
