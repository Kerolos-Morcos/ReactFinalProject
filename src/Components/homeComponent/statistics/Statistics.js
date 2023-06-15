import React from 'react'
import StatStyle from './statistics.module.css'

function Statistics() {
  return (
    <>
  {/* Start Statistics */}
  <section className={StatStyle.counters} data-stellar-background-ratio="0.5">
    <div className={StatStyle.overlay}>
      <div className={"container"}>
        <ul className={"row"}>
          {/*======= PROPOSALS SENT =========*/}
          <li className={"col-sm-3"}>
            {" "}
            <i className={`${"fa fa-user-md"} ${StatStyle.fa_smile_o}`}/> <span className={"count1"}>9501</span>
            <p>عدد الممرضين</p>
          </li>
          {/*======= PROPOSALS SENT =========*/}
          <li className={"col-sm-3"}>
            {" "}
            <i className={"fa fa-bed"}/> <span className={"count2"}>38</span>
            <p>عدد المرضى</p>
          </li>
          {/*======= AWARDS WON =========*/}
          <li className={"col-sm-3"}>
            {" "}
            <i className={"fa fa-pump-medical"}/> <span className={"count3"}>572</span>
            <p>عدد الأجهزة</p>
          </li>
          <li className={"col-sm-3"}>
            {" "}
            <i className={"fa fa-business-time"}/> <span className={"count4"}>14</span>
            <p>عدد مرات الحجز</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
  {/* End Statistics */}
</>

  )
}

export default Statistics