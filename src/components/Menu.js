import React, { useEffect } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { logoutUser } from '../actions/authActions'
import Logo from '../assets/logo.png'

const Menu = () => {
  const { isLoggedIn, currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    console.info("isLoggedIn", isLoggedIn)
    console.info("currentUser", currentUser)
  }, [isLoggedIn, currentUser])

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={Logo} />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/">Home</Nav.Link>
          <Nav.Link as={NavLink} to="/launches">Launches</Nav.Link>
        </Nav>
        {!isLoggedIn && (
          <div className="d-flex nav-right">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
        {isLoggedIn && currentUser && (<div className="d-flex nav-right user-wrap">
          <img
            src='https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere.png'
            alt="user pic" className='img-fluid'
          /> {currentUser.name}
          <Button variant="danger" size="sm" className='logout-btn' onClick={() => dispatch(logoutUser())}>Logout</Button>
        </div>)}
      </Container>
    </Navbar>
  )
}

export default Menu