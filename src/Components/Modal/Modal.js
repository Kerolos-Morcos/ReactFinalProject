/* eslint-disable react-hooks/rules-of-hooks */
import React , {useState} from "react"
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Button , Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import modalstyle from './modal.module.css'
import { useFormik } from "formik";
import * as Yup from 'yup'
import axios from 'axios'
// import one from'../../assets/aboutImgs/copy-writing.png'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import two from '../../assets/aboutImgs/addition.png'
import user from '../../assets/images/aboutImgs/edit.png'


function ModalPost(){
const patientId = JSON.parse(localStorage.getItem("user"));
// console.log(patientId._id);
// console.log(patientId.region, patientId.name);

const [showModal, setShowModal] = useState(false);
const formik = useFormik({
  initialValues:
  {
    title: '',
    content: '',
    patientName: patientId.name,
    patientImg: patientId.profile,
    patientLocation: patientId.region,
  },
    validationSchema: Yup.object().shape({
      title: Yup.string().required('عنوان الخدمة مطلوب'),
        content: Yup.string().required("وصف الخدمة مطلوب")
        }),
        
        onSubmit: (values, {resetForm}) => {
          console.log(values);
          
          axios.post(`http://localhost:3500/post/addPost/${patientId._id}`,values)
              .then((res) => {
                console.log(res.data._id);
                resetForm();
                setShowModal(false);
              });
      }
              });
return(   
<>
<Button id="step3" className={`${"btn-outline-primary"} ${modalstyle.btn_outline_secondary}`} onClick={() => setShowModal(true)}>اطلب خدمة</Button><Modal show={showModal} onHide={() => setShowModal(false)}>
  
        
    <div className={modalstyle.container}>
  <div className={modalstyle.wrapper}>
    <section className={modalstyle.post}>
      <header>تقديم طلب</header>
      <form  className={modalstyle.RequestPost} onSubmit={formik.handleSubmit}>
        <div className={modalstyle.content}>
          <div className={modalstyle.details}>
           
            {/* <div className={modalstyle.privacy}> */}
              {/* <i className={"fas fa-user-friends"} /> */}
              <img  className={modalstyle.user}
               src={user} 
               alt="user" />

            {/* </div> */}
          </div>
        </div>
        <textarea
          placeholder="عنوان الطلب"
          spellCheck="false"
          required=""
          defaultValue={""}
          className={modalstyle.subjectTitle}
          onChange={formik.handleChange}
          name="title"
          onBlur={()=> 
              { 
                formik.setTouched({title:true}) 
              }}
              style={{ border: formik.touched.title &&formik.errors.title ? 'solid 1px red' : '' }}  />
      {formik.touched.title && (
              <small id="emailHelp" dir="rtl" style={{ color: "red", fontSize: '17px' ,float: 'right'}}>
                {formik.errors.title}
              </small>
            )}
        <textarea
          placeholder="ماذا يدور فى ذهنك؟"
          spellCheck="false"
          required=""
          defaultValue={""}
          className={modalstyle.WhatsOnMind}
          onChange={formik.handleChange}
          name="content"
          onBlur={()=> 
              { 
                formik.setTouched({content:true}) 
              }}
              style={{ border: formik.touched.content && formik.errors.content ? 'solid 1px red' : '' }} 
        />
         {formik.touched.content && (
              <small id="emailHelp" style={{ color: "red", fontSize: '17px' ,float: 'right'}}>
                {formik.errors.content}
              </small>
            )}
        <button className={modalstyle.btn_outline_primary} >
        
        {/* <a href="">نشر</a> */}
        نشر
        </button>
      </form>
    </section>
    <section className={modalstyle.audience}>
     
      

    </section>
  </div>
</div>

    {/* </Modal.Body> */}
    {/* <Modal.Footer>
        <Button onClick={() => setShowModal(false)}>Close</Button>
    </Modal.Footer> */}
</Modal>
</>
)
}
export default ModalPost;