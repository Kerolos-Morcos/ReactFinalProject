import React from 'react'
import ourservicestyle from'../Our-services/ourservices.module.css' 
// import one from '../../assets/aboutImgs/Physical therapy exercise-rafiki.svg'
// import two from '../../assets/aboutImgs/Medicine-rafiki.png'
// import three from '../../assets/aboutImgs/Emergency call-rafiki.png'
// import four from '../../assets/aboutImgs/Medicine-rafiki.svg'

import one from '../../../assets/images/Physical therapy exercise-rafiki.svg'
import two from '../../../assets/images/Medicine-rafiki.png'
import three from '../../../assets/images/Emergency call-rafiki.png'
import four from '../../../assets/images/Medicine-rafiki.svg'

function Ourservices() {
  return (
    <>
   <body dir="rtl">
  <div className={ourservicestyle.main}>
     <div className={"container"}>
     <div className={"row"}>

     <div className={ourservicestyle.heading_container}>
        <h2>مـطـــورى المــوقع</h2>
        </div>
          <div class={"col-sm-6 col-lg-4"}>
    <div className={ourservicestyle.profile_card}>
      <div className={ourservicestyle.img}>
        <img src={one} />
      </div>
      <div className={ourservicestyle.caption}>
        <h3>Hany Mahmoud</h3>
        <p>App Developer</p>
        <div className={ourservicestyle.social_links}>
          <a href="#">
            <i className={"fab fa-facebook"} />
          </a>
          <a href="#">
            <i className={"fab fa-twitter"} />
          </a>
          <a href="#">
            <i className={"fab fa-instagram"} />
          </a>
          <a href="#">
            <i className={"fab fa-github"} />
          </a>
        </div>
      </div>
    </div>
    </div>
    <div class={"col-sm-6 col-lg-4"}>
    <div className={ourservicestyle.profile_card}>
      <div className={ourservicestyle.img}>
        <img src={two} />
      </div>
      <div className={ourservicestyle.caption}>
        <h3>Kerolos Morcos</h3>
        <p>Front End Developer</p>
        <div className={ourservicestyle.social_links}>
          <a href="#">
            <i className={"fab fa-facebook"} />
          </a>
          <a href="#">
            <i className={"fab fa-twitter"} />
          </a>
          <a href="#">
            <i className={"fab fa-instagram"} />
          </a>
          <a href="#">
            <i className={"fab fa-github"} />
          </a>
        </div>
      </div>
    </div>
    </div>
    <div class={"col-sm-6 col-lg-4"}>
    <div className={ourservicestyle.profile_card}>
      <div className={ourservicestyle.img}>
        <img src={three} />
      </div>
      <div className={ourservicestyle.caption}>
        <h3>Mahmoud Elsawy</h3>
        <p>Full Stact Developer</p>
        <div className={ourservicestyle.social_links}>
          <a href="#">
            <i className={"fab fa-facebook"} />
          </a>
          <a href="#">
            <i className={"fab fa-twitter"} />
          </a>
          <a href="#">
            <i className={"fab fa-instagram"} />
          </a>
          <a href="#">
            <i className={"fab fa-github"} />
          </a>
        </div>
      </div>
    </div>
    </div>
    <div class={"col-sm-6 col-lg-4"}>
    <div className={ourservicestyle.profile_card}>
      <div className={ourservicestyle.img}>
        <img src={one} />
      </div>
      <div className={ourservicestyle.caption}>
        <h3 className='caption2'>Anas Hossam</h3>
        <p>App Developer</p>
        <div className={ourservicestyle.social_links}>
          <a href="#">
            <i className={"fab fa-facebook"} />
          </a>
          <a href="#">
            <i className={"fab fa-twitter"} />
          </a>
          <a href="#">
            <i className={"fab fa-instagram"} />
          </a>
          <a href="#">
            <i className={"fab fa-github"} />
          </a>
        </div>
      </div>
    </div>
    </div>
    <div class={"col-sm-6 col-lg-4"}>
    <div className={ourservicestyle.profile_card}>
      <div className={ourservicestyle.img}>
        <img src={one} />
      </div>
      <div className={ourservicestyle.caption}>
        <h3 className='caption2'>Asmaa Khaled</h3>
        <p>App Developer</p>
        <div className={ourservicestyle.social_links}>
          <a href="#">
            <i className={"fab fa-facebook"} />
          </a>
          <a href="#">
            <i className={"fab fa-twitter"} />
          </a>
          <a href="#">
            <i className={"fab fa-instagram"} />
          </a>
          <a href="#">
            <i className={"fab fa-github"} />
          </a>
        </div>
      </div>
    </div>
    </div>
    <div class={"col-sm-6 col-lg-4"}>
    <div className={ourservicestyle.profile_card}>
      <div className={ourservicestyle.img}>
        <img src={one} />
      </div>
      <div className={ourservicestyle.caption}>
        <h3 className='caption2'>Ayda Bahr</h3>
        <p>App Developer</p>
        <div className={ourservicestyle.social_links}>
          <a href="#">
            <i className={"fab fa-facebook"} />
          </a>
          <a href="#">
            <i className={"fab fa-twitter"} />
          </a>
          <a href="#">
            <i className={"fab fa-instagram"} />
          </a>
          <a href="#">
            <i className={"fab fa-github"} />
          </a>
        </div>
      </div>
      </div>
      </div>
    </div>
    </div>
  </div>
</body>
    </>
  )
}

export default Ourservices