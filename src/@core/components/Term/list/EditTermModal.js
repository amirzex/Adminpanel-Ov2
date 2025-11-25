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
import { useTermEdit } from "../../../service/reactQuery/TermQuery";

const EditTermModal = ({ isOpen, toggle, selectedBuilding }) => {
  const [formValues, setFormValues] = useState({
    id: "",
    termName: "",
    departmentId: "",
    startDate: "2025-11-14T00:00:00.000Z",
    endDate: "2025-12-14T00:00:00.000Z",
    expire: false,
  });

  useEffect(() => {
    if (selectedBuilding) {
      setFormValues({
        id: selectedBuilding.id ?? "",
        termName: selectedBuilding.termName || "",
        departmentId: selectedBuilding.departmentId || "",
        startDate: selectedBuilding.startDate || "",
        endDate: selectedBuilding.endDate || "",
        expire: selectedBuilding.expire ?? false,
      });
    }
  }, [selectedBuilding]);

  const { mutate, isLoading } = useTermEdit();

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
      termName: formValues.termName.trim(),
      departmentId: String(formValues.departmentId).trim(),
      startDate: new Date(formValues.startDate).toISOString(),
      endDate: new Date(formValues.endDate).toISOString(),
      expire: formValues.expire,
    };

    console.log("Edit payload:", payload);

    mutate(payload, {
      onSuccess: () => {
        toggle();
      },
      onError: (error) => {
        console.error("Error editing Technology:", error.message);
      },
    });
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>ویرایش ترم</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="termName">نام ترم</Label>
            <Input
              id="termName"
              name="termName"
              value={formValues.termName}
              onChange={handleChange}
              placeholder="مثال: پاییز 1404"
            />
          </FormGroup>

          <FormGroup>
            <Label for="startDate">تاریخ شروع</Label>
            <Input
              id="startDate"
              name="startDate"
              type="datetime-local"
              value={formValues.startDate?.slice(0, 16)} // format for input
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="endDate">تاریخ پایان</Label>
            <Input
              id="endDate"
              name="endDate"
              type="datetime-local"
              value={formValues.endDate?.slice(0, 16)}
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

export default EditTermModal;
