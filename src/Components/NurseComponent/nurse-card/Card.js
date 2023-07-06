import React from 'react'
import cardNurseStyle from './Card.module.css';
import imgex from '../img/badge.png'
import imgc from '../img/price.png'
import imgl from '../img/location.png'
import { Link, NavLink, useNavigate } from 'react-router-dom';
// import Rating from '../../devicesComponents/Rating';
import Rating from '../../NurseComponent/Rating'
import NurseProfile from '../../nurseProfile/NurseProfile';
import ShowNurseProfile from '../../showNurseProfile/ShowNurseProfile';


function Card({ data }) {
  const api = "http://localhost:3500/"

  const nav = useNavigate()
  function goTo() {
    nav(`/FormNurse/${data._id}`, { state: data })
    console.log(data);
  }

  return (
    <div  className={cardNurseStyle["preview-card"]} dir='rtl'>
      <div  className={cardNurseStyle["preview-card__wrp"]}>
        <div className={cardNurseStyle["preview-card__item"]}>
          <div className={cardNurseStyle["preview-card__img"]}>
            <img src={`${api}${data.profile}`} alt="" />
          </div>
          <div className={cardNurseStyle["preview-card__content"]}>

            <div className={cardNurseStyle["preview-card__title"]}> {data.name}</div>
            <div className={cardNurseStyle["rate"]}>
              <Rating rate={data.rates} />
            </div>
            <br />
            <span className={cardNurseStyle["preview-card__code"]}>
           <img src={imgex} alt=""/>: {data.experienceYear} سنوات خبرة</span>
            <div className={cardNurseStyle["preview-card__text"]}>
              <p className='pb-3'>
                <img src={imgc} alt="" /> : {data.shiftPrice} ج.م بالشيفت
              </p>
              <p>
                <img src={imgl} alt="" />: {data.region}
              </p>
              <NavLink
                to={`/ShowNurseProfile/${data._id}`} className={cardNurseStyle.MoreInfo}>
                مزيد من المعلومات..
              </NavLink>
            </div>

            <button onClick={goTo} className={cardNurseStyle["preview-card__button"]}> احجز الان</button>
            {/* <NavLink to={`/FormNurse/${data.id}`} className={cardNurseStyle["preview-card_button"]}> احجز الان</NavLink> */}
          </div>
        </div>

      </div>
      {/* <div class="rate">
            <input type="radio" id="star5" name="rate" value="5" />
            <label for="star5" title="text">5 stars</label>
            <input type="radio" id="star4" name="rate" value="4" />
            <label for="star4" title="text">4 stars</label>
            <input type="radio" id="star3" name="rate" value="3" />
            <label for="star3" title="text">3 stars</label>
            <input type="radio" id="star2" name="rate" value="2" />
            <label for="star2" title="text">2 stars</label>
            <input type="radio" id="star1" name="rate" value="1" />
            <label for="star1" title="text">1 star</label>
          </div> */}
    </div>
  )
}
export default Card;