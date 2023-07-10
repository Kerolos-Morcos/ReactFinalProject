import React, { useEffect, useState } from "react";
import NavStyle from "./Navbarcomponent.module.css";
import Logo from "../../assets/images/Navbar__Logo.png";
import { NavLink, Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

import CartComponent from "../Cart/Cart";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import axios from "axios";

// SOCKET IO
function Navbar({ Socket }) {
  let token;
  const [notifications, setNotifications] = useState([]);
  const [notificationChat, setNotificationChat] = useState([]);
  const [notificationBook, setNotificationBook] = useState([]);

  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState("");
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [userRole, setUserRole] = useState("");

  function handleLogout() {
    localStorage.removeItem("user");
    // localStorage.removeItem("token");
    localStorage.removeItem("isDarkMode");
    localStorage.removeItem("CartTotalPrice");
    localStorage.removeItem("CartTotalQuantity");
    localStorage.removeItem("hasVisitedBefore");
    setIsLoggedOut(true);
  }
  const name = JSON.parse(localStorage.getItem("user"));
  const displayNotification = ({ NAME }) => {
    let action = "علَّق علي منشورك";
    return <span className="notification">{`${NAME} ${action}`}</span>;
  };
  useEffect(() => {
    if (isLoggedOut) {
      window.location.href = "/Login";
    }
  }, []);

  useEffect(() => {
    token = JSON.parse(localStorage.getItem("user"));
    if (token) {
      setUsername(token.name.split(" ")[0]);
      setUserRole(token.role);
    }
  }, []);
  useEffect(() => {
    Socket?.on("getNotification", (data) => {
      if (data.patientId == token._id) {
        setNotifications((prevNotifications) => [...prevNotifications, data]);
      }
    });

    Socket?.on("getNotificationBookNurse", (data) => {
      if (data.NurseId == token._id) {
        setNotificationBook((prevNotifications) => {
          const updatedNotifications = [...prevNotifications, data];
          localStorage.setItem(
            "notificationBook",
            JSON.stringify(updatedNotifications)
          );
          return updatedNotifications;
        });
      }
    });

    return () => {
      Socket?.off("getNotification");
      Socket?.off("getNotificationBookNurse");
    };
  }, [Socket]);

  ///to save in the notification in localstorage
  useEffect(() => {
    const storedNotificationBook = JSON.parse(
      localStorage.getItem("notificationBook")
    );
    if (storedNotificationBook) {
      setNotificationBook(storedNotificationBook);
    }
  }, []);

  // Chat
  // Socket?.on("getNotificationChat", (data) => {
  //   // console.log("before",data);
  //   // console.log();
  //   if(data.userId == token._id)
  //   {
  //     // console.log("after",data);
  //     setNotificationChat((prevNotificationsChat) => [...prevNotificationsChat, data]);
  //   }
  // });

  //   return () => {
  //     Socket?.off("getNotification");
  //     Socket?.off("getNotificationBookNurse");
  //   };
  // }, [Socket]);

  // Edited By Hany
  const acceptBooking = async (notification) => {
    console.log("acceptBooking..", notification.bookId);
    await axios
      .put(`http://localhost:3500/book/bookings/${notification.bookId}`, {
        status: "accepted",
      })
      .then((res) => {
        console.log(res.data);
        const updatedNotifications = notificationBook.filter(
          (item) => item._id !== notification._id
        );
        setNotificationBook(updatedNotifications);
        const storedNotificationBook = JSON.parse(
          localStorage.getItem("notificationBook")
        );
        if (storedNotificationBook) {
          const updatedLocalStorage = storedNotificationBook.filter(
            (item) => item._id !== notification._id
          );
          localStorage.setItem(
            "notificationBook",
            JSON.stringify(updatedLocalStorage)
          );
        }
      });
  };
  // End Edited By Hany

  // const acceptBooking= async (id) => {
  //   console.log("acceptBooking..",id);
  //   await axios.put(`http://localhost:3500/book/bookings/${id}`,{
  //     status: "accepted"
  //   }).then((res)=>{
  //     console.log(res.data);
  //   })
  // }
  const refuseBooking = (notification) => {
    const updatedNotifications = notificationBook.filter(
      (item) => item._id !== notification._id
    );
    setNotificationBook(updatedNotifications);
    const storedNotificationBook = JSON.parse(
      localStorage.getItem("notificationBook")
    );
    if (storedNotificationBook) {
      const updatedLocalStorage = storedNotificationBook.filter(
        (item) => item._id !== notification._id
      );
      localStorage.setItem(
        "notificationBook",
        JSON.stringify(updatedLocalStorage)
      );
    }
  };

  // CART BADGE
  const [cartCount, setCartCount] = useState(5);
  const { cart } = useSelector((state) => state.CartSlice);
  const api = "http://localhost:3500/";

  // New From Hany (PostID)
  function handleNotificationClick(notification,index) {
    const postId = notification.postId;
    const commentId = notification.commentId;
    const url = `/Posts/${postId}/${commentId}?scrollTo=${commentId}`;
    window.history.pushState(null, null, url);
    setTimeout(() => {
      const commentEl = document.getElementById(`comment-${commentId}`);
      if (commentEl) {
        document.querySelector("#PostBody").classList.add(NavStyle['blur-effect']);
        commentEl.classList.add(NavStyle["highlighted-comment"]);
        setTimeout(() => {
          document.querySelector('#PostBody').classList.remove(NavStyle['blur-effect']);
          commentEl.classList.remove(NavStyle["highlighted-comment"]);
        }, 2400);
        commentEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 1000);
        setNotifications((prevNotifications) => {
      const updatedNotificationComment = prevNotifications.filter((_, i) => i !== index);
      localStorage.setItem("notificationComment", JSON.stringify(updatedNotificationComment));
      return updatedNotificationComment;
    });
  }

  return (
    <>
      {/* Start Navbar */}
      <nav className={"navbar navbar-expand-lg pb-0"}>
        <div className={"container"}>
          <div className={`${"row"} ${NavStyle.row}`}>
            <div
              className={
                "col-xxl-2 ps-xxl-0 col-xl-3 col-lg-3 col-md-6 col-sm-6"
              }
            >
              <div className={"d-flex align-items-center me-auto"}>
                <figure className={NavStyle.Navbar__Logo}>
                  <NavLink to="/Home" className={"navbar-brand"}>
                    <img src={Logo} />
                  </NavLink>
                </figure>
              </div>
            </div>
            <div
              className={`${
                NavStyle.toggler
              } ${"col-xxl-8 me-xxl-5 col-xl-9 mt-xxl-1 mt-xl-2 mt-lg-1 col-lg-9 col-md-1 col-sm-3 d-flex justify-content-between"}`}
            >
              <button
                className={`${"navbar-toggler"} ${NavStyle.navbar_toggler}`}
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar"
                aria-label="Toggle navigation"
              >
                <span
                  className={`${"navbar-toggler-icon"} ${
                    NavStyle.navbar_toggler_icon
                  }`}
                />
              </button>
              <div
                className={`${
                  NavStyle.offcanvas
                } ${"offcanvas"} ${"offcanvas-end"}`}
                tabIndex={-1}
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
              >
                <div className={"offcanvas-header"}>
                  <figure
                    className={`${"Navbar_Logo"} ${
                      NavStyle.Navbar__Logo_offcanvas
                    } ${"text-center w-100 mt-3"}`}
                  >
                    <NavLink className={"navbar-brand"} to="/Home">
                      <img src={Logo} />
                    </NavLink>
                  </figure>
                  <button
                    type="button"
                    className={"btn-close border-white btn-close-white"}
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  />
                </div>
                <div
                  className={`${"offcanvas-body"} ${NavStyle.offcanvas_body}`}
                >
                  <ul
                    className={`${"navbar-nav col-xxl-9 offset-xxl-0 ms-xl-5 offset-xl-0  mt-xxl-0 col-xl-7 col-lg-8"} ${
                      NavStyle.navbar_nav
                    }`}
                  >
                    <li className={`${"nav-item cont"} ${NavStyle.cont}`}>
                      <NavLink
                        to="/contactUs"
                        className={`${"nav-link"} ${NavStyle.nav_link}`}
                      >
                        تواصل معنا
                      </NavLink>
                    </li>
                    <li className={"nav-item"}>
                      <NavLink
                        to="/Posts"
                        className={`${"nav-link"} ${NavStyle.nav_link}`}
                      >
                        الطلبات
                      </NavLink>
                    </li>
                    <li className={"nav-item"}>
                      <NavLink
                        className={`${"nav-link"} ${NavStyle.nav_link}`}
                        to="/Nurses"
                      >
                        التمريض
                      </NavLink>
                    </li>

                    {userRole === "nurse" ? (
                      <li className={"nav-item"}>
                        <NavLink
                          className={`${"nav-link"} ${NavStyle.nav_link}`}
                          to="/MedicalArticles"
                        >
                          مقالات طبية
                        </NavLink>
                      </li>
                    ) : (
                      <li className={"nav-item"}>
                        <NavLink
                          className={`${"nav-link"} ${NavStyle.nav_link}`}
                          to="/Devices"
                        >
                          الأجهزة الطبية
                        </NavLink>
                      </li>
                    )}

                    <li className={"nav-item"}>
                      <NavLink
                        className={`${"nav-link"} ${NavStyle.nav_link}`}
                        to="/About"
                      >
                        عـــنَّا
                      </NavLink>
                    </li>
                    <li className={"nav-item"}>
                      <NavLink
                        to="/Home"
                        className={`${"nav-link"} ${NavStyle.nav_link}`}
                        aria-current="page"
                      >
                        الرئيسية
                      </NavLink>
                    </li>
                  </ul>
                  {/* Buttons */}
                  <ul
                    className={`{"offset-xxl-0 offset-xl-0 ms-xl-0 col-xxl-4 col-xl-4 col-lg-4 ms-lg-2 ps-lg-0 navbar-nav mt-xxl-0"} ${NavStyle.FlexDir}`}
                  >
                    <li className={"nav-item ms-auto w-100"}>
                      {userRole !== "nurse" && username && (
                        <Link to="/Cart">
                          <i
                            className={`${"fa fa-cart-plus"} ${
                              NavStyle.fa_cart_plus
                            }`}
                          >
                            {cart.length > 0 && (
                              <span className={NavStyle.cart_Counter}>
                                {cart.length}
                              </span>
                            )}
                          </i>
                        </Link>
                      )}
                      {username && (
                        <a className={NavStyle.notification}>
                          <div
                            className={`${NavStyle.Notify} dropdown ${NavStyle.dropdown}`}
                          >
                            <button
                              className={`${"btn dropdown-toggle"} ${
                                NavStyle["dropdown-toggle"]
                              } ${NavStyle["btn"]}`}
                              type="button"
                              id="profileDropdownMenuButton"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              {/* <button className="btn btn-outline-secondary" >
                                    SHOW
                                </button> */}
                              <i className="fa fa-bell text-white fa-lg "></i>
                              {notifications.length > 0 && (
                                <div className={NavStyle.counter}>
                                  {notifications.length}
                                </div>
                              )}

                              {notificationChat.length > 0 && (
                                <div className={NavStyle.counter}>
                                  {notificationChat.length}
                                </div>
                              )}

                              {notificationBook.length > 0 && (
                                <div className={NavStyle.counter}>
                                  {notificationBook.length}
                                </div>
                              )}
                            </button>
                            <ul
                              className={`${"dropdown-menu"} ${
                                NavStyle["dropdown-menu"]
                              }`}
                              aria-labelledby="profileDropdownMenuButton"
                            >
                              {notifications.map((notification, index) => (
                                <div key={index}>
                                  <li
                                    className={`${NavStyle.NotificationLISTS}`}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleNotificationClick(
                                        notification,
                                        index
                                      );
                                    }}
                                  >
                                    <Link
                                      to={`/Posts/${notification.postId}/${notification.commentId}?scrollTo=${notification.commentId}`}
                                      className={NavStyle.NotificationIMG}
                                    >
                                      <p className={NavStyle.NotifyText}>
                                        بالتعليق على منشورك بعنوان{" "}
                                        {notification.postNurseName} : قام{" "}
                                        <img
                                          src={`${api}${notification.nurseImg}`}
                                        />
                                        <br />
                                        <span>{notification.postTitle}</span>
                                      </p>
                                    </Link>
                                    <span
                                      className={NavStyle.BordersBottoms}
                                    ></span>
                                  </li>
                                </div>
                              ))}
                              {/* nurse Booking */}
                              {notificationBook.map((notification, index) => (
                                <div key={index}>
                                  <li
                                    className={`${NavStyle.NotificationLISTS}`}
                                  >
                                    <a
                                      href=""
                                      className={NavStyle.NotificationIMG}
                                    >
                                      <p className={NavStyle.NotifyText}>
                                        <div className="d-flex">
                                          <a
                                            onClick={(e) => {
                                              console.log(
                                                "notificationBook.bookId in the button",
                                                notification.bookId
                                              );
                                              e.preventDefault();
                                              acceptBooking(notification);
                                            }}
                                          >
                                            <i
                                              className="fa-solid fa-circle-check fa-fade fa-xl"
                                              style={{ color: "#00a02b" }}
                                            ></i>
                                          </a>
                                          <a
                                            onClick={(e) => {
                                              e.preventDefault();
                                              refuseBooking(notification);
                                            }}
                                          >
                                            <i
                                              class="fa-solid fa-circle-xmark fa-fade fa-xl"
                                              style={{ color: "#eb3b0f" }}
                                            ></i>
                                          </a>
                                          : {notification.times} قام{" "}
                                          {notification.patientName} بطلبك في
                                          ميعاد
                                        </div>
                                      </p>
                                    </a>
                                    <span
                                      className={NavStyle.BordersBottoms}
                                    ></span>
                                  </li>
                                </div>
                              ))}
                            </ul>
                          </div>
                        </a>
                      )}
                      {!username ? (
                        <>
                          <NavLink
                            to="/Signup"
                            type="button"
                            className={`${"btn"} ${
                              NavStyle.btn_outline_primary
                            } `}
                          >
                            انضم الآن
                          </NavLink>
                          &nbsp;
                          <NavLink
                            to="/Login"
                            type="button"
                            className={`${"btn"} ${
                              NavStyle.btn_outline_secondary
                            } `}
                          >
                            {" "}
                            الدخول{" "}
                          </NavLink>
                        </>
                      ) : (
                        <>
                          {/* Login Logout */}
                          <a className={`${NavStyle.ProfilePic} `}>
                            <div className={`${NavStyle.ProfilePic} dropdown`}>
                              <button
                                className={`${"btn dropdown-toggle"} ${
                                  NavStyle.ProfilePicButton
                                } ${NavStyle.btn_Profile_Outlined}`}
                                type="button"
                                id="profileDropdownMenuButton"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <span> {username || "User"} </span>
                                <i className="fa fa-fw fa-user text-light fa-xl"></i>
                              </button>
                              <ul
                                className={`${"dropdown-menu"}`}
                                aria-labelledby="profileDropdownMenuButton"
                              >
                                {userRole === "nurse" ? (
                                  <li>
                                    <NavLink
                                      to="/nurseProfile"
                                      className={`${"dropdown-item text-end"} ${
                                        NavStyle.dropdown_item
                                      }`}
                                    >
                                      الصفحة الشخصية
                                    </NavLink>
                                  </li>
                                ) : (
                                  <li>
                                    <NavLink
                                      to="/patientProfile"
                                      className={`${"dropdown-item text-end"} ${
                                        NavStyle.dropdown_item
                                      }`}
                                    >
                                      الصفحة الشخصية
                                    </NavLink>
                                  </li>
                                )}{" "}
                                <li>
                                  <NavLink
                                    to="/Login"
                                    className={`${"dropdown-item text-end text-danger"} ${
                                      NavStyle.dropdown_item
                                    }`}
                                    onClick={handleLogout}
                                  >
                                    <i className="bx bx-log-out me-1"></i>{" "}
                                    الخروج
                                  </NavLink>
                                </li>
                              </ul>
                            </div>
                          </a>
                        </>
                      )}
                    </li>
                  </ul>
                  {/* Buttons */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}

export default Navbar;
