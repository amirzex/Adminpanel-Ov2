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
import { useBuildingCreate } from "../../../service/reactQuery/BuildingQuery.js";

const CreateBuildingForm = ({ onSuccess }) => {
  const [formValues, setFormValues] = useState({
    id: "",
    buildingName: "",
    workDate: "",
    floor: "",
    latitude: "",
    longitude: "",
  });

  const { mutate, isLoading } = useBuildingCreate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id: formValues.id,
      buildingName: formValues.buildingName.trim(),
      floor: parseInt(formValues.floor, 10),
      latitude: formValues.latitude,
      longitude: formValues.longitude,
      active: true,
    };

    console.log("Payload being sent:", payload);

    mutate(payload, {
      onSuccess: () => {
        if (onSuccess) onSuccess();
        setFormValues({
          id: "",
          buildingName: "",
          workDate: "",
          floor: "",
          latitude: "",
          longitude: "",
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
        ایجاد ساختمان جدید
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="id" className="fw-semibold">
              شناسه
            </Label>
            <Input
              id="id"
              name="id"
              type="number"
              value={formValues.id}
              onChange={handleChange}
              placeholder="مثال: 1"
              className="rounded-pill"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="buildingName" className="fw-semibold">
              نام ساختمان
            </Label>
            <Input
              id="buildingName"
              name="buildingName"
              value={formValues.buildingName}
              onChange={handleChange}
              placeholder="مثال: برج آسمان"
              className="rounded-pill"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="workDate" className="fw-semibold">
              تاریخ کار
            </Label>
            <Input
              id="workDate"
              name="workDate"
              type="datetime-local"
              value={formValues.workDate}
              onChange={handleChange}
              className="rounded-pill"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="floor" className="fw-semibold">
              طبقه
            </Label>
            <Input
              id="floor"
              name="floor"
              type="number"
              value={formValues.floor}
              onChange={handleChange}
              placeholder="مثال: 5"
              className="rounded-pill"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="latitude" className="fw-semibold">
              عرض جغرافیایی
            </Label>
            <Input
              id="latitude"
              name="latitude"
              type="number"
              step="any"
              value={formValues.latitude}
              onChange={handleChange}
              placeholder="مثال: 36.565"
              className="rounded-pill"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="longitude" className="fw-semibold">
              طول جغرافیایی
            </Label>
            <Input
              id="longitude"
              name="longitude"
              type="number"
              step="any"
              value={formValues.longitude}
              onChange={handleChange}
              placeholder="مثال: 53.123"
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
              {isLoading ? "در حال ایجاد..." : "ایجاد ساختمان"}
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};

export default CreateBuildingForm;
