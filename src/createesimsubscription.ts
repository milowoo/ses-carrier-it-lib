import * as _request from 'request';
import { config } from '@ses/common';
import { commonError } from './errormap';

const configFile: string = 'common/itSystemServerConf.json';

interface CreateEsimSubscriptionReq {
  'primary-msisdn': string;
  'primary-imsi': string;
  'secondary-msisdn': string;
  'secondary-imsi': string;
  'selected-plan-id'?: string;
  'iccid': string;
}

async function createEsimSubscriptionFunc(reqObj: CreateEsimSubscriptionReq, headers: any, logger: any): Promise<number> {
  let createEsimSubscriptionPath =  config.get(configFile, 'createEsimSubscriptionPath');
  let es2Fqdn = config.get(configFile, 'es2FQDN');
  let url = es2Fqdn + createEsimSubscriptionPath;

  let options = {
    url: url,
    method: 'POST',
    'headers': headers,
    body: JSON.stringify(reqObj)
  };


  logger.info('createEsimSubscription request:\n', options);

  return new Promise<number>((resolve, reject) => {
    _request(options, (err, response, body) => {
      if (err) {
        logger.error('Failed in createEsimSubscription request.', err);
        return reject(err);
      } else {
        if (response.statusCode === 200) {
          logger.info('createEsimSubscription success');
          return resolve(response.statusCode);
        }

        let rspBody: any = undefined;
        logger.info('createEsimSubscription failed statusCode', response.statusCode);
        logger.debug('response: ' + body);

        const error: commonError = new commonError('INVALID_RESPONSE');
        if (body) {
          try {
            rspBody = JSON.parse(body);
          } catch (err) {
            logger.error(response.statusCode, error.errorCode, error.message);
            return reject(error);
          }
        } else {
          logger.error(response.statusCode, error.errorCode, error.message);
          return reject(error);
        }

        let errresp = {
          statusCode: response.statusCode,
          errorCode: rspBody.errorCode,
          message: rspBody['error_description']
        };
        return reject(errresp);
      }
    });
  });
}

export { CreateEsimSubscriptionReq, createEsimSubscriptionFunc };
