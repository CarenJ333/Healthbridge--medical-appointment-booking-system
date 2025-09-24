// components/forms/AppointmentForm.jsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AppointmentForm = () => {
  const schema = Yup.object({
    doctor: Yup.string().required("Select a doctor"),
    date: Yup.date()
      .required("Date is required")
      .min(new Date(), "Date cannot be in the past"),
    time: Yup.string().required("Time is required"),
  });

  return (
<Formik
  initialValues={{ doctor: "", date: "", time: "" }}
  validationSchema={schema}
  onSubmit={(values) => console.log("Appointment booked:", values)}
>
  <Form className="form-card form-grid">
    <div className="form-group">
      <label className="form-label" htmlFor="doctor">Doctor</label>
      <Field as="select" id="doctor" name="doctor" className="form-select">
        <option value="">-- Select Doctor --</option>
        <option value="1">Dr. Aisha Kamau (Cardiologist)</option>
        <option value="2">Dr. Daniel Mwangi (General Practitioner)</option>
        <option value="3">Dr. Grace Otieno (Dermatologist)</option>
        <option value="4">Dr. Michael Oduor (Pediatrician)</option>
        <option value="5">Dr. Sophia Njoroge (Orthopedic Surgeon)</option>
        <option value="6">Dr. James Kariuki (Psychiatrist)</option>
      </Field>
      <ErrorMessage name="doctor" component="div" className="error" />
    </div>

    <div className="form-group">
      <label className="form-label" htmlFor="date">Date</label>
      <Field type="date" id="date" name="date" className="form-date" />
      <ErrorMessage name="date" component="div" className="error" />
    </div>

    <div className="form-group">
      <label className="form-label" htmlFor="time">Time</label>
      <Field type="time" id="time" name="time" className="form-time" />
      <ErrorMessage name="time" component="div" className="error" />
    </div>

    <div className="full-width" style={{display:'flex', justifyContent:'flex-end'}}>
      <button type="submit" className="btn">Book Appointment</button>
    </div>
  </Form>
</Formik>

  );
};

export default AppointmentForm;
