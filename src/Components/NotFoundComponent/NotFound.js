import React from 'react'
import NotFoundStyles from './notFound.module.css'

function NotFound() {
  return (
    <div className={NotFoundStyles['ParentNotFound']}> 
        <section className={NotFoundStyles["page_404"]}>
  <div className="container">
    <div className="row">	
      <div className="col-sm-12">
        <div className="col-sm-10 col-sm-offset-1 text-center">
          <div className={NotFoundStyles["four_zero_four_bg"]}>
            <h1 className="text-center">404</h1>
          </div>
          <div className={NotFoundStyles["contant_box_404"]}>
            <h3 className={NotFoundStyles["h2"]}>
             .. شئ ما خطأ قد حدث ، يبدو أنه تم حظرك من الموقع بسبب انتهاكك لشروط و أحكام الخدمة
             <br/> : إذا كنت تعتقد وجود خطأ ما أو سوء فهم ، فيمكنك التواصل مع فريق الدعم من خلال البريد الإلكتروني الآتي
            </h3>
            <p>Nursique@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  </div>
        </section>
    </div>
  )
}

export default NotFound