import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import validator from "validator"
import empty from "is-empty"
import { connect } from 'react-redux'
import { registerUser } from '../actions/authActions'

const RegisterPage = ({ dispatch, users, existingUser }) => {
  const navigate = useNavigate()
  const [validated, setValidated] = useState(false)
  const [errors, setErrors] = useState({})
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    password: "",
    rePassword: ""
  })

  useEffect(() => {
    console.info("user.......... ", user)
    console.info("errors.......... ", errors)
    console.info("existingUser.......... ", existingUser)
  }, [user, errors, existingUser])

  const handleChange = (ev) => {
    const value = ev.target.value;
    setUser({
      ...user,
      [ev.target.name]: value
    })
  }

  const submitHandler = async e => {
    e.preventDefault();

    const allErrors = {};

    // validation
    if (!user.name) {
      allErrors.name = "Name should not be empty"
    }
    if (!validator.isEmail(user.email)) {
      allErrors.email = "Invalid email addexistingUsers"
    }
    if (!user.password) {
      allErrors.password = "Password should not be empty"
    }
    if (!user.rePassword) {
      allErrors.rePassword = "Re-enter password should not be empty"
    }
    if (user.password !== user.rePassword) {
      allErrors.passwordEqual = "Password and Re-enter password should be same"
    }

    if (!empty(allErrors)) {
      setErrors(allErrors);
      setValidated(true)
    } else {
      setValidated(false)
      const newUser = { id: users.length + 1, ...user }
      await dispatch(registerUser(newUser))
      if (existingUser) {
        return navigate('/register')
      }
      navigate('/login')
    }
  };

  return (
    <section className='login-wrap pos-rel'>
      <div className='overlay'></div>
      <div className='login-inner'>
        <h1 className='h2 mb-4'>REGISTER</h1>

        {/* note */}
        {existingUser && <div className='note mb-2'>User already exists. Please try with different email.</div>}

        {/* form */}
        <Form noValidate validated={validated} onSubmit={submitHandler}>
          <Form.Group controlId="name" className='mb-4'>
            <Form.Control required type="text" placeholder="Name" onChange={handleChange} name="name" value={user.name} />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            {errors.name && (
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="email" className='mb-4'>
            <Form.Control required type="text" placeholder="Email" onChange={handleChange} name="email" value={user.email} />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            {errors.email && (
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="password" className='mb-4'>
            <Form.Control required type="password" placeholder="Password" onChange={handleChange} name="password" value={user.password} />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            {errors.password && (
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="rePassword" className='mb-4'>
            <Form.Control required type="password" placeholder="Re-enter Password" onChange={handleChange} name="rePassword" value={user.rePassword} />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            {errors.rePassword && (
              <Form.Control.Feedback type="invalid">
                {errors.rePassword}
              </Form.Control.Feedback>
            )}
            {errors.passwordEqual && (
              <Form.Control.Feedback type="invalid">
                {errors.passwordEqual}
              </Form.Control.Feedback>
            )}

          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </section >
  )
}

const mapStateToProps = (state) => ({
  users: state.auth.users,
  currentUser: state.auth.currentUser,
  existingUser: state.auth.existingUser
})
export default connect(mapStateToProps)(RegisterPage)