import React, { useEffect, useState } from "react";
import PostStyle from "./post.module.css";
import NoData from "../../assets/images/No data-rafiki.svg";
// import ModalPost from "../Modal/Modal";
import axios from "axios";
import moment from "moment";
import { useFormik } from "formik";
import * as Yup from "yup";
import { json } from "react-router-dom";

function Posts() {
  const [temp, setTemp] = useState(0);
  const handleClick = (_id) => {
    setTemp(_id);
    console.log(temp);
  };
  // console.log(temp);

  let [posts, getPost] = useState([]);
  const nameOfNurse = JSON.parse(localStorage.getItem("user"));
  let [send,setSend]=useState(false);
  const [currentTime, setCurrentTime] = useState(moment.utc());




  // console.log(nameOfNurse._id);
   console.log(nameOfNurse.profile);
  //  Img= nameOfNurse.profile

  // const ids = post._id;
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
      console.log(values);
      axios
        .post(
          `http://localhost:3500/post/comments/${temp}/${nameOfNurse._id}`,
          values
        )
        .then((res) => {
          console.log(res.data);
          let index=posts.findIndex((item)=>item._id==res.data._id)
        console.log(index);
        posts[index].comments=res.data.comments;
        console.log(posts);
        getPost([...posts]);
          // console.log(res.data.comments[6].nurseName);

          resetForm();
          // setShowModal(false);
          
        });
    },
  });
  console.log(posts);

  useEffect(() => {
    axios.get("http://localhost:3500/post/posts").then((res) => {
      let P = getPost(res.data.data);
      // console.log(res.data.data[1]._id);
      if (posts) {
        posts = getPost(res.data);

        // console.log(res.data.data);
      } else {
        posts = [];
      }
    });
  }, []);
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

  useEffect(()=>{
    const IntervalId = setInterval(()=>{
      setCurrentTime(moment.utc())
    }, 1000);
    return ()=> clearInterval(IntervalId)
  },[])
  const getElapsedTime = (postTime) => {
    const elapsedTimeInSeconds = currentTime.diff(moment.utc(postTime),"seconds")
    // console.log(postTime);
    // const elapsedTimeInSeconds = currentTime.diff(
    //   moment.utc(postTime),
    //   "seconds"
    // );
    let elapsedTime;
    

    let hour = "ساعة"
    


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

  return (
    <div className={PostStyle.PostsBG}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className={PostStyle.Post_Body}>
              <div className={PostStyle.Post_Content}>
                <div className="p-0">
                  <div className="fade active show">
                    <ul className={PostStyle.timeline}>
                      {Array.isArray(posts) && posts.length ? (
                        posts.map((post) => (
                          <li key={post._id}>
                            <div className={PostStyle.timeline_body}>
                              <div className={PostStyle.timeline_header}>
                                <span className={PostStyle.userimage}>
                                  <img
                                          src={`${post.patientImg}`}
                                    // src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                    alt=""
                                  />
                                </span>
                                <span
                                  className={`${PostStyle.username} ${"me-2"}`}
                                >
                                  <span> {post.patientName} </span>
                                </span>
                                <span className={`${PostStyle.PostTime}`}>
                                  {getElapsedTime(post.createdAt)}
                                </span>
                              </div>
                              <div className={`${PostStyle.timeline_content}`}>
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
                              <div className={PostStyle.timeline_footer}></div>
                              <div className={PostStyle.timeline_comment_box}>
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
                                        value={formik.values.comment}
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
                                        onClick={() => handleClick(post._id)}
                                      >
                                        ارسال
                                      </button>
                                    </span>
                                  </form>
                                </div>
                              </div>

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
                                          <p> {getElapsedTime(comment.date)}</p>
                                        </div>
                                        <div>
                                          <a href="#"> {comment.nurseName} </a>
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
        </div>
      </div>
    </div>
  );
}

export default Posts;
