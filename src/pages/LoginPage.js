import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import validator from "validator"
import empty from "is-empty"
import { connect } from 'react-redux'
import { loginUser } from '../actions/authActions'

const LoginPage = ({ dispatch, isLoggedIn, loading, hasErrors }) => {
  const navigate = useNavigate()
  const [validated, setValidated] = useState(false)
  const [errors, setErrors] = useState({})
  const [data, setData] = React.useState({
    email: "",
    password: ""
  })

  useEffect(() => {
    console.info("data.......... ", data)
    console.info("errors.......... ", errors)
  }, [data, errors])


  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn])


  const handleChange = (ev) => {
    const value = ev.target.value;
    setData({
      ...data,
      [ev.target.name]: value
    })
  }

  const submitHandler = async e => {
    e.preventDefault();

    const allErrors = {};

    // validation
    if (!validator.isEmail(data.email)) {
      allErrors.email = "Invalid email address"
    }
    if (!data.password) {
      allErrors.password = "Password should not be empty"
    }

    if (!empty(allErrors)) {
      setErrors(allErrors);
      setValidated(true)
    } else {
      setValidated(false)
      dispatch(loginUser(data))
    }
  };

  return (
    <section className='login-wrap pos-rel'>
      <div className='overlay'></div>
      <div className='login-inner'>
        <h1 className='h2 mb-4'>LOGIN</h1>

        {/* loading */}
        {loading && <div className='note mb-2'>Loding...</div>}

        {/* Error */}
        {hasErrors && <div className='note mb-2'>Please try again or user doesn't exist</div>}

        {/* Form */}
        <Form noValidate validated={validated} onSubmit={submitHandler}>
          <Form.Group controlId="email" className='mb-4'>
            <Form.Control required type="email" placeholder="Email id" onChange={handleChange} name="email" value={data.email} />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            {errors.email && (
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="password" className='mb-4'>
            <Form.Control required type="password" placeholder="Password" onChange={handleChange} name="password" value={data.password} />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            {errors.password && (
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </section>
  )
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  loading: state.auth.loading,
  hasErrors: state.auth.hasErrors
})
export default connect(mapStateToProps)(LoginPage)