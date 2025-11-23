import { Form, FormGroup, Label, Input, Button } from "reactstrap";
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
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="id">شناسه</Label>
        <Input
          id="id"
          name="id"
          type="number"
          value={formValues.id}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label for="buildingName"> نام ساختمان</Label>
        <Input
          id="buildingName"
          name="buildingName"
          value={formValues.buildingName}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label for="workDate">تاریخ کار</Label>
        <Input
          id="workDate"
          name="workDate"
          type="datetime-local"
          value={formValues.workDate}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label for="floor">طبقه</Label>
        <Input
          id="floor"
          name="floor"
          type="number"
          value={formValues.floor}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label for="latitude">عرض جغرافیایی</Label>
        <Input
          id="latitude"
          name="latitude"
          type="number"
          step="any"
          value={formValues.latitude}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label for="longitude">طول جغرافیایی</Label>
        <Input
          id="longitude"
          name="longitude"
          type="number"
          step="any"
          value={formValues.longitude}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <Button color="primary" type="submit" disabled={isLoading}>
        ایجاد ساختمان
      </Button>
    </Form>
  );
};

export default CreateBuildingForm;
