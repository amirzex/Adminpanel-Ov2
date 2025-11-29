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
import {
  useDepartmentCreate,
  useDepartmentDetail,
} from "../../../service/reactQuery/DepartmentQuery.js";

const CreateDepartmentForm = ({ onSuccess }) => {
  const [formValues, setFormValues] = useState({
    id: "1",
    depName: "",
    buildingId: "",
  });

  const { mutate, isLoading } = useDepartmentCreate();
  const { data } = useDepartmentDetail();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      depName: String(formValues.depName).trim(),
      buildingId: String(formValues.buildingId), // force string
    };

    console.log("Payload being sent:", JSON.stringify(payload, null, 2));

    mutate(payload, {
      onSuccess: () => {
        if (onSuccess) onSuccess();
        setFormValues({
          depName: "",
          buildingId: "",
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
        ایجاد دپارتمان جدید
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="depName" className="fw-semibold">
              نام دپارتمان
            </Label>
            <Input
              id="depName"
              name="depName"
              value={formValues.depName}
              onChange={handleChange}
              placeholder="مثال: برج آسمان"
              className="rounded-pill"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="departmentId">شناسه دپارتمان</Label>
            <Input
              type="select"
              id="departmentId"
              name="departmentId"
              value={formValues.departmentId}
              onChange={handleChange}
            >
              <option value="">انتخاب دپارتمان...</option>
              {data?.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.buildingName}
                </option>
              ))}
            </Input>
          </FormGroup>
          <div className="text-center mt-4">
            <Button
              color="success"
              type="submit"
              disabled={isLoading}
              className="px-5 rounded-pill fw-bold"
            >
              {isLoading ? "در حال ایجاد..." : "ایجاد دپارتمان"}
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};

export default CreateDepartmentForm;
