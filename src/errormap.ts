interface ErrorDescription {
  [key: string]: {
    statusCode: number;
    errorCode: string;
    message: string;
  };
}

class itSystemError extends Error {
  statusCode: number;
  errorCode: string;

  constructor(errorType: string, errorMap: ErrorDescription) {
    let error = errorMap[errorType] || errorMap['UNKNOWN'];
    super(error.message);
    Error.captureStackTrace(this, this.constructor);
    this.message = error.message;
    this.statusCode = error.statusCode;
    this.errorCode = error.errorCode;
  }
}

const commomErrMap: ErrorDescription = {
  REQUEST_ERROR: {
    statusCode: 400,
    errorCode: 'REQUEST_ERR',
    message: 'carryer it system network err.'
  },
  INVALID_RESPONSE: {
    statusCode: 500,
    errorCode: 'RESPONSE_INVALID',
    message: 'The format or value of specific field is invalid.'
  }
};

class commonError extends itSystemError {
  constructor(errorType: string) {
    super(errorType, commomErrMap);
  }
}


export { ErrorDescription, itSystemError, commonError };
