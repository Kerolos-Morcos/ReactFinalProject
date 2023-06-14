import React from 'react'
import SerVStyle from './services.module.css'
// SVGs
import SaveMoney from '../../../assets/images/new/aboutImgs/Wallet-cuate.svg'
import NurseGroup from '../../../assets/images/new/aboutImgs/Health professional team-amico.svg'
function Services() {
  return (
    <section className={SerVStyle.ourServices} id='Services'>
  <div className={`${"row"} ${SerVStyle.row}`}>
    <h2 className={SerVStyle.section_heading}>خـدماتُنـــــــــا</h2>
  </div>
  <div className={`${"row"} ${SerVStyle.row}`}>
    <div className={SerVStyle.column}>
      <div className={SerVStyle.card}>
        <div className={SerVStyle.icon_wrapper}>
          {/* <i className={"fas fa-hammer"}/> */}
          <img src={SaveMoney}/>
        </div>
        <h3>Service Heading</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
          consequatur necessitatibus eaque.
        </p>
      </div>
    </div>
    <div className={SerVStyle.column}>
      <div className={SerVStyle.card}>
        <div className={SerVStyle.icon_wrapper}>
          {/* <i className={"fas fa-brush"}/> */}
          <img src={NurseGroup}/>
        </div>
        <h3>Service Heading</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
          consequatur necessitatibus eaque.
        </p>
      </div>
    </div>
    <div className={SerVStyle.column}>
      <div className={SerVStyle.card}>
        <div className={SerVStyle.icon_wrapper}>
          {/* <i className={"fas fa-wrench"}/> */}
          <img src={NurseGroup}/>
        </div>
        <h3 className='pt-2'> خدمة سريعة </h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
          consequatur necessitatibus eaque.
        </p>
      </div>
    </div>
    <div className={SerVStyle.column}>
      <div className={SerVStyle.card}>
        <div className={SerVStyle.icon_wrapper}>
          {/* <i className={"fas fa-truck-pickup"}/> */}
          <img src={NurseGroup}/>
        </div>
        <h3>Service Heading</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
          consequatur necessitatibus eaque.
        </p>
      </div>
    </div>
    <div className={SerVStyle.column}>
      <div className={SerVStyle.card}>
        <div className={SerVStyle.icon_wrapper}>
          {/* <i className={"fas fa-broom"}/> */}
          <img src={NurseGroup}/>
        </div>
        <h3>Service Heading</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
          consequatur necessitatibus eaque.
        </p>
      </div>
    </div>
    <div className={SerVStyle.column}>
      <div className={SerVStyle.card}>
        <div className={SerVStyle.icon_wrapper}>
          {/* <i className={"fas fa-plug"}/> */}
          <img src={NurseGroup}/>
        </div>
        <h3>Service Heading</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
          consequatur necessitatibus eaque.
        </p>
      </div>
    </div>
  </div>
</section>
  )
}

export default Services