import * as nock from 'nock';
import { expect } from 'chai';

import { applog } from './loginit';
import { CarrierItServer } from '../src/itserver';


function itSystemServer(): nock.Scope {
  return nock('http://localhost:13240');
}

const logger = applog.logger('test-alternateSmdpFqdn');

const itFuncs = new CarrierItServer(logger);

describe('alternateSmdpFqdn test', () => {
  let itServer = itSystemServer();
  let req = {
    'primary-msisdn':'142581074409',
    'primary-imsi':'312009876543210',
    eid:'3EDFEFXDFE9583832233232'
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

  it('can perform alternateSmdpFqdn', async () => {
    itServer.get('/esintegration/v1.0/esim/alternateSmdpFqdn')
      .reply(200, {
        alternateEs2SmdpFqdn: 'test_alternateEs2SmdpFqdn',
        alternateEs8SmdpFqdn: 'test_alternateEs8SmdpFqdn'
      });

    await itFuncs.alternateSmdpFqdn(req, headers).then((rsp: any) => {
      // handler for 200 response.
      expect(rsp.alternateEs2SmdpFqdn).to.equals('test_alternateEs2SmdpFqdn');
      expect(rsp.alternateEs8SmdpFqdn).to.equals('test_alternateEs8SmdpFqdn');
    }).catch((err: any) => {
      // error handler for not 200 response.
      logger.debug('statuscode ', err.statusCode);
      logger.debug('errcode ', err.errorCode);
      logger.debug('message ', err.message);
    });
  });

  it('can perform alternateSmdpFqdn err case', async () => {
    itServer.get('/esintegration/v1.0/esim/alternateSmdpFqdn')
      .reply(400, {
        errorCode: 'INVALDE_RESPONSE',
        'error_description': 'ERR MESSAGE'
      });

    await itFuncs.alternateSmdpFqdn(req, headers).then((rsp: any) => {
      // handler for 200 response.
    }).catch((err: any) => {
      // error handler for not 200 response.
      logger.debug('statuscode ', err.statusCode);
      logger.debug('errcode ', err.errorCode);
      logger.debug('message ', err.message);
    });
  });

});



