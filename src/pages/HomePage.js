import React from 'react'
import { connect } from 'react-redux'
import Menu from '../components/Menu'

const HomePage = ({ isLoggedIn }) => {
  return (
    <section className='home-wrap'>
      <div className='cust-nav'>
        <Menu isLoggedIn={isLoggedIn} />
      </div>

      <div className='home-inner'>
        <h1 className='h1'>WELCOME</h1>
        <p>Platea dictumst vesti bulum</p>
        <p>rhoncus est sque elit ullam corper dignissim</p>
      </div>
    </section>
  )
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn
})
export default connect(mapStateToProps)(HomePage)