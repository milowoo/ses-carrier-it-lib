import * as _request from 'request';
import { config } from '@ses/common';
import { commonError } from './errormap';

const configFile: string = 'common/itSystemServerConf.json';

interface UpdateMsisdnReq {
  msisdn: string;
  'old-imsi': string;
  'new-imsi': string;
}

async function updateMsisdnFunc(reqObj: UpdateMsisdnReq, headers: any, logger: any): Promise<number> {
  let updateMsisdnPath = config.get(configFile, 'updateMsisdnPath');
  let es2Fqdn = config.get(configFile, 'es2FQDN');
  let url = es2Fqdn + updateMsisdnPath ;

  let options = {
    url: url,
    method: 'PUT',
    'headers': headers,
    body: JSON.stringify(reqObj)
  };

  logger.info('UpdateMsisdn request:\n', options);

  return new Promise<number>((resolve, reject) => {
    _request(options, (err, response, body) => {
      if (err) {
        logger.error('Failed in UpdateMsisdn request.', err);
        return reject(err);
      } else {
        if (response.statusCode === 200) {
          logger.info('UpdateMsisdn success');
          return resolve(response.statusCode);
        }

        let rspBody: any = undefined;
        logger.info('UpdateMsisdn failed statusCode', response.statusCode);
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

export { UpdateMsisdnReq, updateMsisdnFunc };
