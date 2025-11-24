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
import { useAssistanceEdit } from "../../../service/reactQuery/AssistanceWorkQuery";

const EditAssistanceModal = ({ isOpen, toggle, selectedAssistance }) => {
  const [formValues, setFormValues] = useState({
    id: "",
    worktitle: "",
    workDescribe: "",
    assistanceId: "",
    workDate: "",
  });

  // preload values when modal opens
  useEffect(() => {
    if (selectedAssistance) {
      setFormValues({
        id: selectedAssistance.id ?? "",
        worktitle: selectedAssistance.worktitle || "",
        workDescribe: selectedAssistance.workDescribe || "",
        assistanceId: selectedAssistance.assistanceId ?? "",
        workDate: selectedAssistance.workDate
          ? new Date(selectedAssistance.workDate).toISOString().slice(0, 16) // for datetime-local input
          : "",
      });
    }
  }, [selectedAssistance]);

  const { mutate, isLoading } = useAssistanceEdit();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const payload = {
      id: formValues.id,
      worktitle: formValues.worktitle.trim(),
      workDescribe: formValues.workDescribe.trim(),
      assistanceId: formValues.assistanceId,
      workDate: formValues.workDate
        ? new Date(formValues.workDate).toISOString()
        : null,
    };

    console.log("Edit Assistance payload:", payload);

    mutate(payload, {
      onSuccess: () => {
        toggle();
      },
      onError: (error) => {
        console.error("Error editing assistance:", error.message);
      },
    });
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>ویرایش وظیفه</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="worktitle">عنوان کار</Label>
            <Input
              id="worktitle"
              name="worktitle"
              value={formValues.worktitle}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="workDescribe">توضیحات</Label>
            <Input
              id="workDescribe"
              name="workDescribe"
              value={formValues.workDescribe}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="assistanceId">شناسه دستیار</Label>
            <Input
              id="assistanceId"
              name="assistanceId"
              value={formValues.assistanceId}
              onChange={handleChange}
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

export default EditAssistanceModal;
