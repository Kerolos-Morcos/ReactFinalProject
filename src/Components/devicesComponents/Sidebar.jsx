import React, { useState } from 'react'
import side from './sidebar.module.css'
import app from './app.module.css'
import { useDispatch } from 'react-redux'
import { search, departmentFilter, filterSubmit, filterCancel, evaluteFilter } from '../../Redux/Slices/DeviceSlice'
import DarkStyle from '../DarkMode/darkBtn.module.css'
import { useEffect } from 'react'

function Sidebar() {
    const dispatch = useDispatch()
    function searching(e) {
        dispatch(search(e.target.value));
        // window.scrollTo(0, 600)
    }

    // const [box, setBox] = useState()
    function check(e) {
        // let num = e.target.name;
        if (e.target.checked === true) {
            dispatch(departmentFilter({ name: e.target.name, checks: e.target.checked }))
        }
        else if (e.target.checked === false) {
            dispatch(departmentFilter({ name: e.target.name, checks: e.target.checked }))
        };
    }

    function compare(e) {
        if (e.target.checked === true) {
            dispatch(evaluteFilter({ name: e.target.name, statuss: e.target.checked }))
            // console.log(e.target.name);
        }
        else if (e.target.checked === false) {
            dispatch(evaluteFilter({ name: e.target.name, statuss: e.target.checked }))
        }
    }

    const [active, setActive] = useState("submit")
    function submit(name) {
        dispatch(filterSubmit())
        setActive(name)
    }
    function cancel(name) {
        dispatch(filterCancel())
        setActive(name)
    }

    useEffect(()=>{
        const isDarkMode = localStorage.getItem("isDarkMode");
        if (isDarkMode) {
            document.querySelector("#sidebarFilterSearch")?.classList.toggle(DarkStyle["sidebarFilterSearch"], isDarkMode);
            document.querySelector("#offcanvasRight")?.classList.toggle(DarkStyle["offcanvasRight"], isDarkMode);
        }
    },[])

    return (
        <>
            {/* filter */}
            <div id='sidebarFilterSearch' className={`${side.sidebar} ${"d-flex justify-content-between align-items-center"}`}>
                <div className={`${side.group} ${"ms-5"}`}>
                    <svg className={side.icon} aria-hidden="true" viewBox="0 0 24 24">
                        <g>
                            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                        </g>
                    </svg>
                    <input placeholder="Search . . ." type="search" className={side.input} onChange={searching} />
                </div>
                <div className={`${"me-5"} ${side.burgerMenu}`}>
                    <button
                        className={"btn btn-primary"}
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight"
                    >
                        <i class="fa-solid fa-bars" />
                    </button>
                </div>
                <div
                    className={`${"offcanvas offcanvas-end"} ${side.offcanvas}`}
                    tabIndex={-1}
                    id="offcanvasRight"
                    aria-labelledby="offcanvasRightLabel"
                >
                    <div className={`${"offcanvas-header"} ${side['offcanvas-header']} `}>
                        <button
                            type="button"
                            className={`${"btn-close text-reset"} ${side.btn_close}`}
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                        />
                        <h2 id="offcanvasRightLabel">التصنيف</h2>
                    </div>
                    <div className={`${"offcanvas-body"} ${side.offcanvas_body}`}>
                        <div className={"d-flex mb-5"}>
                            <button type="submit" className={`${side.can__btn1} ${"w-50 py-1"}`} onClick={() => submit("submit")}
                                style={{
                                    backgroundColor: active === 'submit' ? '#00A02B' : 'white',
                                    color: active === 'submit' ? 'white' : 'green'
                                }}>
                                تنفيذ
                            </button>
                            <button type="reset" className={`${side.can__btn2} ${"w-50"}`} onClick={() => cancel("cancel")}
                                style={{
                                    backgroundColor: active === 'cancel' ? '#00A02B' : 'white',
                                    color: active === 'cancel' ? 'white' : 'green'
                                }}>
                                إلغاء
                            </button>
                        </div>
                        {/* العروض والخصومات */}
                        <div sty className={`${side.filter__one} ${"mb-4"}`}>
                            <h3 className={side.heads}>القسم</h3>
                            <input type="checkbox" name="عظام" id="dep1" className={"ms-2 mb-3"} onChange={compare} />
                            <label htmlFor="dep1">عظام</label>
                            <br />
                            <input type="checkbox" name="أمراض القلب" id="dep2" className={"ms-2 mb-3"} onChange={compare} />
                            <label htmlFor="dep2" >أمراض القلب</label>
                            <br />
                            <input type="checkbox" name="أمراض أخرى" id="dep3" className={"ms-2 mb-3"} onChange={compare} />
                            <label htmlFor="dep3" >أمراض أخرى</label>
                        </div>
                        <div className={`${side.filter__two} ${"mb-4"}`}>
                            <h3 className={side.heads}>التقييم</h3>
                            <input type="checkbox" name="5" id="eval5" className={"ms-2 mb-3"} onChange={check} style={{backgroundColor: "green"}}/>
                            <label htmlFor="eval5">
                                <i className={`${"fa-sharp fa-solid fa-star"} ${side.fa_star}`} />
                                <i className={`${"fa-sharp fa-solid fa-star"} ${side.fa_star}`} />
                                <i className={`${"fa-sharp fa-solid fa-star"} ${side.fa_star}`} />
                                <i className={`${"fa-sharp fa-solid fa-star"} ${side.fa_star}`} />
                                <i className={`${"fa-sharp fa-solid fa-star"} ${side.fa_star}`} />
                            </label>
                            <br />
                            <input type="checkbox" name="4" id="eval4" className={"ms-2 mb-3"} onChange={check} />
                            <label htmlFor="eval4">
                                <i className={`${"fa-sharp fa-solid fa-star"} ${side.fa_star}`} />
                                <i className={`${"fa-sharp fa-solid fa-star"} ${side.fa_star}`} />
                                <i className={`${"fa-sharp fa-solid fa-star"} ${side.fa_star}`} />
                                <i className={`${"fa-sharp fa-solid fa-star"} ${side.fa_star}`} />
                            </label>
                            <br />
                            <input type="checkbox" name="3" id="eval3" className={"ms-2 mb-3"} onChange={check} />
                            <label htmlFor="eval3">
                                <i className={`${"fa-sharp fa-solid fa-star"} ${side.fa_star}`} />
                                <i className={`${"fa-sharp fa-solid fa-star"} ${side.fa_star}`} />
                                <i className={`${"fa-sharp fa-solid fa-star"} ${side.fa_star}`} />
                            </label>
                            <br />
                            <input type="checkbox" name="2" id="eval2" className={"ms-2 mb-3"} onChange={check} />
                            <label htmlFor="eval2">
                                <i className={`${"fa-sharp fa-solid fa-star"} ${side.fa_star}`} />
                                <i className={`${"fa-sharp fa-solid fa-star"} ${side.fa_star}`} />
                            </label>
                            <br />
                            <input type="checkbox" name="1" id="eval1" className={"ms-2 mb-3"} onChange={check} />
                            <label htmlFor="eval1">
                                <i className={`${"fa-sharp fa-solid fa-star"} ${side.fa_star}`} />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            {/* end filter */}
        </>
    )
}

export default Sidebar