import React, { useState } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { fetchLaunch } from '../actions/launchActions'
import { launches } from '../assets/data'
import LaunchModal from '../components/LaunchModal'
import Menu from '../components/Menu'
// import { Link } from 'react-router-dom'

const LaunchesPage = ({ dispatch }) => {
  const [show, setShow] = useState(false)
  const [filteredData, setFilteredData] = useState(launches)

  const modalHandler = launch => {
    setShow(true)
    dispatch(fetchLaunch(launch))
  }

  const dropHandler = () => {
    setShow(false)
  }

  // Search fn
  const handleChange = ev => {
    const res = launches.filter(launch => launch.title.toLocaleLowerCase().includes(ev.target.value.toLocaleLowerCase()))
    if (ev.target.value) {
      return setFilteredData(res)
    }
    return setFilteredData(launches)
  }

  return (
    <section className='dash-wrap'>
      {/* header */}
      <div className='sub-header pos-rel'>
        <div className='cust-nav'>
          <Menu />
        </div>
        <Container>
          <Row>
            <Col md={12}>
              <div className='sub-header-title'>
                <h1 className='h2'>LAUNCHES</h1>
                <p>Oncusest sque elit ullam</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* content */}
      <div className='dash-content'>
        <Container>
          <Row>
            <Col md={4}>
              <div className='filters mb-4'>
                <div className='input-filter'>
                  {/* <input type="text" placeholder="Search" onChange={ev => handleChange(ev)} /> */}
                  <Form.Control type="search" placeholder="Search" onChange={ev => handleChange(ev)} />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            {filteredData && filteredData.map(launch => <Col md={4} className="mb-4" key={launch.id}>
              <div className='article' onClick={() => modalHandler(launch)}>
                <div className='article-inner'>
                  <div className='article-image'>
                    <img src={launch.image} />
                  </div>
                  <div className='article-content'>
                    <div className='article-badge'>
                      <a className='article-tag' href='#'>{launch.tag}</a>
                    </div>
                    <h4 className='article-title'>{launch.title}</h4>
                    <p className='article-desc'>{launch.desc}</p>
                    <p className='article-date'>{launch.date}</p>
                  </div>
                </div>
              </div>
            </Col>)}
            {filteredData.length === 0 && <Col md={12}><span>No data found.</span></Col>}
          </Row>
        </Container>
      </div>

      {/* modal */}
      {show && (<LaunchModal dropHandler={dropHandler} />)}
    </section>
  )
}
const mapStateToProps = (state) => ({
  launch: state.launch.launch
})
export default connect(mapStateToProps)(LaunchesPage)