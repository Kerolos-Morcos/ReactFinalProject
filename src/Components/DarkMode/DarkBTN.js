import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import ScrollStyle from "./darkBtn.module.css";

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    if (newDarkMode) {
        localStorage.setItem("isDarkMode", JSON.stringify(newDarkMode));
      } else {
        localStorage.removeItem("isDarkMode");
      }
};

  useEffect(() => {
    const storedDarkMode = JSON.parse(localStorage.getItem("isDarkMode"));
    if (storedDarkMode !== null) {
      setIsDarkMode(storedDarkMode);
    }
  }, []);

  useEffect(() => {
 
    document.body.classList.toggle(ScrollStyle["dark-mode"], isDarkMode);
    document.querySelector("nav")?.classList.toggle(ScrollStyle["dark-mode"], isDarkMode);
    // document.querySelector("section")?.classList.toggle(ScrollStyle["dark-mode"], isDarkMode);
    document.querySelector("footer")?.classList.toggle(ScrollStyle["dark-mode"], isDarkMode);
    document.querySelector("#heroSection")?.classList.toggle(ScrollStyle["heroSection"], isDarkMode);
    document.querySelector("#social")?.classList.toggle(ScrollStyle["social"], isDarkMode);
    document.querySelector("#offcanvasNavbar")?.classList.toggle(ScrollStyle["offcanvasNavbar"], isDarkMode);
    document.querySelector("#Services")?.classList.toggle(ScrollStyle["Services"], isDarkMode);
    document.querySelector("#EveryWhere")?.classList.toggle(ScrollStyle["everyWhere_EveryWhere"], isDarkMode);
    document.querySelector("#TopRated")?.classList.toggle(ScrollStyle["TopRated"], isDarkMode);
    document.querySelector("#contact")?.classList.toggle(ScrollStyle["contact"], isDarkMode);
    document.querySelector("#post")?.classList.toggle(ScrollStyle["post"], isDarkMode);
    document.querySelector("#main")?.classList.toggle(ScrollStyle["main"], isDarkMode);
    document.querySelector("#NurseSidebar")?.classList.toggle(ScrollStyle["NurseSidebar"], isDarkMode);
    
    // Devices Page
    document.querySelector("#Device")?.classList.toggle(ScrollStyle["sidebarFilterSearch"], isDarkMode);
    document.querySelector("#sidebarFilterSearch")?.classList.toggle(ScrollStyle["sidebarFilterSearch"], isDarkMode);
    document.querySelector("#DeviceCard")?.classList.toggle(ScrollStyle["sidebarFilterSearch"], isDarkMode);
    document.querySelector("#offcanvasRight")?.classList.toggle(ScrollStyle["offcanvasRight"], isDarkMode);
    // Devices Page

    // Device Details Page
    document.querySelector("#DeviceDetails")?.classList.toggle(ScrollStyle["DeviceDetails"], isDarkMode);
    document.querySelector("#productPrice")?.classList.toggle(ScrollStyle["productPrice"], isDarkMode);
    document.querySelector("#DeviceDetailing")?.classList.toggle(ScrollStyle["DeviceDetailing"], isDarkMode);
    // Device Details Page

    // Cart Page
    document.querySelector("#CartComp")?.classList.toggle(ScrollStyle["CartComp"], isDarkMode);
    document.querySelector("#CartSummary")?.classList.toggle(ScrollStyle["CartSummary"], isDarkMode);
    // Cart Page
    
    // Checkout Page
    document.querySelector("#CheckOutPage")?.classList.toggle(ScrollStyle["CheckOutPage"], isDarkMode);
    document.querySelector("#CheckoutElementsTitle")?.classList.toggle(ScrollStyle["CheckoutElementsTitle"], isDarkMode);
    document.querySelector("#CheckOutInfo")?.classList.toggle(ScrollStyle["CheckOutInfo"], isDarkMode);
    // Checkout Page
    
    // Patient Profile Page
    document.querySelector("#PatientPage")?.classList.toggle(ScrollStyle["PatientPage"], isDarkMode);
    // Patient Profile Page
    
    // Articles Page
    document.querySelector("#ArticlesPage")?.classList.toggle(ScrollStyle["ArticlesPage"], isDarkMode);
    // Articles Page

    // Nurse Profile Page
    document.querySelector("#MainProfileBackground")?.classList.toggle(ScrollStyle["MainProfileBackground"], isDarkMode);
    document.querySelector("#MainProfile")?.classList.toggle(ScrollStyle["MainProfile"], isDarkMode);
    document.querySelector("#NurseName")?.classList.toggle(ScrollStyle["NurseName"], isDarkMode);
    document.querySelector("#NurseCounter")?.classList.toggle(ScrollStyle["NurseCounter"], isDarkMode);
    document.querySelector("#NurseCounterFastService")?.classList.toggle(ScrollStyle["NurseCounter"], isDarkMode);
    document.querySelector("#NurseCounterHomeShift")?.classList.toggle(ScrollStyle["NurseCounter"], isDarkMode);
    document.querySelector("#NurseResumeHeadings")?.classList.toggle(ScrollStyle["NurseResumeHeadings"], isDarkMode);
    document.querySelector("#resume")?.classList.toggle(ScrollStyle["resume"], isDarkMode);
    // Nurse Profile Page
    
    // Show Nurse Profile Page
    document.querySelector("#MainShowProfileBackground")?.classList.toggle(ScrollStyle["MainProfileBackground"], isDarkMode);
    document.querySelector("#MainShowProfile")?.classList.toggle(ScrollStyle["MainProfile"], isDarkMode);
    document.querySelector("#ShowNurseName")?.classList.toggle(ScrollStyle["NurseName"], isDarkMode);
    document.querySelector("#ShowNurseCounter")?.classList.toggle(ScrollStyle["NurseCounter"], isDarkMode);
    document.querySelector("#ShowNurseCounterFastService")?.classList.toggle(ScrollStyle["NurseCounter"], isDarkMode);
    document.querySelector("#ShowNurseCounterHomeShift")?.classList.toggle(ScrollStyle["NurseCounter"], isDarkMode);
    document.querySelector("#ShowNurseResumeHeadings")?.classList.toggle(ScrollStyle["NurseResumeHeadings"], isDarkMode);
    // Show Nurse Profile Page

    // About
    document.querySelector("#AboutHero")?.classList.toggle(ScrollStyle["AboutHero"], isDarkMode);
    document.querySelector("#AboutWork")?.classList.toggle(ScrollStyle["AboutWork"], isDarkMode);
    document.querySelector("#AboutWorkCardOne")?.classList.toggle(ScrollStyle["AboutWorkCardOne"], isDarkMode);
    document.querySelector("#AboutWorkCardTwo")?.classList.toggle(ScrollStyle["AboutWorkCardOne"], isDarkMode);
    document.querySelector("#AboutWorkCardThree")?.classList.toggle(ScrollStyle["AboutWorkCardOne"], isDarkMode);
    document.querySelector("#AboutOurServices")?.classList.toggle(ScrollStyle["AboutOurServices"], isDarkMode);
    document.querySelector("#AboutOurServicesCard")?.classList.toggle(ScrollStyle["AboutOurServicesCard"], isDarkMode);
    document.querySelector("#AboutOurServicesCardTwo")?.classList.toggle(ScrollStyle["AboutOurServicesCard"], isDarkMode);
    document.querySelector("#AboutOurServicesCardThree")?.classList.toggle(ScrollStyle["AboutOurServicesCard"], isDarkMode);
    document.querySelector("#AboutOurServicesCardFour")?.classList.toggle(ScrollStyle["AboutOurServicesCard"], isDarkMode);
    document.querySelector("#AboutOurServicesCardFive")?.classList.toggle(ScrollStyle["AboutOurServicesCard"], isDarkMode);
    document.querySelector("#AboutOurServicesCardSix")?.classList.toggle(ScrollStyle["AboutOurServicesCard"], isDarkMode);
    // About
 
 

}, [isDarkMode]);


  return (
    <div
      className={`${ScrollStyle.top_to_btm} ${isDarkMode ? ScrollStyle.dark : ""}`}
      onClick={handleToggle}
    >
      <div className={ScrollStyle.icon_wrapper}>
        <FaSun
          className={`${ScrollStyle.icon_position} ${
            ScrollStyle.icon_style
          } ${isDarkMode ? ScrollStyle.fade_out : ScrollStyle.fade_in}`}
        />
        <FaMoon
          className={`${ScrollStyle.icon_position} ${
            ScrollStyle.icon_style
          } ${isDarkMode ? ScrollStyle.fade_in : ScrollStyle.fade_out}`}
        />
      </div>
    </div>
  );
};

export default DarkMode;
