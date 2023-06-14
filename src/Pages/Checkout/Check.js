import React from 'react'
import check from './checkout.module.css'

function Check() {
  return (
    <div className={check.body}>
      <div className={"container"}>
        <div className={check.card}>
          <a href="./form.html">
            <button className={check.proceed}>
              <i class="fa-solid fa-arrow-left-long fa-fade fa-2xl"></i>         </button>
          </a>
          <img
            src="https://seeklogo.com/images/V/VISA-logo-62D5B26FE1-seeklogo.com.png"
            className={check.logo_card}
            alt='visa'
          />
          <label>رقم الكارت:</label>
          <input
            id="user"
            type="text"
            className={`${check.input} ${check.cardnumber}`}
            placeholder="1234 5678 9101 1121"
          />
          <input
            id="user"
            type="text"
            className={`${check.input} ${check.cardnumber}`}
            placeholder="اسم صاحب الكارت"
          />
          <input className={`${check.input} ${check.toleft} ${check.ccv}`} placeholder="mon" />
          <input className={`${check.input} ${check.toleft} ${check.ccv}`} placeholder="year" />
          <input className={`${check.input} ${check.toleft} ${check.ccv}`} placeholder="CCV" />
        </div>
        <div className={check.receipt}>
          <div className={check.col}>
            <p>التكلفة:</p>
            <h2 className={check.cost}>ج.م400</h2>
            <br />
            <p>الاسم:</p>
            <h2 className={check.seller}>هاني محمود  </h2>
          </div>
          <div className={check.col}>
            <p> عناصر الطلب :</p>
            <h3 className={check.bought_items}>أنبوبة اكسجين</h3>
            <p className={`${check.bought_items} ${check.description}`}> يفتح تنقل الكراسي المتحركة فرصًا للمستخدمين للدراسة والعمل.
            </p>
            <p className={`${check.bought_items} ${check.price}`}>200 ج.م (50% عرض)</p>
            <br />
            <h3 className={check.bought_items}>كرسي متحرك </h3>
            <p className={`${check.bought_items} ${check.description}`}>الكرسي المتحرك لكبار السن وذوي الاحتياجات الخاصة يصل وزنه الي 110 كيلو جرام
            </p>
            <p className={`${check.bought_items} ${check.price}`}>200 ج.م (50% عرض)</p>
            <br />
          </div>
          <p className={check.comprobe}>هذه البيانات سوف نرسلها الي بريدك الالكتروني فور اتمام الطلب</p>
        </div>
      </div>
    </div >
  )
}


export default Check