import { queryImsiByIccidFunc, QueryImsiByIccidReq, QueryImsiByIccidRsp} from './queryimsibyiccid';
import { allocMsisdnByImsiFunc, allocMsisdnByImsiReq, allocMsisdnByImsiRsp } from './allocmsisdnbyimsi';
import { createEsimSubscriptionFunc, CreateEsimSubscriptionReq } from './createesimsubscription';
import { releaseMsisdnFunc, ReleaseMsisdnReq } from './releasemsisdn';
import { updateMsisdnFunc, UpdateMsisdnReq } from './updatemsisdn';
import { deleteEsimSubscriptionFunc, DeleteEsimSubscriptionReq } from './deleteesimsubscription';
import { alternateSmdpFqdnFunc, alternateSmdpFqdnReq, alternateSmdpFqdnRsp } from './alternatesmdpfqdn';

class CarrierItServer {
  private _logger: any;

  constructor(logger: any) {
    this._logger = logger;
  }

  queryImsiByIccid(reqObj: QueryImsiByIccidReq, headers: any): Promise<QueryImsiByIccidRsp> {
    return queryImsiByIccidFunc(reqObj, headers, this._logger);
  }

  allocMsisdnByImsi(reqObj: allocMsisdnByImsiReq, headers: any): Promise<allocMsisdnByImsiRsp> {
    return allocMsisdnByImsiFunc(reqObj, headers, this._logger);
  }

  createEsimSubscription(reqObj: CreateEsimSubscriptionReq, headers: any): Promise<number> {
    return createEsimSubscriptionFunc(reqObj, headers, this._logger);
  }

  releaseMsisdn(reqObj: ReleaseMsisdnReq, headers: any): Promise<number> {
    return releaseMsisdnFunc(reqObj, headers, this._logger);
  }

  updateMsisdn(reqObj: UpdateMsisdnReq, headers: any): Promise<number> {
    return updateMsisdnFunc(reqObj, headers, this._logger);
  }

  deleteEsimSubscription(reqObj: DeleteEsimSubscriptionReq, headers: any): Promise<number> {
    return deleteEsimSubscriptionFunc(reqObj, headers, this._logger);
  }

  alternateSmdpFqdn(reqObj: alternateSmdpFqdnReq, headers: any): Promise<alternateSmdpFqdnRsp> {
    return alternateSmdpFqdnFunc(reqObj, headers, this._logger);
  }

};

export { CarrierItServer };

