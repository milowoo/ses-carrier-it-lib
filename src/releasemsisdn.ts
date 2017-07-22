import * as _request from 'request';
import { config } from '@common';
import { commonError } from './errormap';

const configFile: string = 'common/itSystemServerConf.json';

interface ReleaseMsisdnReq {
  imsi: string;
  msisdn: string;
}

async function releaseMsisdnFunc(reqObj: ReleaseMsisdnReq, headers: any, logger: any): Promise<number> {
  let releaseMsisdnPath = config.get(configFile, 'releaseMsisdnPath');
  let es2Fqdn = config.get(configFile, 'es2FQDN');
  let url = es2Fqdn + releaseMsisdnPath + '?imsi=' + reqObj.imsi + '&msisdn=' + reqObj.msisdn;

  let options = {
    url: url,
    method: 'DELETE',
    'headers': headers
  };

  logger.info('ReleaseMsisdn request:\n', options);

  return new Promise<number>((resolve, reject) => {
    _request(options, (err, response, body) => {
      if (err) {
        logger.error('Failed in ReleaseMsisdn request.', err);
        return reject(err);
      } else {
        if (response.statusCode === 200) {
          logger.info('ReleaseMsisdn success');
          return resolve(response.statusCode);
        }

        let rspBody: any = undefined;
        logger.info('ReleaseMsisdn failed statusCode', response.statusCode);
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

export { ReleaseMsisdnReq, releaseMsisdnFunc };
