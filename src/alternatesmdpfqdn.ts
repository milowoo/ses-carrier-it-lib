import * as _request from 'request';
import { config } from '@ses/common';
import { commonError } from './errormap';

const configFile: string = 'common/itSystemServerConf.json';

interface alternateSmdpFqdnReq {
  'primary-msisdn': string;
  'primary-imsi': string;
  eid: string;
};

interface alternateSmdpFqdnRsp {
  alternateEs2SmdpFqdn?: string;
  alternateEs8SmdpFqdn: string;
};


function validateRsp(rspObj: any): boolean {
  return !('alternateEs8SmdpFqdn' in rspObj);
}

async function alternateSmdpFqdnFunc(reqObj: alternateSmdpFqdnReq, headers: any, logger: any): Promise<alternateSmdpFqdnRsp> {
  let alternateSmdpFqdnPath = config.get(configFile, 'alternateSmdpFqdnPath');
  let es2Fqdn = config.get(configFile, 'es2FQDN');
  let url = es2Fqdn + alternateSmdpFqdnPath;

  let options = {
    url: url,
    method: 'GET',
    'headers': headers,
    body: JSON.stringify(reqObj)
  };


  logger.info('alternateSmdpFqdn rquest:\n', options);

  return new Promise<alternateSmdpFqdnRsp>((resolve, reject) => {
    _request(options, (err, response, body) => {
      if (err) {
        logger.error('Failed in alternateSmdpFqdn request.', err);
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
            logger.info('alternateSmdpFqdn success');
            return resolve(rspBody);
          }
        }

        logger.info('alternateSmdpFqdn Failed');

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

export { alternateSmdpFqdnReq, alternateSmdpFqdnRsp, alternateSmdpFqdnFunc };
