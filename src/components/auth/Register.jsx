import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './Auth.css';
import FormInput from '../reusable/FormInput';
import RadioInput from '../reusable/RadioInput';
import Button from '../reusable/Button';
import { Link } from 'react-router-dom';
import { validateInputs } from '../../helpers/Helpers';
import { createUser } from '../../redux/action/auth';

const Register = props => {
  const { createUser, isAuthenticated, history } = props;
  const [user, setUser] = useState({
    username: '',
    password: '',
    role: ''
  });

  const [error, setError] = useState({
    usernameError: '',
    passwordError: '',
    roleError: ''
  })

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/dashboard')
    }
  }, [isAuthenticated, history]);

  const { username, password } = user;
  const { usernameError, passwordError, roleError } = error;

  const onRegisterUser = e => {
    e.preventDefault();
    const isValid = validateInputs(user, setError);
    console.log(isValid)
    if (isValid) {
      createUser(user)
    }
  }

  const onChange = e => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={onRegisterUser}>
          <h3>Sign Up</h3>
          <div className="form-group">
            <FormInput
              type="text"
              name="username"
              label="Username"
              className="form-control"
              placeholder="Enter Username"
              value={username}
              error={usernameError}
              onChange={onChange}
            />
            <FormInput
              type="password"
              name="password"
              label="Password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              error={passwordError}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <RadioInput
                id="inlineRadio1"
                name="role"
                labelClassName="form-check-label"
                className="form-check-input"
                value="User"
                error={roleError}
                onChange={onChange}
              />
            </div>
            <div className="form-check form-check-inline">
              <RadioInput
                id="initialRadio2"
                name="role"
                labelClassName="form-check-label"
                className="form-check-input"
                value="Admin"
                error={roleError}
                onChange={onChange}
              />
            </div>
          </div>
          <Button
            type="submit"
            label="Sign Up"
            className="btn btn-primary btn-block"
          />
          <p className="forgot-password">
            Already registered? <Link to={"/sign-in"}>Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const actions = ({ 
  createUser
})

export default connect(mapStateToProps, actions)(Register);

