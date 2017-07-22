import * as nock from 'nock';

import { applog } from './loginit';
import { CarrierItServer } from '../src/itserver';


function itSystemServer(): nock.Scope {
  return nock('http://localhost:13240');
}

const logger = applog.logger('test-releasemsisdn');

const itFuncs = new CarrierItServer(logger);

describe('releasemsisdn test', () => {
  let itServer = itSystemServer();
  let req = {
    imsi: 'testimsi',
    msisdn: 'testmsisdn'
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

  it('can perform releasemsisdn', async () => {
    itServer.delete('/esintegration/v1.0/esim/msisdn?imsi=testimsi&msisdn=testmsisdn')
      .reply(200);

    await itFuncs.releaseMsisdn(req, headers).then((statusCode: number) => {
      // handler for 200 response.
      logger.debug('statuscode ', statusCode);
    }).catch((err: any) => {
      // error handler for not 200 response.
      logger.debug('statuscode ', err.statusCode);
      logger.debug('errcode ', err.errorCode);
      logger.debug('message ', err.message);
    });
  });

  it('can perform releasemsisdn err case', async () => {
    itServer.delete('/esintegration/v1.0/esim/msisdn?imsi=testimsi&msisdn=testmsisdn')
      .reply(400, {
        errorCode: 'INVALDE_RESPONSE',
        'error_description': 'ERR MESSAGE'
      });

    await itFuncs.releaseMsisdn(req, headers).then((statusCode: number) => {
      // handler for 200 response.
      logger.debug('statuscode ', statusCode);
    }).catch((err: any) => {
      // error handler for not 200 response.
      logger.debug('statuscode ', err.statusCode);
      logger.debug('errcode ', err.errorCode);
      logger.debug('message ', err.message);
    });
  });
});



