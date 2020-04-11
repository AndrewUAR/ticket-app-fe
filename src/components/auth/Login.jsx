import React from 'react';
import './Auth.css';
import FormInput from '../reusable/FormInput';
import Button from '../reusable/Button';
import { Link } from 'react-router-dom';

const Register = () => {
  const onChange = () => {

  }

  const onClick = () => {}

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form>
          <h3>Sign Up</h3>
          <div className="form-group">
            <FormInput
              type="text"
              name="username"
              label="Username"
              className="form-control"
              placeholder="Enter Username"
              value=""
              error=""
              onChange={onChange}
            />
            <FormInput
              type="password"
              name="password"
              label="Password"
              className="form-control"
              placeholder="Enter Password"
              value=""
              error=""
              onChange={onChange}
            />
          </div>
          <Button
            type="submit"
            label="Sign In"
            className="btn btn-primary btn-block"
            omClick={onClick}
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


