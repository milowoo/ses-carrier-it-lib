import * as nock from 'nock';
import { expect } from 'chai';

import { applog } from './loginit';
import { CarrierItServer } from '../src/itserver';



function carrierItServer(): nock.Scope {
  return nock('http://localhost:13240');
};

const logger = applog.logger('test-allocmsisdnbyimsi');
const itFuncs = new CarrierItServer(logger);

describe('allocmsisdnbyimsi test', () => {
  let itServer = carrierItServer();

  let headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-transaction-id': 'shsk2lfhsdf',
    'X-Admin-Protocol': 'gsma/rsp/v2.0.0'
  };

  let req = {
    imsi: 'testImis'
  };

  before(async () => {

  });

  afterEach(() => {
    nock.cleanAll();
    itServer.isDone();
  });

  it('can allocmsisdnbyimsi', async () => {
    itServer.post('/esintegration/v1.0/esim/activatemsisdn')
      .reply(200, {
        msisdn: 'testMsisdn'
      });

    await itFuncs.allocMsisdnByImsi(req, headers).then((rsp: any) => {
      expect(rsp.msisdn).to.equals('testMsisdn');
    }).catch((err: any) => {
      // error handler for not 200 response.
      logger.debug('statuscode ', err.statusCode);
      logger.debug('errcode ', err.errorCode);
      logger.debug('message ', err.message);
    });
  });

  it('can allocmsisdnbyimsi err case', async () => {
    itServer.post('/esintegration/v1.0/esim/activatemsisdn')
      .reply(500, {
        errorCode: 'INVALDE_RESPONSE',
        'error_description': 'ERR MESSAGE'
      });

    await itFuncs.allocMsisdnByImsi(req, headers).then((rsp: any) => {
      // handler for 200 response.
      logger.debug('statuscode ', rsp.statusCode);
    }).catch((err: any) => {
      logger.debug('statuscode ', err.statusCode);
      logger.debug('errcode ', err.errorCode);
      logger.debug('message ', err.message);
    });
  });
});



