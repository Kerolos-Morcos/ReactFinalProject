import React, { useEffect } from 'react'
import SerVStyle from './services.module.css'
// SVGs
import SaveMoney from '../../../assets/images/new/aboutImgs/Wallet-cuate.svg'
import NurseGroup from '../../../assets/images/new/aboutImgs/Health professional team-amico.svg'
import FastServ from '../../../assets/images/Fast loading-rafiki.svg'
import LongShift from '../../../assets/images/time flies-rafiki.svg'
import MedInfo from '../../../assets/images/Privacy policy-pana.svg'
import BestOffer from '../../../assets/images/Upvote-pana.svg'
import MedicalDevice from '../../../assets/images/Oncology patient-bro.svg'
import DarkStyle from '../../DarkMode/darkBtn.module.css'

function Services() {
  useEffect(() => {
    const isDarkMode = localStorage.getItem("isDarkMode");
    if (isDarkMode) {
      document.querySelector("#Services")?.classList.toggle(DarkStyle["Services"], isDarkMode);
    }
  }, []);
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
        <h3 className='pt-2'>أسعار في متناول اليد</h3>
        <p>
        نؤمن بأن الحصول على منتجات وخدمات عالية الجودة لا يجب أن يكون مكلفًا للغاية. لذا، نقدم لك خيارًا رائعًا بأسعار في متناول اليد، حيث تتمتع بأسعار معقولة ومنافسة.
        </p>
      </div>
    </div>
    <div className={SerVStyle.column}>
      <div className={SerVStyle.card}>
        <div className={SerVStyle.icon_wrapper}>
          {/* <i className={"fas fa-brush"}/> */}
          <img src={LongShift}/>
        </div>
        <h3 className='pt-2'>شيفت طويل</h3>
        <p>
        يمكنك الاستفادة من جدول عمل مرن يتناسب مع احتياجاتك الخاصة. سواء كنت تحتاج إلى خدمة في الأوقات المتأخرة، أو نهارًا، فإننا هنا لتوفير الدعم اللازم.
        </p>
      </div>
    </div>
    <div className={SerVStyle.column}>
      <div className={SerVStyle.card}>
        <div className={SerVStyle.icon_wrapper}>
          {/* <i className={"fas fa-wrench"}/> */}
          <img src={FastServ}/>
        </div>
        <h3 className='pt-2'> خدمة سريعة </h3>
        <p>
        في شركتنا، ندرك قيمة الوقت وأهمية توفير خدمة سريعة وفعالة. ولهذا السبب، نفخر بتقديم خدمتنا الممتازة والسريعة لتلبية احتياجاتك بسرعة وكفاءة.
        </p>
      </div>
    </div>
    <div className={SerVStyle.column}>
      <div className={SerVStyle.card}>
        <div className={SerVStyle.icon_wrapper}>
          {/* <i className={"fas fa-truck-pickup"}/> */}
          <img src={MedicalDevice}/>
        </div>
        <h3 className='pt-2'>تأجير جهاز طبي </h3>
        <p>
        نحن نوفر مجموعة واسعة من الأجهزة الطبية المتوفرة للتأجير، بما في ذلك أجهزة الفحص الطبي وأجهزة الرعاية المنزلية، جميع الأجهزة التي نوفرها مراقبة بدقة ومعتمدة من قبل المختصين.
        </p>
      </div>
    </div>
    <div className={SerVStyle.column}>
      <div className={SerVStyle.card}>
        <div className={SerVStyle.icon_wrapper}>
          {/* <i className={"fas fa-broom"}/> */}
          <img src={BestOffer}/>
        </div>
        <h3 className='pt-2'>أفضل عرض</h3>
        <p>
        نحن نضمن لك تجربة رائعة وقيمة معنا، فريقنا المحترف والمتفاني مستعد لتقديم الدعم لك في اختيار العرض المثالي الذي يلبي متطلباتك ويناسب ميزانيتك.
        </p>
      </div>
    </div>
    <div className={SerVStyle.column}>
      <div className={SerVStyle.card}>
        <div className={SerVStyle.icon_wrapper}>
          {/* <i className={"fas fa-plug"}/> */}
          <img src={MedInfo}/>
        </div>
        <h3 className='pt-2'>معلومات طبية</h3>
        <p>
        سواء كنت ترغب في فهم مفاهيم طبية أساسية، أو الحصول على نصائح صحية، أو تحديثات حول أحدث الاكتشافات الطبية، فإننا نقدم لك المعلومات التي تحتاجها.
        </p>
      </div>
    </div>
  </div>
</section>
  )
}

export default Services