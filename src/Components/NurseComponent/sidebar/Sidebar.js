import sidebarStyle from "./Sidebar.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { search, filter, getAllNurses } from "../../../Redux/Slices/NurseSlice";
import DarkStyle from '../../DarkMode/darkBtn.module.css'


export default function Sidebar() {
  ////////////////////search with nurse name/////////////////////////////
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllNurses());
      const isDarkMode = localStorage.getItem("isDarkMode");
      if (isDarkMode) {
        document.querySelector("#NurseSidebar")?.classList.toggle(DarkStyle["NurseSidebar"], isDarkMode);
      }
  }, []);
  function searching(e) {
    dispatch(search(e.target.value));
  }
  function filtering(filterValue) {
    dispatch(filter(filterValue));
  }

  let schema = Yup.object().shape({
    rates: Yup.number().required("Rate is required"),
    gender: Yup.string().required("gender is required"),
    region: Yup.string().required("Region is required"),
  });
  const formik = useFormik({
    initialValues: {
      rates: "",
      region: "",
      gender: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);

      axios.post("http://localhost:3500/nurse/filter", values).then((res) => {
        filtering(res.data.data);
        console.log(res.data.data);
        // if (res.data.success === true) {
        //   alert(res.data.message);
        // } else {
        //   alert(res.data.message);
        // }
      });
    },
  });
  return (
    <aside  dir="rtl">
      <div id="NurseSidebar" className={sidebarStyle.filter}>
        <h1>نتائج البحث</h1>
        <div className={`${"input-group"} ${"mb-3"} ${sidebarStyle.searchbar}`}>
          <input
            type="text"
            className={"form-control"}
            placeholder=""
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            onChange={searching}
          ></input>

          <button
            className={`${"btn"} ${"btn-outline-secondary"} ${
              sidebarStyle["btn-outline-secondary"]
            } `}
            type="button"
            id="button-addon2"
          >
            <i className={"fa-solid fa fa-keyboard"}></i>
          </button>
        </div>
        <hr />
        <form
          action=""
          className={sidebarStyle["form-main"]}
          onSubmit={formik.handleSubmit}
        >
          <div className={sidebarStyle["filter__content"]}>
            <div
              className={`${"form-field-content"} ${
                sidebarStyle["form-field-content"]
              } `}
            >
              <label htmlFor="">التقييم</label>
              <select className="" onChange={formik.handleChange} name="rates">
                <option selected>-اختر التقييم-</option>
                <option value={5}>5.0+</option>
                <option value={4}>4.0+</option>
                <option value={3}>3.0+</option>
                <option value={2}>2.0+</option>
                <option value={1}>1.0+</option>
                {/* <option value={0}>0</option> */}
              </select>
            </div>
            <hr />
            <div
              className={`${"form-field-content"} ${
                sidebarStyle["form-field-content"]
              } `}
            >
              <label htmlFor="">الموقع</label>
              <select
                className={`${sidebarStyle.options}`}
                selected
                name="region"
                onChange={formik.handleChange}
              >
                <option>اختر الموقع</option>
                <option value="السيل">السيل</option>
                <option value="التأمين">التأمين</option>
                <option value="كيما">كيما</option>
                <option value="المحطة">المحطة</option>
              </select>
            </div>
            <hr />
            <div className={"form-field-content"}>
              <label htmlFor="">النوع</label>
              <div className={sidebarStyle["check-g"]}>
                <div
                  className={`${"form-check"} ${sidebarStyle["form-check"]}`}
                >
                  <label
                    className={"form-check-html"}
                    htmlFor="flexRadioDefault1"
                  >
                    <input
                      className={"form-check-input"}
                      type="radio"
                      name="gender"
                      id="flexRadioDefault1"
                      onChange={formik.handleChange}
                      value="male"
                    />
                    ذكر
                  </label>
                </div>
                <div
                  className={`${"form-check"} ${sidebarStyle["form-check"]}`}
                >
                  <label
                    className={"form-check-label"}
                    htmlFor="flexRadioDefault2"
                  >
                    <input
                      className={"form-check-input"}
                      type="radio"
                      name="gender"
                      id="flexRadioDefault2"
                      onChange={formik.handleChange}
                      value="female"
                    />
                    أنثى
                  </label>
                </div>
              </div>
            </div>
            <hr />
            <div className={sidebarStyle["bt-cnt"]}>
              <button className={sidebarStyle.apply} type="submit">
                تطبيق
                {/* <a href="" >تطبيق</a> */}
              </button>
            </div>
          </div>
        </form>
              <button
                className={sidebarStyle.clear}
                onClick={() => dispatch(getAllNurses())}
              >
                مسح البحث
                 {/* <a href="" >مسح البحث</a> */}
              </button>
      </div>
    </aside>
  );
}