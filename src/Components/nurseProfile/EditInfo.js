import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {getNurse, updateNurseInfo } from "../../Redux/Slices/NurseProfileR";
function EditInfo(props) {
  const { data } = props;
  const [image,setImage]=useState(data?.profile)
  useEffect(()=>
  {

    setImage(`${url}${data.profile}`)
    console.log(`${url}${data.profile}`);
    
  },[data])


  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  // Submit the updated nurse info to the server
  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values)

    let form = new FormData();  
    form.append("name", values.name);  
    form.append("phoneNumber", values.phoneNumber); 
    form.append("region", values.region);    
    // form.append("password", values.password);
    form.append("profile", values.profile);
    form.append("about", values.about);
    form.append("skills", values.skills);

    
    dispatch(updateNurseInfo(form))
      .then(() => {
        dispatch(getNurse());
        setSubmitting(false);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false);
      });
  };
  const url="http://localhost:3500/"

  return (
    <>
      <a variant="primary" onClick={handleShow}>
        تعديل الملف الشخصي
      </a>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header style={{ direction: "rtl" }}>
          <Modal.Title className={"ps-5"}>تعديل البيانات الشخصية</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              profile: data.profile,
              name: data.name,
              phoneNumber: data.phoneNumber,
              region: data.region,
              // password: '',
               about:data.about,
               skills:data.skills
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object({
              name: Yup.string().required("الرجاء إدخال الاسم"),
              phoneNumber: Yup.string().required("الرجاء إدخال رقم الهاتف"),
              region: Yup.string().required("الرجاء إدخال المنطقة"),
              // password: Yup.string().required("الرجاء إدخال كلمة المرور"),
              about :Yup.string().required("الرجاء ادخال نبذة عنك "),
              skills :Yup.string().required("الرجاء ادخال المهارات المطلوبة "),
            })}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue
            }) => (
              <Form
                style={{ direction: "rtl" }}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                  handleClose();
                }}
              >
{/* <Form.Group className="mb-3" controlId="profile">

<div className="d-flex justify-content-center align-items-center mb-4"> 
<div className="position-relative"> 
<img src={image} alt="Profile" className="rounded-circle shadow" style={{ width: "120px", height: "120px", objectFit: "cover" }} /> 
<label htmlFor="profile" className="btn btn-secondary rounded-circle position-absolute bottom-0 end-0 p-2"> <i className="fas fa-camera"></i> 
</label> 
<Form.Control type="file" id="profile" hidden name="profile" 
 onChange={(e) => {
  setFieldValue("profile", e.currentTarget.files[0]);
  let img= URL.createObjectURL(e.currentTarget.files[0])
  setImage(img)
  
}}
  placeholder=" " 
 autoFocus style={{ direction: "rtl", textAlign: "right", marginTop: '.5rem', }} /> 
 </div>
  </div> 
  </Form.Group> */}
   


<Form.Group className="mb-3" controlId="profile">
<div className="d-flex justify-content-center align-items-center mb-4"> <div className="position-relative">
   <img src={image} alt="Profile" className="rounded-circle shadow" style={{ width: "130px", height: "130px", objectFit: "cover" }} /> 
<label style={{backgroundColor: "#041858", color: "white", height: '50px', width: '50px', paddingTop: '13px'}} htmlFor="profile" className="btn btn-secondary rounded-circle position-absolute bottom-0 end-0 " > <i className="fas fa-camera"></i> </label> <Form.Control
        type="file"
        id="profile"
        hidden
        name="profile"
        onChange={(e) => {
          setFieldValue("profile", e.currentTarget.files[0]);
          let img= URL.createObjectURL(e.currentTarget.files[0])
          setImage(img)
          
        }}
                      placeholder=" "
        autoFocus
        style={{ direction: "rtl", textAlign: "right" }}
      />
    </div>
  </div>
</Form.Group>

                <Field type="text" name="name">
                  {({
                    field: { value, onChange },
                    meta: { touched, error },
                  }) => (
                    <Form.Group className={"mb-4"} controlId="name">
                      <Form.Label className={"mb-1"}>الاسم</Form.Label>
                      <Form.Control
                        value={value}
                        onChange={onChange}
                        onBlur={handleBlur}
                        style={{ direction: "rtl", textAlign: "right" }}
                      />
                      {touched && error && (
                        <Form.Text className="text-danger">{error}</Form.Text>
                      )}
                    </Form.Group>
                  )}
                </Field>

                <Field type="text" name="phoneNumber">
                  {({
                    field: { value, onChange },
                    meta: { touched, error },
                  }) => (
                    <Form.Group className={"mb-4"} controlId="phoneNumber">
                      <Form.Label className={"mb-1"}>رقم الموبايل</Form.Label>
                      <Form.Control
                        value={value}
                        onChange={onChange}
                        onBlur={handleBlur}
                        style={{ direction: "rtl", textAlign: "right" }}
                      />
                      {touched && error && (
                        <Form.Text className="text-danger">{error}</Form.Text>
                      )}
                    </Form.Group>
                  )}
                </Field>

                <Field type="text" name="region">
                  {({
                    field: { value, onChange },
                    meta: { touched, error },
                  }) => (
                    <Form.Group className={"mb-4"} controlId="region">
                      <Form.Label className={"mb-1"}>المنطقة</Form.Label>
                      <Form.Control
                        value={value}
                        onChange={onChange}
                        onBlur={handleBlur}
                        style={{ direction: "rtl", textAlign: "right" }}
                      />
                      {touched && error && (
                        <Form.Text className="text-danger">{error}</Form.Text>
                      )}
                    </Form.Group>
                  )}
                </Field>

                {/* <Field type="password" name="password">
  {({
    field: { value, onChange },
    meta: { touched, error },
  }) => (
    <Form.Group className={"mb-3"} controlId="password">
      <Form.Label className={"mb-3"}>كلمة المرور تحد</Form.Label>
      <Form.Control
        type="password" // set type to "password"
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        style={{ direction: "rtl", textAlign: "right" }}
      />
      {touched && error && (
        <Form.Text className="text-danger">{error}</Form.Text>
      )}
    </Form.Group>
  )}
</Field> */}

<Field name="about">
  {({
    field: { value, onChange },
    meta: { touched, error },
  }) => (
    <Form.Group className={"mb-4"} controlId="about">
      <Form.Label className={"mb-1"}> نبذة عني</Form.Label>
      <Form.Control
        as="textarea" // set component to textarea
        name="about"
        rows={3}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        style={{ direction: "rtl", textAlign: "right" }}
      />
      {touched && error && (
        <Form.Text className="text-danger">{error}</Form.Text>
      )}
    </Form.Group>
  )}
</Field>



<Field name="skills">
  {({
    field: { value, onChange },
    meta: { touched, error },
  }) => (
    <Form.Group className={"mb-4"} controlId="skills">
      <Form.Label className={"mb-1"}> المهارات  </Form.Label>
      <Form.Control
        as="textarea" // set component to textarea
        name="skills"
        rows={3}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        style={{ direction: "rtl", textAlign: "right" }}
      />
      {touched && error && (
        <Form.Text className="text-danger">{error}</Form.Text>
      )}
    </Form.Group>
  )}
</Field>
        <div className="text-start">
          <Button className="btn" style={{backgroundColor: "white", color: "#041858", borderColor: '#041858', border:'1px solid' }} variant="secondary" onClick={handleClose}>
            إغلاق
          </Button>
                <Button
                style={{backgroundColor: "#00A02B", color: "white", borderColor: '#00A02B', border:'1px solid' }}
                  className={"btn m-1"}
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  حفظ
                </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer style={{ direction: "rtl" }}>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditInfo;
