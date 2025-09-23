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
    <Formik
      initialValues={{ day: "", start_time: "", end_time: "" }}
      validationSchema={schema}
      onSubmit={(values) => console.log("Availability set:", values)}
    >
      <Form>
        <label>Day</label>
        <Field as="select" name="day">
          <option value="">-- Select Day --</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
        </Field>
        <ErrorMessage name="day" component="div" />

        <label>Start Time</label>
        <Field type="time" name="start_time" />
        <ErrorMessage name="start_time" component="div" />

        <label>End Time</label>
        <Field type="time" name="end_time" />
        <ErrorMessage name="end_time" component="div" />

        <button type="submit">Set Availability</button>
      </Form>
    </Formik>
  );
};

export default AvailabilityForm;
