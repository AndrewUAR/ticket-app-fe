import React from 'react';
import './Auth.css';
import FormInput from '../reusable/FormInput';
import RadioInput from '../reusable/RadioInput';
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
          <div className="form-group">
            <div className="form-check form-check-inline">
              <RadioInput
                id="inlineRadio1"
                name="role"
                labelClassName="form-check-label"
                className="form-check-input"
                value="User"
                error=""
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
                error=""
                onChange={onChange}
              />
            </div>
          </div>
          <Button
            type="submit"
            label="Sign Up"
            className="btn btn-primary btn-block"
            omClick={onClick}
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

