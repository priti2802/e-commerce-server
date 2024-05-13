const response = (
  status = 200,
  responseCode = 1,
  responseText = "",
  responseData = {},
  otherData = {}
) => {
  return {
    status,
    responseCode,
    responseText,
    responseData,
    ...otherData,
  };
};

// SUCCESS RESPONSE
const successResponse = (code = 1, message = "", data = {}) => {
  return response(200, code, message, data);
};

// ERROR RESPONSE

// content not available
const noContentError = (code = 0, message = "", data) => {
  return response(204, code, message, data);
};

// wrong payload
const badRequestError = (code = 0, message = "Bad Request", data = {}) => {
  return response(400, code, message, data);
};

// un authorized user
const invalidTokenError = (code = 0, message = "", data = {}, error = {}) => {
  return response(401, code, message, data, { error });
};

// user has no access
const forbiddenError = (code = 0, message = "", data = {}, error = {}) => {
  return response(403, code, message, data, { error });
};

// route not found
const notFoundError = (code = 0, message = "", data = {}) => {
  return response(404, code, message, data);
};

const requestTimeOutError = (code = 0, message = "", data = {}, error = {}) => {
  return response(408, code, message, data, { error });
};

const conflictError = (code = 0, message = "", data, error = {}) => {
  return response(409, code, message, data, { error });
};

// wrong parameter or payload
const validationError = (code = 0, message = "", data = {}, error = {}) => {
  return response(422, code, message, data, { error });
};

// internal server error
const serverError = (code = 0, message = "", data = {}, error = {}) => {
  return response(500, code, message, data, { error });
};

const otherError = (
  statusCode,
  code = 0,
  message = "",
  data = {},
  error = {}
) => {
  return response(statusCode, code, message, data, { error });
};

module.exports = {
  successResponse,
  noContentError,
  badRequestError,
  invalidTokenError,
  forbiddenError,
  notFoundError,
  requestTimeOutError,
  conflictError,
  validationError,
  serverError,
  otherError,
};
