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
import { useTechnologyCreate } from "../../../service/reactQuery/TechnologyQuery.js";

const CreateTechnologyForm = ({ onSuccess }) => {
  const [formValues, setFormValues] = useState({
    techName: "",
    parentId: "",
    describe: "",
    iconAddress: "",
  });

  const { mutate, isLoading } = useTechnologyCreate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      techName: String(formValues.techName).trim(),
      iconAddress: String(formValues.iconAddress).trim(),
      describe: String(formValues.describe).trim(),
    };

    console.log("Payload being sent:", JSON.stringify(payload, null, 2));

    mutate(payload, {
      onSuccess: () => {
        if (onSuccess) onSuccess();
        setFormValues({
          techName: "",
          parentId: "",
          describe: "",
          iconAddress: "",
        });
      },
      onError: (error) => {
        console.error("Error creating ClassRoom:", error.message);
      },
    });
  };

  return (
    <Card className="shadow-lg border-0 rounded-3">
      <CardHeader className="bg-primary text-white text-center fw-bold fs-5">
        ایجاد فناوری جدید
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="techName" className="fw-semibold">
              نام فناوری
            </Label>
            <Input
              id="techName"
              name="techName"
              value={formValues.techName}
              onChange={handleChange}
              placeholder="مثال: برج آسمان"
              className="rounded-pill"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="iconAddress" className="fw-semibold">
              آدرس آیکون
            </Label>
            <Input
              id="iconAddress"
              name="iconAddress"
              value={formValues.iconAddress}
              onChange={handleChange}
              placeholder="مثال: 5"
              className="rounded-pill"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="describe" className="fw-semibold">
              توضیحات{" "}
            </Label>
            <Input
              id="describe"
              name="describe"
              value={formValues.describe}
              onChange={handleChange}
              placeholder="مثال: برج آسمان"
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
              {isLoading ? "در حال ایجاد..." : "ایجاد فناوری"}
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};

export default CreateTechnologyForm;
