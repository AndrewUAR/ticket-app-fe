import React, { useState } from 'react';
import './Auth.css';
import FormInput from '../reusable/FormInput';
import RadioInput from '../reusable/RadioInput';
import Button from '../reusable/Button';
import { Link } from 'react-router-dom';
import { validateInputs } from '../../helpers/Helpers';

const Register = () => {
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

  const { username, password } = user;
  const { usernameError, passwordError, roleError } = error;

  const onRegisterUser = e => {
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

export default Register

