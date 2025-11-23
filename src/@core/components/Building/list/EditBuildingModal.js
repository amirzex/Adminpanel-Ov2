import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { useState, useEffect } from "react";
import { useBuildingEdit } from "../../../service/reactQuery/BuildingQuery";

const EditBuildingModal = ({ isOpen, toggle, selectedBuilding }) => {
  const [formValues, setFormValues] = useState({
    id: "",
    buildingName: "",
    floor: "",
    latitude: "",
    longitude: "",
    active: false,
  });


  // preload values when modal opens
  useEffect(() => {
    if (selectedBuilding) {
      setFormValues({
        id: selectedBuilding.id ?? "",
        buildingName: selectedBuilding.buildingName || "",
        floor: selectedBuilding.floor ?? "",
        latitude: selectedBuilding.latitude ?? "",
        longitude: selectedBuilding.longitude ?? "",
        active: selectedBuilding.active ?? false,
      });
    }
  }, [selectedBuilding]);

  const { mutate, isLoading } = useBuildingEdit();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = () => {
    const payload = {
      id: formValues.id, // keep as string UUID
      buildingName: formValues.buildingName.trim(),
      floor: formValues.floor ? parseInt(formValues.floor, 10) : null, // integer
      latitude: formValues.latitude ? formValues.latitude.toString() : "",
      longitude: formValues.longitude ? formValues.longitude.toString() : "",
      active: !!formValues.active, // boolean
    };

    console.log("Edit payload:", payload);

    mutate(payload, {
      onSuccess: () => {
        toggle();
      },
      onError: (error) => {
        console.error("Error editing building:", error.message);
      },
    });
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} >
      <ModalHeader toggle={toggle}>ویرایش ساختمان</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="buildingName">نام ساختمان</Label>
            <Input
              id="buildingName"
              name="buildingName"
              value={formValues.buildingName}
              onChange={handleChange}
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
            />
          </FormGroup>

          <FormGroup>
            <Label for="latitude">عرض جغرافیایی</Label>
            <Input
              id="latitude"
              name="latitude"
              value={formValues.latitude}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="longitude">طول جغرافیایی</Label>
            <Input
              id="longitude"
              name="longitude"
              value={formValues.longitude}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="active"
                checked={formValues.active}
                onChange={handleChange}
              />
              Active
            </Label>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit} disabled={isLoading}>
          ذخیره
        </Button>
        <Button color="secondary" onClick={toggle}>
          لغو
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditBuildingModal;
