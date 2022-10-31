
export default async function ProtectedPageRoute(
    context,
    redirectTo, // string route where user will be redirected if they are not authenticated
    getProps, // function to fetch initial props
  ) {
    const userIsAuthenticated = true // TODO: check if user is authenticated
    if (!userIsAuthenticated) {
      return {
        redirect: {
          destination: redirectTo ?? '/signin',
          permanent: false,
        }
      }
    }
  
    if (getProps) {
      return {
        props: getProps(),
      }
    }
  
    return {
      props: {},
    }
  }