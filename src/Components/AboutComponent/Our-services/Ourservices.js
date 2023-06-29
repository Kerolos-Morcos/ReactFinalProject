import React from 'react'
import ourservicestyle from'../Our-services/ourservices.module.css' 
import one from '../../../assets/images/Physical therapy exercise-rafiki.svg'
import two from '../../../assets/images/Medicine-rafiki.png'
import three from '../../../assets/images/Emergency call-rafiki.png'
import four from '../../../assets/images/Medicine-rafiki.svg'
import DarkStyle from '../../DarkMode/darkBtn.module.css'
import { useEffect } from 'react'


function Ourservices() {
  useEffect(()=>{
    // Dark Mode
    const isDarkMode = localStorage.getItem("isDarkMode")
    if(isDarkMode){
      document.querySelector("#AboutOurServices")?.classList.toggle(DarkStyle["AboutOurServices"], isDarkMode);
      document.querySelector("#AboutOurServicesCard")?.classList.toggle(DarkStyle["AboutOurServicesCard"], isDarkMode);
      document.querySelector("#AboutOurServicesCardTwo")?.classList.toggle(DarkStyle["AboutOurServicesCard"], isDarkMode);
      document.querySelector("#AboutOurServicesCardThree")?.classList.toggle(DarkStyle["AboutOurServicesCard"], isDarkMode);
      document.querySelector("#AboutOurServicesCardFour")?.classList.toggle(DarkStyle["AboutOurServicesCard"], isDarkMode);
      document.querySelector("#AboutOurServicesCardFive")?.classList.toggle(DarkStyle["AboutOurServicesCard"], isDarkMode);
      document.querySelector("#AboutOurServicesCardSix")?.classList.toggle(DarkStyle["AboutOurServicesCard"], isDarkMode);
    }
  },[])
  return (
    <>
   <body style={{marginTop:'-100px'}} dir="rtl">
  <div id='AboutOurServices' className={ourservicestyle.main}>
     <div className={"container"}>
     <div className={"row"}>

     <div className={ourservicestyle.heading_container}>
        <h2>مـطـــورى المــوقع</h2>
        </div>
          <div class={"col-sm-6 col-lg-4"}>
    <div id='AboutOurServicesCard' className={ourservicestyle.profile_card}>
      <div className={ourservicestyle.img}>
        <img src={one} />
      </div>
      <div className={ourservicestyle.caption}>
        <h3>Hany Mahmoud</h3>
        <p className="pb-2">App Developer</p>
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
    <div id='AboutOurServicesCardTwo' className={ourservicestyle.profile_card}>
      <div className={ourservicestyle.img}>
        <img src={two} />
      </div>
      <div className={ourservicestyle.caption}>
        <h3>Kerolos Morcos</h3>
        <p className="pb-2">Front End Developer</p>
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
    <div id='AboutOurServicesCardThree' className={ourservicestyle.profile_card}>
      <div className={ourservicestyle.img}>
        <img src={three} />
      </div>
      <div className={ourservicestyle.caption}>
        <h3>Mahmoud Elsawy</h3>
        <p className="pb-2">Full Stact Developer</p>
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
    <div id='AboutOurServicesCardFour' className={ourservicestyle.profile_card}>
      <div className={ourservicestyle.img}>
        <img src={one} />
      </div>
      <div className={ourservicestyle.caption}>
        <h3 className='caption2'>Anas Hossam</h3>
        <p className="pb-2">App Developer</p>
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
    <div id='AboutOurServicesCardFive' className={ourservicestyle.profile_card}>
      <div className={ourservicestyle.img}>
        <img src={one} />
      </div>
      <div className={ourservicestyle.caption}>
        <h3 className='caption2'>Asmaa Khaled</h3>
        <p className="pb-2">App Developer</p>
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
    <div id='AboutOurServicesCardSix' className={ourservicestyle.profile_card}>
      <div className={ourservicestyle.img}>
        <img src={one} />
      </div>
      <div className={ourservicestyle.caption}>
        <h3 className='caption2'>Ayda Bahr</h3>
        <p className="pb-2">App Developer</p>
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