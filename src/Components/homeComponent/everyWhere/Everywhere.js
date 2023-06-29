import React, { useEffect } from "react";
import EveryStyle from "./everyWhere.module.css";
import everyVideo from "./APenbykerolos.webm";
import DarkStyle from '../../DarkMode/darkBtn.module.css'

function Everywhere() {
  useEffect(() => {
    const isDarkMode = localStorage.getItem("isDarkMode");
    if (isDarkMode) {
      document.querySelector("#EveryWhere")?.classList.toggle(DarkStyle["everyWhere_EveryWhere"], isDarkMode);
    }
  }, []);
  return (
    <section className={EveryStyle.EveryWhere} id="EveryWhere">
      <div className={"container"}>
        <div className={EveryStyle.EveryWhere__Parent}>
        <div className={EveryStyle.EveryWhere__Text}>
          <h2>
            يمكننا الوصول لجميع عملائنا في مختلف أنحاء المحافظة
          </h2>
          <p>
            يحظي عملاؤنا بوجود فريق عمل متخصص في تقديم الدعم الفني اللازم ، فيتم توفير وسائل الاتصال المختلفة لتلبية احتياجات عملائنا من أجهزة طبية ، حيث يتم ايصال الجهاز المطلوب الي منزل صاحب الطلب في أسرع وقت ممكن و بأقل تكلفة
          </p>
          <video
          className={EveryStyle.MapVideo}
            src={everyVideo}
            autoPlay
            muted
            loop
          ></video>
        </div>
        <div className={EveryStyle.NumS}>
          <div>
            <p> 107 </p>
            <h4> عدد القُرى المحيطة </h4>
          </div>
          <div>
            <p> 5 </p>
            <h4> عدد مراكز أسوان </h4>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

export default Everywhere;
