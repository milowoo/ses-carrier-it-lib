import * as _request from 'request';
import { config } from '@common';
import { commonError } from './errormap';

const configFile: string = 'common/itSystemServerConf.json';

interface allocMsisdnByImsiReq {
  imsi: string;
};

interface allocMsisdnByImsiRsp {
  msisdn: string;
};


function validateRsp(rspObj: any): boolean {
  return !('msisdn' in rspObj);
}

async function allocMsisdnByImsiFunc(reqObj: allocMsisdnByImsiReq, headers: any, logger: any): Promise<allocMsisdnByImsiRsp> {
  let allocImsiByImsiPath = config.get(configFile, 'allocMsisdnByImsiPath');
  let es2Fqdn = config.get(configFile, 'es2FQDN');
  let url = es2Fqdn + allocImsiByImsiPath;

  let options = {
    url: url,
    method: 'POST',
    'headers': headers,
    body: JSON.stringify(reqObj)
  };


  logger.info('allocMsisdnByImsi rquest:\n', options);

  return new Promise<allocMsisdnByImsiRsp>((resolve, reject) => {
    _request(options, (err, response, body) => {
      if (err) {
        logger.error('Failed in allocMsisdnByImsi request.', err);
        return reject(err);
      } else {
        let rspBody: any = undefined;
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

        if (response.statusCode === 200) {
          if (validateRsp(rspBody)) {
            logger.debug('response:\n', rspBody);
            logger.error(response.statusCode, error.errorCode, error.message);
            return reject(error);
          } else {
            logger.info('allocMsisdnByImsi success');
            return resolve(rspBody);
          }
        }

        logger.info('allocMsisdnByImsi Failed');

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

export { allocMsisdnByImsiReq, allocMsisdnByImsiRsp, allocMsisdnByImsiFunc };
