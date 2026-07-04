export const HTTP_STATUS = {
    OK: 200, // when the request is successful
    CREATED: 201, // when a resource is successfully created
    BAD_REQUEST: 400, // when the request is invalid or malformed example: when a required field is missing or the request body is not in the correct format
    NOT_FOUND: 404, // when the requested resource is not found example: when a user tries to access a resource that does not exist
    INTERNAL_SERVER_ERROR: 500, // when an internal server error occurs means something went wrong on the server side example: when a database connection fails or an unexpected error occurs
    UNAUTHORIZED: 401, // when the request is not authorized

};