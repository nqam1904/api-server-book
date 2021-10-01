/* eslint-disable prettier/prettier */
export const common = {
   API_CODE_STATUS: {
      OK: +process.env.OK,
      BAD_REQUEST: +process.env.BAD_REQUEST,
      INTERNAL_SERVER: +process.env.INTERNAL_SERVER,
      FORBIDDEN: +process.env.FORBIDDEN,
      CREATED: +process.env.CREATED,
      ACCEPTED: +process.env.ACCEPTED,
      NOT_FOUND: +process.env.NOT_FOUND,
      UNAUTHORIZED: +process.env.UNAUTHORIZED,
   },
   AUTHENTICATION: {
      JWT: process.env.JWT,
      BEARER: process.env.BEARER,
      AUTHORIZATION: process.env.AUTHORIZATION,
   },
};
