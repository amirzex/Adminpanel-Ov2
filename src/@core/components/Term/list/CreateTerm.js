import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";
import { useState } from "react";
import { useTermCreate } from "../../../service/reactQuery/TermQuery.js";

const CreateTermForm = ({ onSuccess }) => {
  const [formValues, setFormValues] = useState({
    id: "<integer>",
    termName: "<string>",
    departmentId: "<integer>",
    startDate: "<dateTime>",
    endDate: "<dateTime>",
  });

  const { mutate, isLoading } = useTermCreate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      termName: String(formValues.termName).trim(),
      departmentId: String(formValues.departmentId).trim(),
      startDate: new Date(formValues.startDate).toISOString(),
      endDate: new Date(formValues.endDate).toISOString(),
    };

    console.log("Payload being sent:", JSON.stringify(payload, null, 2));

    mutate(payload, {
      onSuccess: () => {
        if (onSuccess) onSuccess();
        setFormValues({
          id: "<integer>",
          termName: "<string>",
          departmentId: "<integer>",
          startDate: "<dateTime>",
          endDate: "<dateTime>",
        });
      },
      onError: (error) => {
        console.error("Error creating Term:", error.message);
      },
    });
  };

  return (
    <Card className="shadow-lg border-0 rounded-3">
      <CardHeader className="bg-primary text-white text-center fw-bold fs-5">
        ایجاد Term جدید
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="termName" className="fw-semibold">
              نام
            </Label>
            <Input
              id="termName"
              name="termName"
              value={formValues.termName}
              onChange={handleChange}
              placeholder="مثال: برج آسمان"
              className="rounded-pill"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="startDate" className="fw-semibold">
              تاریخ شروع{" "}
            </Label>
            <Input
              id="startDate"
              name="startDate"
              type="date" // ✅ makes it a date picker
              value={formValues.startDate?.slice(0, 10)} // only YYYY-MM-DD for <input type="date">
              onChange={handleChange}
              className="rounded-pill"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="endDate" className="fw-semibold">
              تاریخ پایان{" "}
            </Label>
            <Input
              id="endDate"
              name="endDate"
              type="date" // ✅ makes it a date picker
              value={formValues.endDate?.slice(0, 10)}
              onChange={handleChange}
              className="rounded-pill"
              required
            />
          </FormGroup>
          <div className="text-center mt-4">
            <Button
              color="success"
              type="submit"
              disabled={isLoading}
              className="px-5 rounded-pill fw-bold"
            >
              {isLoading ? "در حال ایجاد..." : "ایجاد term"}
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};

export default CreateTermForm;
