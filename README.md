# SES Common Utilities Library

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Install](#install)
- [API](#api)
  - [CarrierItServer](#carrieritserver)
    - [allocMsisdnByImsi](#allocmsisdnbyimsi)
    - [createEsimSubsccription](#createesimsubscription)
    - [queryImsiByIccid](#queryimsibyiccid)
    - [releaseMsisdn](#releasemisdn)
    - [updateMsisdn](#updatemsisdn)
    - [deleteEsimSubscription](#deleteesimsubscription)
    - [alternateSmdpFqdn](#alternatesmdpfqdn)
    - [Usage](#usage)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install

```
npm install @ses/carrieritlib
```

## API

### CarrierItServer

CarrierItServer includes property:

And methods:
- allocMsisdnByImsi(reqObj: allocMsisdnByImsiReq, headers: any): Promise <allocMsisdnByImsiRsp>
- createEsimSubsccription(reqObj: CreateEsimSubscriptionReq, headers: any): Promise<number>
- queryImsiByIccid(reqObj: QueryImsiByIccidReq, headers: any): Promise <QueryImsiByIccidRsp>
- releaseMsisdn(reqObj: ReleaseMsisdnReq, headers: any): Promise<number>
- updateMsisdn(reqObj: UpdateMsisdnReq, headers: any): Promise<number>
- deleteEsimSubscription(reqObj: DeleteEsimSubscriptionReq, headers: any): Promise<number>
- alternateSmdpFqdn(reqObj: alternateSmdpFqdnReq, headers: any): Promise<alternateSmdpFqdnRsp>

```typescript
const carrierItServer = new CarrierItServer(logger: any);
```

When the response from CARRIER IT server is not 200, it will return ErrorDescription.

```typescript
interface ErrorDescription {
  errorCode: string;
  message: string;
}
```

#### allocMsisdnByImsi

```typescript
interface allocMsisdnByImsiReq {
  imsi: string;
};

interface allocMsisdnByImsiRsp {
  msisdn: string;
};
```

#### createEsimSubsccription

```typescript
interface CreateEsimSubscriptionReq {
  'primary-msisdn': string;
  'primary-imsi': string;
  'secondary-msisdn': string;
  'secondary-imsi': string;
  'selected-plan-id'?: string;
  'iccid': string;
}
```

#### queryImsiByIccid

```typescript
interface QueryImsiByIccidReq {
  iccid: string;
}

interface QueryImsiByIccidRsp {
  iccid: string;
  imsi: string;
  msisdn?: string;
}
```

#### releaseMsisdn

```typescript
interface ReleaseMsisdnReq {
  imsi: string;
  msisdn: string;
}

```
#### updateMsisdn

```typescript
interface UpdateMsisdnReq {
  msisdn: string;
  'old-imsi': string;
  'new-imsi': string;
}

```

#### deleteEsimSubscription

```typescript
interface DeleteEsimSubscriptionReq {
  'primary-msisdn': string;
  'primary-imsi': string;
  'secondary-msisdn': string;
  'secondary-imsi': string;
  'selected-plan-id': string;
}

```

#### alternateSmdpFqdn

```typescript
interface alternateSmdpFqdnReq {
  'primary-msisdn': string;
  'primary-imsi': string;
  eid: string;
};

interface alternateSmdpFqdnRsp {
  alternateEs2SmdpFqdn?: string;
  alternateEs8SmdpFqdn: string;
};

```


#### Usage

Example:

```js


import {CarrierItServer} from '@ses/carrieritlib';

const logger = applog.logger('carry_it_lib_test');
const carrierServer = new CarrierItServer(logger);

let headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-transaction-id': 'shsk2lfhsdf',
    'X-Admin-Protocol': 'gsma/rsp/v2.0.0'
};


await carrierServer.allocMsisdnByImsi(allocMsisdnByImsiReq, headers).then((rsp: any) => {
  // handler for 200 response.
  logger.debug('msisdn ', rsp.msisdn);
}).catch((err: any) => {
  // error handler for not 200 response.
  logger.debug('statuscode ', err.statusCode);
  logger.debug('errcode ', err.errorCode);
  logger.debug('message ', err.message);
});

```

await carrierServer.createEsimSubscription(CreateEsimSubscriptionReq, headers).then((rsp: number) => {
  // handler for 200 response.
}).catch((err: any) => {
  // error handler for not 200 response.
  logger.debug('statuscode ', err.statusCode);
  logger.debug('errcode ', err.errorCode);
  logger.debug('message ', err.message);
});

```

await carrierServer.queryImsiByIccid(QueryImsiByIccidReq, headers).then((rsp: any) => {
  // handler for 200 response.
  logger.debug('imsi ', rsp.imsi);
  logger.debug('msisdn ', rsp.msisdn);
  logger.debug('iccid ', rsp.iccid);
}).catch((err: any) => {
  // error handler for not 200 response.
  logger.debug('statuscode ', err.statusCode);
  logger.debug('errcode ', err.errorCode);
  logger.debug('message ', err.message);
});

await carrierServer.releaseMsisdn(ReleaseMsisdnReq, headers).then((rsp: number) => {
  // handler for 200 response.
}).catch((err: any) => {
  // error handler for not 200 response.
  logger.debug('statuscode ', err.statusCode);
  logger.debug('errcode ', err.errorCode);
  logger.debug('message ', err.message);
});

await carrierServer.updateMsisdn(UpdateMsisdnReq, headers).then((rsp: number) => {
  // handler for 200 response.
}).catch((err: any) => {
  // error handler for not 200 response.
  logger.debug('statuscode ', err.statusCode);
  logger.debug('errcode ', err.errorCode);
  logger.debug('message ', err.message);
});

await carrierServer.alternateSmdpFqdn(AlternateSmdpFqdnReq, headers).then((rsp: any) => {
  // handler for 200 response.
  logger.debug('alternateEs2SmdpFqdn ', rsp.alternateEs2SmdpFqdn);
  logger.debug('alternateEs8SmdpFqdn ', rsp.alternateEs8SmdpFqdn);
}).catch((err: any) => {
  // error handler for not 200 response.
  logger.debug('statuscode ', err.statusCode);
  logger.debug('errcode ', err.errorCode);
  logger.debug('message ', err.message);
});


```
