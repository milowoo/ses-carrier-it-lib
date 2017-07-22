import * as nock from 'nock';

import { applog } from './loginit';
import { CarrierItServer } from '../src/itserver';

const logger = applog.logger('test-createesimsubscription');

function carrierItServer(): nock.Scope {
  return nock('http://localhost:13240');
};

const itFuncs = new CarrierItServer(logger);

describe('createesimsubscription test', () => {
  let itServer = carrierItServer();
  let headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-transaction-id': 'shsk2lfhsdf',
    'X-Admin-Protocol': 'gsma/rsp/v2.0.0'
  };

  let req = {
    'primary-msisdn': '142581074409',
    'primary-imsi': '312009876543210',
    'secondary-msisdn': '142581074410',
    'secondary-imsi': '312009876543211',
    'selected-plan-id': 'XXBUF101',
    'iccid': '89860101800123456789'
  };

  before(async () => {
  });

  afterEach(() => {
    nock.cleanAll();
    itServer.isDone();
  });

  it('createesimsubscription profile', async () => {
    itServer.post('/esintegration/v1.0/esim/bss/createEsimSubscription')
      .reply(200);

    await itFuncs.createEsimSubscription(req, headers).then((statusCode: number) => {
      // handler for 200 response.
      logger.debug('statuscode ', statusCode);
    }).catch((err: any) => {
      // error handler for not 200 response.
      logger.debug('statuscode ', err.statusCode);
      logger.debug('errcode ', err.errorCode);
      logger.debug('message ', err.message);
    });
  });

  it('createesimsubscription profile err case', async () => {
    itServer.post('/esintegration/v1.0/esim/bss/createEsimSubscription')
      .reply(500, {
        errorCode: 'INVALDE_RESPONSE',
        'error_description': 'ERR MESSAGE'
      });

    await itFuncs.createEsimSubscription(req, headers).then((statusCode: number) => {
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



