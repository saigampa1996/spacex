import moment from 'moment'
import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { DateRangePicker } from 'rsuite'
import { fetchLaunch } from '../actions/launchActions'
import { launches } from '../assets/data'
import LaunchModal from '../components/LaunchModal'
import Menu from '../components/Menu'

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

  const dateFilterHandler = date => {
    if (date) {
      const lowerLimit = moment(date[0]).unix()
      const upperLimit = moment(date[1]).unix()
      const filteredLaunches = launches.filter(launch => lowerLimit <= launch.launch_date_unix && launch.launch_date_unix <= upperLimit)
      return setFilteredData(filteredLaunches)
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
            {/* input filter */}
            <Col md={3}>
              <div className='filters mb-4'>
                <div className='input-filter'>
                  <label className='d-block mb-2'>Search Launches</label>
                  <Form.Control type="search" placeholder="Search" onChange={ev => handleChange(ev)} />
                </div>
              </div>
            </Col>

            {/* date range filter */}
            <Col md={3}>
              <div className='date-filters mb-4'>
                <label className='d-block mb-2'>Date Range Launches</label>
                <DateRangePicker placeholder="Select Date Range" onChange={date => dateFilterHandler(date)} />
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