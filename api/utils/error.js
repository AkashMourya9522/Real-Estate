export const errorHandler = (errorMessage,statusCode)=>{
    const error = new Error();
    error.errorMessage = errorMessage
    error.statusCode = statusCode
    return error
}