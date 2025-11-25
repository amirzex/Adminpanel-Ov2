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
import { useStatusCreate } from "../../../service/reactQuery/StatusQuery.js";

const CreateStatusForm = ({ onSuccess }) => {
  const [formValues, setFormValues] = useState({
    statusName: "",
    describe: "",
    statusNumber: "",
  });

  const { mutate, isLoading } = useStatusCreate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      statusName: formValues.statusName.trim(),
      describe: formValues.describe.trim(),
      statusNumber: formValues.statusNumber.trim(),
    };

    console.log("Payload being sent:", payload);

    mutate(payload, {
      onSuccess: () => {
        if (onSuccess) onSuccess();
        setFormValues({
          statusName: "",
          describe: "",
          statusNumber: "",
        });
      },
      onError: (error) => {
        console.error("Error creating building:", error.message);
      },
    });
  };

  return (
    <Card className="shadow-lg border-0 rounded-3">
      <CardHeader className="bg-primary text-white text-center fw-bold fs-5">
        ایجاد وضعیت جدید
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="statusName" className="fw-semibold">
              نام وضعیت
            </Label>
            <Input
              id="statusName"
              name="statusName"
              value={formValues.statusName}
              onChange={handleChange}
              placeholder=":توضیحات "
              className="rounded-pill"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="statusNumber" className="fw-semibold">
              شماره وضعیت{" "}
            </Label>
            <Input
              id="statusNumber"
              name="statusNumber"
              value={formValues.statusNumber}
              onChange={handleChange}
              placeholder="مثال:  شماره وضعیت"
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
              {isLoading ? "در حال ایجاد..." : "ایجاد وضعیت"}
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};

export default CreateStatusForm;
