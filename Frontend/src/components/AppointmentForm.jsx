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
      <Form>
        <label>Doctor</label>
        <Field as="select" name="doctor">
          <option value="">-- Select Doctor --</option>
          <option value="1">Dr. Aisha Kamau (Cardiologist)</option>
          <option value="2">Dr. Daniel Mwangi (General Practitioner)</option>
          <option value="3">Dr. Grace Otieno (Dermatologist)</option>
          <option value="4">Dr. Michael Oduor (Pediatrician)</option>
          <option value="5">Dr. Sophia Njoroge (Orthopedic Surgeon)</option>
          <option value="6">Dr. James Kariuki (Psychiatrist)</option>
        </Field>
        <ErrorMessage name="doctor" component="div" />

        <label>Date</label>
        <Field type="date" name="date" />
        <ErrorMessage name="date" component="div" />

        <label>Time</label>
        <Field type="time" name="time" />
        <ErrorMessage name="time" component="div" />

        <button type="submit">Book Appointment</button>
      </Form>
    </Formik>
  );
};

export default AppointmentForm;
