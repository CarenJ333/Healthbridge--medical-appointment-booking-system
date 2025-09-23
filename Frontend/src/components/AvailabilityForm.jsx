// components/forms/AvailabilityForm.jsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AvailabilityForm = () => {
  const schema = Yup.object({
    day: Yup.string().required("Day is required"),
    start_time: Yup.string().required("Start time is required"),
    end_time: Yup.string()
      .required("End time is required")
      .test("is-greater", "End time must be after start time", function (value) {
        const { start_time } = this.parent;
        return start_time && value > start_time;
      }),
  });

  return (
  <div className="form-card">
      <h2>Set Doctor Availability</h2>
      <Formik
        initialValues={{ day: "", start_time: "", end_time: "" }}
        validationSchema={schema}
        onSubmit={(values) => console.log("Availability set:", values)}
      >
        <Form className="form-grid">
          <div className="form-group">
            <label className="form-label" htmlFor="day">Day</label>
            <Field as="select" id="day" name="day" className="form-select">
              <option value="">-- Select Day --</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
            </Field>
            <ErrorMessage name="day" component="div" className="error" />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="start_time">Start Time</label>
            <Field type="time" id="start_time" name="start_time" className="form-time" />
            <ErrorMessage name="start_time" component="div" className="error" />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="end_time">End Time</label>
            <Field type="time" id="end_time" name="end_time" className="form-time" />
            <ErrorMessage name="end_time" component="div" className="error" />
          </div>

          <div className="full-width" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn">Set Availability</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AvailabilityForm;
