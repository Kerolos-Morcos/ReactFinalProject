import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { getPatient, updatePatientInfo } from "../../Redux/Slices/PatientSlice";

function EditInfo(props) {
  const { data } = props;
  const [image, setImage] = useState(data?.profile);
  useEffect(() => {
    setImage(`${url}${data.profile}`);
  }, [data]);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  // Submit the updated patient info to the server
  const handleSubmit = (values, { setSubmitting }) => {
    let form = new FormData();  
    form.append("name", values.name);  
    form.append("phoneNumber", values.phoneNumber); 
    form.append("region", values.region);    
    form.append("password", values.password);
    // Handle file uploads properly
    if (values.profile instanceof File) {
      form.append("profile", values.profile);
    } else {
      form.append("profile_url", values.profile);
    }
    
    dispatch(updatePatientInfo(form))
      .then(() => {
        dispatch(getPatient());
        setSubmitting(false);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false);
      });
  };
  const url = "http://localhost:3500/";

  return (
    <>
      <a id="step2" variant="primary" onClick={handleShow}>
        تعديل  البيانات
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
              password: data.password,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object({
              name: Yup.string().required("الرجاء إدخال الاسم"),
              phoneNumber: Yup.string().required("الرجاء إدخال رقم الهاتف"),
              region: Yup.string().required("الرجاء إدخال المنطقة"),
              password: Yup.string().required("الرجاء إدخال كلمة المرور"),
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
                <Form.Group className="mb-3" controlId="profile">
                  <div className="d-flex justify-content-center align-items-center mb-4">
                    <div className="position-relative">
                      <img
                        src={image}
                        alt="Profile"
                        className="rounded-circle shadow"
                        style={{
                          width: "130px",
                          height: "130px",
                          objectFit: "cover",
                        }}
                      />
                      <label
                        className="btn btn-secondary rounded-circle position-absolute bottom-0 end-0"
                        htmlFor="profile"
                        style={{
                          backgroundColor: "#041858",
                          color: "white",
                          height: "50px",
                          width: "50px",
                          paddingTop: "13px",
                        }}
                      >
                        <i className="fas fa-camera"></i>
                      </label>
                      <Form.Control
                        type="file"
                        id="profile"
                        hidden
                        name="profile"
                        onChange={(e) => {
                          setFieldValue("profile", e.currentTarget.files[0]);
                          let img = URL.createObjectURL(e.currentTarget.files[0]);
                          setImage(img);
                        }}
                        placeholder=" "
                        autoFocus
                        style={{ direction: "rtl", textAlign: "right" }}
                      />
                    </div>
                  </div>
                </Form.Group>
                <Field name="name">
                  {({ field, meta }) => (
                    <Form.Group controlId="name" className="mb-3">
                      <Form.Label className="mt-0">الاسم</Form.Label>
                      <Form.Control
                        {...field}
                        isInvalid={meta.touched && meta.error}
                        style={{ direction: "rtl", textAlign: "right" }}
                      />
                      <Form.Control.Feedback type="invalid">
                        {meta.error}
                      </Form.Control.Feedback>
                    </Form.Group>
                  )}
                </Field>
                <Field name="phoneNumber">
                  {({ field, meta }) => (
                    <Form.Group controlId="phoneNumber" className="mb-3">
                      <Form.Label>رقم الهاتف</Form.Label>
                      <Form.Control
                        {...field}
                        isInvalid={meta.touched && meta.error}
                        style={{ direction: "rtl", textAlign: "right" }}
                      />
                      <Form.Control.Feedback type="invalid">
                        {meta.error}
                      </Form.Control.Feedback>
                    </Form.Group>
                  )}
                </Field>
                <Field name="region">
                  {({ field, meta }) => (
                    <Form.Group controlId="region">
                      <Form.Label>المنطقة</Form.Label>
                      <Form.Control
                        {...field}
                        isInvalid={meta.touched && meta.error}
                        style={{ direction: "rtl", textAlign: "right" }}
                      />
                      <Form.Control.Feedback type="invalid">
                        {meta.error}
                      </Form.Control.Feedback>
                    </Form.Group>
                  )}
                </Field>
                {/* <Field name="password">
                  {({ field, meta }) => (
                    <Form.Group controlId="password">
                      <Form.Label>كلمة المرور</Form.Label>
                      <Form.Control
                        {...field}
                        type="password"
                        isInvalid={meta.touched && meta.error}
                        style={{ direction: "rtl", textAlign: "right" }}
                      />
                      <Form.Control.Feedback type="invalid">
                        {meta.error}
                      </Form.Control.Feedback>
                    </Form.Group>
                  )}
                </Field> */}
                <div className="text-start">
                <Button
                style={{backgroundColor: "#00A02B", color: "white", borderColor: '#00A02B', border:'1px solid' }}
                  className={"btn m-1 mt-4 save-btn"}
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  حفظ
                </Button>
                <Button
                style={{backgroundColor: "white", color: "#041858", borderColor: '#041858', border:'1px solid' }}
                  className={"btn m-1 mt-4 cancel-btn"}
                  variant="secondary"
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  إلغاء
                </Button>
                  </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditInfo;