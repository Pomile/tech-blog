const { checkSchema } = require('express-validator');

export const pathParamValidator = checkSchema({
    id: {
      // The location of the field, can be one or more of body, cookies, headers, params or query.
      // If omitted, all request locations will be checked
      in: ['params', 'path'],
      errorMessage: 'ID is wrong',
      isInt: true,
      // Sanitizers can go here as well
      toInt: true,
    },
});

export const pageValidator = checkSchema({
    page: {
      // The location of the field, can be one or more of body, cookies, headers, params or query.
      // If omitted, all request locations will be checked
      in: ['params', 'query'],
      errorMessage: 'Invalid page',
      isInt: true,
      // Sanitizers can go here as well
      toInt: true,
    },
    limit: {
        // The location of the field, can be one or more of body, cookies, headers, params or query.
        // If omitted, all request locations will be checked
        in: ['params', 'query'],
        errorMessage: 'Invalid limit',
        isInt: true,
        // Sanitizers can go here as well
        toInt: true,
      },
});