export default async function ProtectedApiRoute(
    req,
    res,
    requestHandler,
  ) {
    const userIsAuthenticated = true // TODO: check if user is authenticated
    if (!userIsAuthenticated) {
      return res
        .status(401)
        .json({
          error: {
            code: 'unauthorized',
            message: 'User is not authorized',
          }
        })
    }
  
    if (requestHandler) {
      return requestHandler(req, res)
    }
  
    return res
      .status(400)
      .json({
        error: {
          code: 'no_request_handler_specified',
          message: 'No request handler specified',
        }
      })
  }