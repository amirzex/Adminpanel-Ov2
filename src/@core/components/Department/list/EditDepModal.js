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
import { useDepartmentEdit } from "../../../service/reactQuery/DepartmentQuery";

const EditDepModal = ({ isOpen, toggle, selectedBuilding }) => {
  const [formValues, setFormValues] = useState({
    id: "",
    depName: "",
    buildingId: "",
  });

  useEffect(() => {
    if (selectedBuilding) {
      setFormValues({
        id: selectedBuilding.id ?? "",
        depName: selectedBuilding.depName || "",
        buildingId: selectedBuilding.buildingId ?? "",
      });
    }
  }, [selectedBuilding]);

  const { mutate, isLoading } = useDepartmentEdit();

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
      depName: formValues.depName.trim(),
      buildingId: formValues.buildingId ? formValues.buildingId.toString() : "",
    };

    console.log("Edit payload:", payload);

    mutate(payload, {
      onSuccess: () => {
        toggle();
      },
      onError: (error) => {
        console.error("Error editing Department:", error.message);
      },
    });
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>ویرایش کلاس</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="depName">نام </Label>
            <Input
              id="depName"
              name="depName"
              value={formValues.depName}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="buildingId">شناسه ساختمان </Label>
            <Input
              id="buildingId"
              name="buildingId"
              value={formValues.buildingId}
              onChange={handleChange}
            />
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

export default EditDepModal;
