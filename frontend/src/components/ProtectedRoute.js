import React from 'react';
import { Navigate } from "react-router-dom";
import {LoggedInContext} from '../contexts/CurrentUserContext'

const ProtectedRouteElement = ({ element: Component, ...props }) => {

  const loggedIn = React.useContext(LoggedInContext);

  return (
    loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace />
  )

}

export default ProtectedRouteElement;