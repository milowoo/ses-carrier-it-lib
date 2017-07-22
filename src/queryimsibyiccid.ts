import * as _request from 'request';
import { config } from '@ses/common';
import { commonError } from './errormap';

const configFile: string = 'common/itSystemServerConf.json';

interface QueryImsiByIccidReq {
  iccid: string;
}

interface QueryImsiByIccidRsp {
  iccid: string;
  imsi: string;
  msisdn?: string;
}

function validateRsp(rspObj: any): boolean {
  return !('imsi' in rspObj);
}

async function queryImsiByIccidFunc(reqObj: QueryImsiByIccidReq,headers: any,logger: any): Promise<QueryImsiByIccidRsp> {
  let queryImsiByIccidPath = config.get(configFile, 'queryImsiByIccidPath');
  let es2Fqdn = config.get(configFile, 'es2FQDN');
  let url = es2Fqdn + queryImsiByIccidPath + reqObj.iccid;

  let options = {
    url: url,
    method: 'GET',
    'headers': headers
  };

  logger.info('queryImsiByIccid request:\n', options);

  return new Promise<QueryImsiByIccidRsp>((resolve, reject) => {
    _request(options, (err, response, body) => {
      if (err) {
        logger.error('Failed in QueryImsiByIccid request.', err);
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
            logger.info('queryImsiByIccid success');
            return resolve(rspBody);
          }
        }

        logger.info('queryImsiByIccid Failed');

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

export { QueryImsiByIccidReq, QueryImsiByIccidRsp, queryImsiByIccidFunc };
