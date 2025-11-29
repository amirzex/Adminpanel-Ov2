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
import { useClassRoomEdit } from "../../../service/reactQuery/ClassRoomQuery";
import { useBuildingDetail } from "../../../service/reactQuery/BuildingQuery";

const EditRoomModal = ({ isOpen, toggle, selectedBuilding }) => {
  const { data } = useBuildingDetail();

  const [formValues, setFormValues] = useState({
    id: "",
    classRoomName: "",
    capacity: "",
    buildingId: "",
  });

  useEffect(() => {
    if (selectedBuilding) {
      setFormValues({
        id: selectedBuilding.id ?? "",
        classRoomName: selectedBuilding.classRoomName || "",
        capacity: selectedBuilding.capacity ?? "",
        buildingId: selectedBuilding.buildingId ?? "",
      });
    }
  }, [selectedBuilding]);

  const { mutate, isLoading } = useClassRoomEdit();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = () => {
    const payload = {
      id: formValues.id,
      classRoomName: formValues.classRoomName.trim(),
      capacity: formValues.capacity ? parseInt(formValues.capacity) : null,
      buildingId: formValues.buildingId ? formValues.buildingId.toString() : "",
    };

    console.log("Edit payload:", payload);

    mutate(payload, {
      onSuccess: () => {
        toggle();
      },
      onError: (error) => {
        console.error("Error editing classRoom:", error.message);
      },
    });
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>ویرایش کلاس</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="classRoomName">نام کلاس</Label>
            <Input
              id="classRoomName"
              name="classRoomName"
              value={formValues.classRoomName}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="capacity">ظرفیت</Label>
            <Input
              id="capacity"
              name="capacity"
              type="number"
              value={formValues.capacity}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="buildingId">شناسه ساختمان</Label>
            <Input
              type="select"
              id="buildingId"
              name="buildingId"
              value={formValues.buildingId}
              onChange={handleChange}
            >
              <option value="">انتخاب ساختمان...</option>
              {data?.map((building) => (
                <option key={building.id} value={building.id}>
                  {building.buildingName}
                </option>
              ))}
            </Input>
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

export default EditRoomModal;
