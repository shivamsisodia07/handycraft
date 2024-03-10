import React from 'react'
// import background from './v915-wit-011-l.jpg'
// import Carousel from 'react-bootstrap/Carousel';
import styles from '../assets/js/jsmaster'
import "../assets/css/VideoCarousal.css"


const VideoCarousel = () => {
  return (
    <div>
      <h1 className={styles.heading2} style={{color:"white",padding:"10px 10px",fontSize:"39px",marginTop:"20px"}}>HandiCrafts Videos</h1>
      <div className='grid-container' style={{
        display: 'grid',
        gridTemplateColumns: 'auto auto auto',
        gridGap: '5px',
        width: '100%',
        height: '600px',
        // border: '2px red solid',
        // justifyContent: 'center'
      }}>
          <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/WoX2V0A3s3o?si=-mbnSYf43VWs9dwc" allowFullscreen style={{
                  width: '100%', height: '100%'}}></iframe>
          <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/Rp6Sn1coaKk?si=C-CUijdAcZIHC3H2" allowFullscreen style={{
                  width: '100%', height: '100%'}}></iframe>
          <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/G51VDd2xZpo?si=bhhmIQEo730t9VA_" allowFullscreen style={{
                  width: '100%', height: '100%'}}></iframe>
          <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/A6quHT0joWk?si=4hsXpeP_3-5OcyR9" allowFullscreen style={{
                  width: '100%', height: '100%'}}></iframe>
          <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/5nxygYOsC8I?si=h1qVSmoBHES7F-9o" allowFullscreen style={{
                  width: '100%', height: '100%'}}></iframe>
          <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/pKkOVJF9pRk?si=uuJbbYRcJ8f9fp-4" allowFullscreen style={{
                  width: '100%', height: '100%'}}></iframe>
      </div>
        {/* <Carousel>
            <Carousel.Item>
              <div class="embed-responsive">
                <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/v9RHWiqXVXU" allowfullscreen style={{
                  width: '560px', height: '315px'}}></iframe>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div class="embed-responsive">
                    <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/BU3CbOTRogc" allowfullscreen style={{
                  width: '560px', height: '315px'}}></iframe>
                </div>
            </Carousel.Item>
        </Carousel> */}
    </div>
  )
}

export default VideoCarousel