import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = props => {
  const { isAuthenticated, component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={props => 
        !isAuthenticated ? (<Redirect to="/" />) : <Component {...props} />}
    />
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps)(PrivateRoute);

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool
}