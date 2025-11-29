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
import { useTechnologyEdit } from "../../../service/reactQuery/TechnologyQuery";

const EditTechnologyModal = ({ isOpen, toggle, selectedBuilding }) => {
  const [formValues, setFormValues] = useState({
    techName: "<string>",
    parentId: "<integer>",
    describe: "<string>",
    iconAddress: "<string>",
    id: "<integer>",
  });

  useEffect(() => {
    if (selectedBuilding) {
      setFormValues({
        id: selectedBuilding.id ?? "",
        techName: selectedBuilding.techName || "",
        describe: selectedBuilding.describe || "",
        iconAddress: selectedBuilding.iconAddress || "",
      });
    }
  }, [selectedBuilding]);

  const { mutate, isLoading } = useTechnologyEdit();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = () => {
    const payload = {
      techName: formValues.techName.trim(),
      describe: formValues.describe.trim(),
      iconAddress: formValues.iconAddress.trim(),
      id: formValues.id,
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
      <ModalHeader toggle={toggle}>ویرایش فناوری</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="techName">نام </Label>
            <Input
              id="techName"
              name="techName"
              value={formValues.techName}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="describe">توضیحات </Label>
            <Input
              id="describe"
              name="describe"
              value={formValues.describe}
              onChange={handleChange}
            />
          </FormGroup>{" "}
          <FormGroup>
            <Label for="iconAddress">آدرس آیکون</Label>
            <Input
              id="iconAddress"
              name="iconAddress"
              type="file" // file picker
              accept="image/*" // only images
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  // just save the file name or path string
                  setFormValues({
                    ...formValues,
                    iconAddress: file.name, // only the address/name
                  });
                }
              }}
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

export default EditTechnologyModal;
