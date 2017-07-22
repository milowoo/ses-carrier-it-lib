import * as nock from 'nock';
import { expect } from 'chai';

import { applog } from './loginit';
import { CarrierItServer } from '../src/itserver';


function itSystemServer(): nock.Scope {
  return nock('http://localhost:13240');
}

const logger = applog.logger('test-queryimsibyiccid');

const itFuncs = new CarrierItServer(logger);

describe('queryimsibyiccid test', () => {
  let itServer = itSystemServer();
  let req = {
    iccid: 'testIccid'
  };

  let headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-transaction-id': 'shsk2lfhsdf',
    'X-Admin-Protocol': 'gsma/rsp/v2.0.0'
  };

  before(async () => {

  });

  afterEach(() => {
    nock.cleanAll();
    itServer.isDone();
  });

  it('can perform queryimsibyiccid', async () => {
    itServer.get('/esintegration/v1.0/esim/imsi?iccid=testIccid')
      .reply(200, {
        imsi: 'testImsi',
        msisdn: 'testMsisdn',
        iccid: 'testIccid'
      });

    await itFuncs.queryImsiByIccid(req, headers).then((rsp: any) => {
      // handler for 200 response.
      expect(rsp.imsi).to.equals('testImsi');
      expect(rsp.msisdn).to.equals('testMsisdn');
      expect(rsp.iccid).to.equals('testIccid');
    }).catch((err: any) => {
      // error handler for not 200 response.
      logger.debug('statuscode ', err.statusCode);
      logger.debug('errcode ', err.errorCode);
      logger.debug('message ', err.message);
    });
  });

  it('can perform queryimsibyiccid err case', async () => {
    itServer.get('/esintegration/v1.0/esim/imsi?iccid=testIccid')
      .reply(400, {
        errorCode: 'INVALDE_RESPONSE',
        'error_description': 'ERR MESSAGE'
      });

    await itFuncs.queryImsiByIccid(req, headers).then((rsp: any) => {
      // handler for 200 response.
    }).catch((err: any) => {
      // error handler for not 200 response.
      logger.debug('statuscode ', err.statusCode);
      logger.debug('errcode ', err.errorCode);
      logger.debug('message ', err.message);
    });
  });

});



