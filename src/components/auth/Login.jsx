import React, { useState } from 'react';
import './Auth.css';
import FormInput from '../reusable/FormInput';
import Button from '../reusable/Button';
import { Link } from 'react-router-dom';
import { validateInputs } from '../../helpers/Helpers';

const Register = () => {
  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState({
    usernameError: '',
    passwordError: ''
  })

  const { username, password } = user;
  const { usernameError, passwordError, roleError } = error;

  const onLoginUser = e => {
    e.preventDefault();
    const isValid = validateInputs(user, setError);
    console.log(isValid)
    if (isValid) {
      console.log(user)
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
        <form onSubmit={onLoginUser}>
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
          <Button
            type="submit"
            label="Sign In"
            className="btn btn-primary btn-block"
          />
          <p className="forgot-password">
            Don't have an account? <Link to={"/sign-up"}>Register</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register


