import io from "socket.io-client";

import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import PostStyle from "./post.module.css";
import NoData from "../../assets/images/No data-rafiki.svg";
// import ModalPost from "../Modal/Modal";
import axios from "axios";
import moment from "moment";
import { useFormik } from "formik";
import * as Yup from "yup";
import { json } from "react-router-dom";
import { motion } from "framer-motion";
import DarkStyle from "../DarkMode/darkBtn.module.css";
import { search, filter, setFilteredPosts } from "../../Redux/Slices/PostSlice";
import Fade from "react-reveal/Fade";

function Posts({ Socket }) {
  const dispatch = useDispatch();
  const NurseNameSocket = JSON.parse(localStorage.getItem("user"));
  const [temp, setTemp] = useState(0);

   const nameOfNurse = JSON.parse(localStorage.getItem("user"));
  let [send, setSend] = useState(false);
  const [currentTime, setCurrentTime] = useState(moment.utc());
 

  let [posts, getPost] = useState([]);
  let [FilteredPosts, getFilteredPosts] = useState([]);

  //From Post Slice
  // let FilteredPosts = [];

  function searching(e) {
    // TEST CASE: Check if posts is an empty string
    if (e.target.value === "") {
      getFilteredPosts(posts);
      // console.log(FilteredPosts);
      // FilteredPosts = [];
    } else {
      let x = posts.filter(
        (post) =>
        post.content.toLowerCase().includes(e.target.value.toLowerCase()) ||
        post.patientLocation
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
        );
        getFilteredPosts(x)
        console.log(FilteredPosts);
      // dispatch(filter(filteredPosts)); // Dispatch the action with filteredPosts as the payload
      // console.log(FilteredPosts);
    }
    // console.log(e.target.value);
  }




  // Filter
  let sideSchema = Yup.object().shape({
    patientLocation: Yup.string().required("Region is required"),
  });
  const sideFormik = useFormik({
    initialValues: {
      patientLocation: "",
    },
    validationSchema: sideSchema,
    onSubmit: (values) => {
    // function filtering() {   
      
      axios.post("http://localhost:3500/post/postsFilter", values)
        .then((res) => {
          console.log(res);
          getFilteredPosts(res.data.data)
          // if (res.data.success === true) {
          //   // alert(res.data.message);
          // } else {
          //   // alert(res.data.message);
          // }
        });
      // }
    },
  });
  //From Post Slice



  useEffect(() => {
    let x = axios
      .get("http://localhost:3500/post/posts")
      .then((res) => {
        // let P = getPost(res.data.data);
        // console.log(res.data.data[1]._id);
        // FilteredPosts = getFilteredPosts(res.data.data);
        if (x) {
          posts = getPost(res.data.data);
          FilteredPosts = getFilteredPosts(res.data.data);
          // console.log(res.data);
          // console.log(res.data.data[0].patientImg);
        } else {
          posts = [];
          FilteredPosts = [];
        }
      })
      .catch((e) => {
        console.log("error" + e);
      });
      
      const isDarkMode = localStorage.getItem("isDarkMode");
      if (isDarkMode) {
        document
        .querySelector("#post")
        ?.classList.toggle(DarkStyle["post"], isDarkMode);
        document
        .querySelector("#NurseSidebar")
        ?.classList.toggle(DarkStyle["NurseSidebar"], isDarkMode);
      }
    }, []);
    // console.log(FilteredPosts);



  const handleClick = (post) => {
    setTemp(post._id);
  };

  // ...

 
  //////////////////////////////////

  // console.log(temp);


  // console.log(nameOfNurse._id);
  //  console.log(nameOfNurse.profile);
  //  Img= nameOfNurse.profile

  // const ids = post._id;
 
  // console.log(posts);

// Empty Posts
function Empty(){
  getFilteredPosts(posts)
}





  // useEffect(() => {
  //   axios.get("http://localhost:3500/post/posts").then((res) => {
  //     let P = getPost(res.data.data);
  //     // console.log(P);
  //     // console.log(res.data.data[1]._id);
  //     if (posts) {
  //       posts = getPost(res.data);

  //       // console.log(res.data.data);
  //     } else {
  //       posts = [];
  //     }
  //   });
  // }, [send]);
  // const currentTime = moment.utc();

  useEffect(() => {
    const IntervalId = setInterval(() => {
      setCurrentTime(moment.utc());
    }, 1000);
    return () => clearInterval(IntervalId);
  }, []);
  const getElapsedTime = (postTime) => {
    
    const elapsedTimeInSeconds = currentTime.diff(
      moment.utc(postTime),
      "seconds"
    );
    // console.log(postTime);
    // const elapsedTimeInSeconds = currentTime.diff(
    //   moment.utc(postTime),
    //   "seconds"
    // );

    let elapsedTime;

    if (elapsedTimeInSeconds < 60) {
      elapsedTime = `${elapsedTimeInSeconds} ثانية`;
    } else if (elapsedTimeInSeconds < 3600) {
      const elapsedMinutes = Math.floor(elapsedTimeInSeconds / 60);
      elapsedTime = `دقيقة ${elapsedMinutes} `;
    } else if (elapsedTimeInSeconds < 86400) {
      const elapsedHours = Math.floor(elapsedTimeInSeconds / 3600);
      elapsedTime = ` ${elapsedHours} ساعة`;
    } else {
      const elapsedDays = Math.floor(elapsedTimeInSeconds / 86400);
      elapsedTime = `${elapsedDays} يوم`;
    }

    return elapsedTime;
  };


  const formik = useFormik({
    initialValues: {
      nurseName: nameOfNurse.name,
      nurseImg: nameOfNurse.profile,
      comment: "",
      id: "",
    },
    validationSchema: Yup.object().shape({
      comment: Yup.string().required("أضف العرض الخاص بك"),
    }),

    onSubmit: (values, { resetForm }) => {
      // console.log("values");
      // console.log(values.id);
      // let tests = values.id
      // console.log(Socket);
      axios
        .post(
          `http://localhost:3500/post/comments/${temp}/${nameOfNurse._id}`,
          values
        )
        .then((res) => {
          let index = posts.findIndex((item) => item._id == res.data._id);
          posts[index].comments = res.data.comments;
          // console.log();
          const lastComment = res.data.comments[res.data.comments.length - 1];
          // console.log(res.data);

          axios.post(`http://localhost:3500/NotifPost`, {
            postNameSender: res.data.patientName,
            patientId: res.data.patientId,
            postNurseName: lastComment.nurseName,
            nurseComment: lastComment.comment,
            postTitle: res.data.title,
            nurseImg: lastComment.nurseImg,
            commentId: lastComment._id,
          });

          getPost([...posts]);
          // console.log(res.data.comments[6].nurseName);
          resetForm();
          // setShowModal(false);
        });
    },
  });




  const api = "http://localhost:3500/";
  const isPatient = NurseNameSocket.role === "patient";
  return (
    <motion.div
      id="post"
      className={PostStyle.PostsBG}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      variants={{ duration: 0.2 }}
      transition={{ yoyo: Infinity }}
      style={{ overflow: "hidden" }}
    >
      <div className="container">
        <div className=" d-flex">
          <Fade bottom distance="10%" duration={1500}>
            <div className="col-md-11">
              <div className={PostStyle.Post_Body}>
                <div className={PostStyle.Post_Content}>
                  <div className="p-0">
                    <div className="fade active show">
                      <ul className={PostStyle.timeline}>
                        {Array.isArray(FilteredPosts) &&
                        FilteredPosts.length ? (
                          FilteredPosts.map((post) => (
                            <li key={post._id}>
                              <div className={PostStyle.timeline_body}>
                                <div className={PostStyle.timeline_header}>
                                  <span className={PostStyle.userimage}>
                                    <img
                                      src={`${api}${post.patientImg}`}
                                      // src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                      alt=""
                                    />
                                  </span>
                                  <span
                                    className={`${
                                      PostStyle.username
                                    } ${"me-2"}`}
                                  >
                                    <span> {post.patientName} </span>
                                  </span>
                                  <span className={`${PostStyle.PostTime}`}>
                                    {getElapsedTime(post.createdAt)}
                                  </span>
                                </div>
                                <div
                                  className={`${PostStyle.timeline_content}`}
                                >
                                  <p>{post.content}</p>
                                </div>

                                <div className={PostStyle.timeline_likes}>
                                  <div className={PostStyle.stats_right}>
                                    <span className={PostStyle.stats_text}>
                                      {post.patientLocation}{" "}
                                      <i className="fa-solid fa-location-dot"></i>
                                    </span>
                                  </div>
                                </div>
                                {!isPatient && (
                                  <>
                                    <div
                                      className={PostStyle.timeline_footer}
                                    ></div>
                                    <div
                                      className={PostStyle.timeline_comment_box}
                                    >
                                      <div className={PostStyle.input_Proposal}>
                                        <form onSubmit={formik.handleSubmit}>
                                          <div className={"input-group"}>
                                            <textarea
                                              type="text"
                                              className={`${"form-control rounded-corner"} ${
                                                PostStyle.PoroposalInput
                                              }`}
                                              name="comment"
                                              onChange={formik.handleChange}
                                              value={
                                                formik.values.comment[post._id]
                                              }
                                              placeholder="قم بتقديم طلب...."
                                            />
                                            <input
                                              type="text"
                                              name="id"
                                              value={post._id}
                                              onChange={formik.handleChange}
                                              hidden
                                            />
                                          </div>
                                          <span className={"input-group-btn"}>
                                            <button
                                              className={`${PostStyle.btn_outline_primary}`}
                                              type="submit"
                                              onClick={() => handleClick(post)}
                                            >
                                              ارسال
                                            </button>
                                          </span>
                                        </form>
                                      </div>
                                    </div>
                                  </>
                                )}
                                {/* Comments */}
                                {/* New */}
                                <ul
                                  className={`${"fb-comments"} ${
                                    PostStyle["fb-comments"]
                                  }`}
                                >
                                  {Array.isArray(post.comments) &&
                                    post.comments.length > 0 &&
                                    post.comments.map((comment) => (
                                      <li>
                                        <a
                                          href="#"
                                          className={`${"cmt-thumb"} ${
                                            PostStyle["cmt-thumb"]
                                          }`}
                                        >
                                          <img
                                            src={`http://localhost:3500/${comment.nurseImg}`}
                                            // src="https://bootdey.com/img/Content/avatar/avatar5.png"
                                            alt=""
                                          />
                                        </a>
                                        <div
                                          className={`${"cmt-details d-flex justify-content-between"} ${
                                            PostStyle["cmt-details"]
                                          }`}
                                        >
                                          <div
                                            className={PostStyle.ProposalTimer}
                                          >
                                            <p>
                                              {" "}
                                              {getElapsedTime(comment.date)}
                                            </p>
                                          </div>
                                          <div>
                                            <a href="#">
                                              {" "}
                                              {comment.nurseName}{" "}
                                            </a>
                                          </div>
                                        </div>
                                        <p
                                          className={`${PostStyle.ProposalBody}`}
                                        >
                                          {" "}
                                          {comment.comment}
                                        </p>
                                      </li>
                                    ))}
                                </ul>
                                {/* New */}
                              </div>
                            </li>
                          ))
                        ) : (
                          <div
                            className={`${"d-flex flex-column"} ${
                              PostStyle.Nodata
                            }`}
                          >
                            <img src={NoData} />
                            <h1 className="text-center">
                              {" "}
                              لا يوجد طلبات حتي الآن{" "}
                            </h1>
                          </div>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fade>

          {/* Filter */}
          <Fade right distance="10%" duration={1500}>
            <div className="col-md-2">
              <aside dir="rtl">
                <div id="NurseSidebar" className={`${PostStyle.filter}`}>
                  <h1 style={{ fontSize: "30px" }}>نتائج البحث</h1>
                  <div
                    className={`${"input-group"} ${"mb-3"} ${
                      PostStyle.searchbar
                    }`}
                  >
                    <input
                      type="text"
                      className={"form-control"}
                      placeholder=""
                      aria-label="Recipient's username"
                      aria-describedby="button-addon2"
                      onChange={searching}
                    ></input>

                    <button
                      type="button"
                      id="button-addon2"
                      className={`${"btn"} ${"btn-outline-secondary"} ${
                        PostStyle["btn-outline-secondary"]
                      } `}
                    >
                      <i className={"fa-solid fa fa-keyboard"}></i>
                    </button>
                  </div>
                  <hr />
                  <form
                    className={PostStyle["form-main"]}
                    onSubmit={sideFormik.handleSubmit}
                  >
                    <div className={PostStyle["filter__content"]}>
                      <div
                        className={`${"form-field-content"} ${
                          PostStyle["form-field-content"]
                        } `}
                      >
                        <label htmlFor="">الموقع</label>
                        <select
                          selected
                          name="patientLocation"
                          className={`${PostStyle.options}`}
                          onChange={sideFormik.handleChange}
                        >
                          <option>اختر الموقع</option>
                          <option value="أطلس">أطلس</option>
                          <option value="التأمين">التأمين</option>
                          <option value="كيما">كيما</option>
                          <option value="اسوان">اسوان</option>
                        </select>
                      </div>
                      <hr />
                      <div className={PostStyle["bt-cnt"]}>
                        <button onClick={Empty} className={PostStyle.clear}>
                          مسح البحث
                        </button>
                        <button  className={PostStyle.apply} type="submit">
                          تطبيق
                          {/* <a href="" >تطبيق</a> */}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </aside>
            </div>
          </Fade>
        </div>
      </div>
    </motion.div>
  );
}

export default Posts;
