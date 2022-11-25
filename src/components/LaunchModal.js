import React from 'react'
import { connect } from 'react-redux'

const LaunchModal = ({ launch, dropHandler }) => {
  return (
    <div className='lmodal'>
      <div className='lmodal-content'>
        <div className='modal-close' onClick={() => dropHandler()}>CLOSE</div>
        <div>
          <img src={launch.image} class="img-fluid" />
          <h4 className='launch-title'>{launch.title}</h4>
          <p className='launch-desc'>{launch.desc}</p>
          <p className='launch-date'>{launch.date}</p>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => ({
  launch: state.launch.launch
})
export default connect(mapStateToProps)(LaunchModal)
