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
import { useStatusEdit } from "../../../service/reactQuery/StatusQuery";

const EditStatusModal = ({ isOpen, toggle, selectedBuilding }) => {
  const [formValues, setFormValues] = useState({
    statusName: "",
    describe: "",
    statusNumber: "",
  });


  useEffect(() => {
    if (selectedBuilding) {
      setFormValues({
        id: selectedBuilding.id ?? "",
        statusName: selectedBuilding.statusName || "",
        describe: selectedBuilding.describe || "",
        statusNumber: selectedBuilding.statusNumber ?? "",
      });
    }
  }, [selectedBuilding]);

  const { mutate, isLoading } = useStatusEdit();

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
      statusName: formValues.statusName.trim(),
      describe: formValues.describe.trim(),
      statusNumber: formValues.statusNumber ? parseInt(formValues.floor, 10) : null, 
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
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>ویرایش ساختمان</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="statusName">نام وضعیت </Label>
            <Input
              id="statusName"
              name="statusName"
              value={formValues.statusName}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="describe">توضیحات</Label>
            <Input
              id="describe"
              name="describe"
              value={formValues.describe}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="statusNumber"> شماره وضعیت</Label>
            <Input
              id="statusNumber"
              name="statusNumber"
              value={formValues.statusNumber}
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

export default EditStatusModal;
