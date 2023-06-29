import React, { useEffect } from 'react'
import ArtStyle from './medArtical.module.css'
import {motion} from 'framer-motion'
import DarkStyle from '../DarkMode/darkBtn.module.css'
import Slide from 'react-reveal/Slide'


function MedArtical() {
  useEffect(()=>{
    const isDarkMode = localStorage.getItem("isDarkMode");
    if(isDarkMode){
      document.querySelector("#ArticlesPage")?.classList.toggle(DarkStyle["ArticlesPage"], isDarkMode);
    }
  },[])
  return (
<motion.div id='ArticlesPage' className={ArtStyle.Margins}
initial={ {opacity: 0 }}
animate={{ opacity: 1 }}
exit={ {opacity: 0 }}
variants={{duration: 0.2}}
transition={{yoyo: Infinity}}
style={{overflow: 'hidden'}}
>
  <div className="container">
<div className='row'>

<Slide left distance="10%" duration={1500}>
<div className={`${ArtStyle["card"]}`}>
      <figure className={`${ArtStyle["card__thumb"]}`}>
        <img
          src="https://www.shorouknews.com/uploadedimages/Other/original/SDFWESDFZVESWRWER.jpg"
          alt="Picture by Daniel Lincoln"
          className={`${ArtStyle["card__image"]}`}
        />
        <figcaption className={`${ArtStyle["card__caption"]}`}>
          <h2 className={`${ArtStyle["card__title"]}`}>تسليم المعلومات الصحية و الحيوية بين الممرضين</h2>
          <p className={`${ArtStyle["card__snippet"]}`}>
 يعد تبادل المعلومات الدقيقة والشاملة بين الممرضين أمرًا حاسمًا لتوفير رعاية آمنة وفعالة للمرضى. يشمل تسليم المعلومات نقل المعلومات المرتبطة بحالة المريض وتفاصيل الرعاية السابقة و خلافه  </p>
        </figcaption>
      </figure>
    </div>
    </Slide>
    
    <Slide top distance="10%" duration={1500}>
    <div className={`${ArtStyle["card"]}`}>
      <figure className={`${ArtStyle["card__thumb"]}`}>
        <img
          src="https://www.emro.who.int/images/stories/egypt/egyptian-doctor-survives-covid.jpg"
          alt="Picture by Daniel Lincoln"
          className={`${ArtStyle["card__image"]}`}
        />
        <figcaption className={`${ArtStyle["card__caption"]}`}>
          <h2 className={`${ArtStyle["card__title"]}`}>الأخلاقيات والاحترافية في التمريض</h2>
          <p className={`${ArtStyle["card__snippet"]}`}>
          السرية والخصوصية يجب أن يحترم الممرضون خصوصية المرضى ومعلوماتهم الشخصية وأن تحافظ على سرية المعلومات الطبية.
          </p>
        </figcaption>
      </figure>
    </div>
    </Slide>

<Slide bottom distance="10%" duration={1500}>
    <div className={`${ArtStyle["card"]}`}>
      <figure className={`${ArtStyle["card__thumb"]}`}>
        <img
          src="https://gate.ahram.org.eg/Media/Massai/News///19-2022-637770629137781140-778.jpeg"
          alt="Picture by Daniel Lincoln"
          className={`${ArtStyle["card__image"]}`}
        />
        <figcaption className={`${ArtStyle["card__caption"]}`}>
          <h2 className={`${ArtStyle["card__title"]}`}>القيادة والإدارة والتحفيز في التمريض</h2>
          <p className={`${ArtStyle["card__snippet"]}`}>
           يشمل دور الممرضين القادة تحفيز وتوجيه فرق الرعاية الصحية وتشجيع التعاون وبناء الثقة. يساهمون في تطوير استراتيجيات لتحسين جودة الرعاية وتعزيز الابتكار وتحقيق النتائج المرضية المرجوة</p>
        </figcaption>
      </figure>
    </div>
    </Slide>

<Slide right distance="10%" duration={1500}>
    <div className={`${ArtStyle["card"]}`}>
      <figure className={`${ArtStyle["card__thumb"]}`}>
        <img
          src="https://m.gomhuriaonline.com/Upload/News/7-6-2022_11_08_15_GomhuriaOnline_361654592895.jpg"
          alt="Picture by Daniel Lincoln"
          className={`${ArtStyle["card__image"]}`}
        />
        <figcaption className={`${ArtStyle["card__caption"]}`}>
          <h2 className={`${ArtStyle["card__title"]}`}>دور الممرضين في تعزيز صحة مرضاهم</h2>
          <p className={`${ArtStyle["card__snippet"]}`}>
            تثقيف المرضى وتوجيههم:
يعزز الممرضون صحة المرضى من خلال توفير المعلومات الصحية وتوجيههم بشأن العناية الذاتية. يقومون بشرح الحالة الصحية للمرضى والإجراءات الطبية المتوقعة وتأثيرها على صحتهم</p>
        </figcaption>
      </figure>
    </div>
    </Slide>

    <Slide left distance="10%" duration={1500}>
    <div className={`${ArtStyle["card"]}`}>
      <figure className={`${ArtStyle["card__thumb"]}`}>
        <img
          src="https://www.albayan.ae/polopoly_fs/1.3083433.1509316849!/image/image.jpg"
          alt="Picture by Daniel Lincoln"
          className={`${ArtStyle["card__image"]}`}
        />
        <figcaption className={`${ArtStyle["card__caption"]}`}>
          <h2 className={`${ArtStyle["card__title"]}`}>إدارة الألم لدي المرضى في ممارسة التمريض</h2>
          <p className={`${ArtStyle["card__snippet"]}`}>
          يبدأ دور الممرضين في إدارة الألم بتقييم الألم لدى المريض بشكل دقيق. يتضمن ذلك تقييم شدة الألم وموقعه والعوامل التي تؤثر عليه
          </p>
        </figcaption>
      </figure>
    </div>
    </Slide>

    <Slide top distance="10%" duration={1500}>
    <div className={`${ArtStyle["card"]}`}>
      <figure className={`${ArtStyle["card__thumb"]}`}>
        <img
          src="https://img.youm7.com/ArticleImgs/2019/4/24/78866-%D8%A7%D9%84%D9%81%D8%B1%D9%8A%D9%82-%D8%A7%D9%84%D8%B7%D8%A8%D9%8A.jpg"
          alt="Picture by Daniel Lincoln"
          className={`${ArtStyle["card__image"]}`}
        />
        <figcaption className={`${ArtStyle["card__caption"]}`}>
          <h2 className={`${ArtStyle["card__title"]}`}>سلامة المرضى في ممارسة التمريض</h2>
          <p className={`${ArtStyle["card__snippet"]}`}>
          تقييم المخاطر والوقاية من الحوادث:
يقوم الممرضون بتقييم المخاطر المحتملة للمرضى وتحديد الاحتياطات اللازمة لتجنب الحوادث. يشمل ذلك تقديم الإرشادات حول السلامة الشخصية والوقاية من السقوط والإصابات
          </p>
        </figcaption>
      </figure>
    </div>
    </Slide>

    <Slide bottom distance="10%" duration={1500}>
    <div className={`${ArtStyle["card"]}`}>
      <figure className={`${ArtStyle["card__thumb"]}`}>
        <img
          src="https://e1.pxfuel.com/desktop-wallpaper/397/559/desktop-wallpaper-grey-s-aesthetics-medicine-aesthetic.jpg"
          alt="Picture by Daniel Lincoln"
          className={`${ArtStyle["card__image"]}`}
        />
        <figcaption className={`${ArtStyle["card__caption"]}`}>
          <h2 className={`${ArtStyle["card__title"]}`}>البحث في التمريض والممارسة القائمة على الأدلة</h2>
          <p className={`${ArtStyle["card__snippet"]}`}>
          يساعد البحث في التمريض على تزويد الممرضات بالمعرفة والمهارات اللازمة لفهم أفضل لممارسات التمريض وتحسين الرعاية. كما يساهم البحث في تطوير تقنيات وأدوات جديدة في التمريض وتحسين الرعاية المقدمة.
          </p>
        </figcaption>
      </figure>
    </div>
    </Slide>

    <Slide right distance="10%" duration={1500}>
    <div className={`${ArtStyle["card"]}`}>
      <figure className={`${ArtStyle["card__thumb"]}`}>
        <img
          src="https://www.ehs.gov.ae/app_themes/fg21001/images/pfac-1.png"
          alt="Picture by Nathan Dumlao"
          className={`${ArtStyle["card__image"]}`}
        />
        <figcaption className={`${ArtStyle["card__caption"]}`}>
          <h2 className={`${ArtStyle["card__title"]}`}> التواصل الفعال في التمريض مع المرضى</h2>
          <p className={`${ArtStyle["card__snippet"]}`}>
          ستوجهك الخطوات التالية المتعلقة بالتواصل اللفظي مثل التحدث والاستماع والتواصل غير اللفظي مثل لغة الجسد والإيماءات والتعاطف في التمريض في تكوين علاقة جديرة بالثقة مع مريضك
          </p>
        </figcaption>
      </figure>
    </div>
    </Slide>


    </div>
  </div>


</motion.div>


  )
}

export default MedArtical