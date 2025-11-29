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
import { useClassRoomCreate } from "../../../service/reactQuery/ClassRoomQuery.js";
import { useBuildingDetail } from "../../../service/reactQuery/BuildingQuery.js";

const CreateClassRoomForm = ({ onSuccess }) => {
  const [formValues, setFormValues] = useState({
    id: "1",
    classRoomName: "",
    capacity: "",
    buildingId: "",
  });

  const { mutate, isLoading } = useClassRoomCreate();
  const { data } = useBuildingDetail();
  console.log("build:", data);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      classRoomName: String(formValues.classRoomName).trim(),
      capacity: String(formValues.capacity), // force string
      buildingId: String(formValues.buildingId), // force string
    };

    console.log("Payload being sent:", JSON.stringify(payload, null, 2));

    mutate(payload, {
      onSuccess: () => {
        if (onSuccess) onSuccess();
        setFormValues({
          classRoomName: "",
          capacity: "",
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
        ایجاد کلاس جدید
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="classRoomName" className="fw-semibold">
              نام کلاس
            </Label>
            <Input
              id="classRoomName"
              name="classRoomName"
              value={formValues.classRoomName}
              onChange={handleChange}
              placeholder="مثال: برج آسمان"
              className="rounded-pill"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="capacity" className="fw-semibold">
              ظرفیت{" "}
            </Label>
            <Input
              id="capacity"
              name="capacity"
              value={formValues.capacity}
              onChange={handleChange}
              className="rounded-pill"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="buildingId" className="fw-semibold">
              ساختمان
            </Label>
            <Input
              type="select"
              id="buildingId"
              name="buildingId"
              value={formValues.buildingId}
              onChange={handleChange}
              className="rounded-pill"
              required
            >
              <option value="">یک ساختمان انتخاب کنید</option>
              {data?.map((building) => (
                <option key={building.id} value={building.id}>
                  {building.buildingName}
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
              {isLoading ? "در حال ایجاد..." : "ایجاد کلاس"}
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};

export default CreateClassRoomForm;
