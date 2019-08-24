
// will deploy contracts & save name, domain associated & address in db.
export const DomainDao = require('../../../build/contracts/DomainDao');
export const AdvertisingDAO = require('../../../build/contracts/AdvertisingDAO');
export const DomainRegistry = require('../../../build/contracts/DomainRegistry');
export const Escrow = require('../../../build/contracts/Escrow');
export const PaymentSplitter = require('../../../build/contracts/PaymentSplitter');
export const Secondary = require('../../../build/contracts/Secondary');

export const contracts = {
  domainRegistry: DomainRegistry,
  domain: DomainDao,
  advertising: AdvertisingDAO,
  escrow: Escrow,
  paymentSplitter: PaymentSplitter,
  secondary: Secondary
};
