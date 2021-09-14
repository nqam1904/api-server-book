/* eslint-disable prettier/prettier */
export const common = {
   API_CODE_STATUS: {
      OK: 200,
      BAD_REQUEST: 400,
      INTERNAL_SERVER: 500,
      FORBIDDEN: 403,
      CREATED: 201,
      ACCEPTED: 202,
      NOT_FOUND: 404,
      UNAUTHORIZED: 401,
   },
   AUTHENTICATION: {
      JWT: process.env.JWT,
      BEARER: process.env.BEARER,
      AUTHORIZATION: process.env.BEARER,
   },
};
