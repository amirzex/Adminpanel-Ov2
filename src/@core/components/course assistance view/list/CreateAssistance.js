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
import { useAssistanceCreate } from "../../../service/reactQuery/AssistanceWorkQuery.js";

const CreateWorkForm = ({ onSuccess }) => {
  const [formValues, setFormValues] = useState({
    // id: "",
    worktitle: "",
    workDescribe: "",
    assistanceId: "",
    workDate: "",
  });

  const { mutate, isLoading } = useAssistanceCreate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
    //   id: formValues.id, 
      worktitle: formValues.worktitle, 
      workDescribe: formValues.workDescribe,
      assistanceId: formValues.assistanceId,
      workDate: new Date(formValues.workDate).toISOString(), // ISO string
    };

    console.log("Payload being sent:", payload);

    mutate(payload, {
      onSuccess: () => {
        if (onSuccess) onSuccess();
        setFormValues({
        //   id: "",
          worktitle: "",
          workDescribe: "",
          assistanceId: "",
          workDate: "",
        });
      },
      onError: (error) => {
        console.error("Error creating work:", error.message);
      },
    });
  };

  return (
    <Card className="shadow-lg border-0 rounded-3">
      <CardHeader className="bg-primary text-white text-center fw-bold fs-5">
        ایجاد کار جدید
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          {/* <FormGroup>
            <Label for="id" className="fw-semibold">
              شناسه
            </Label>
            <Input
              id="id"
              name="id"
              type="text"
              value={formValues.id}
              onChange={handleChange}
              placeholder="مثال: 1"
              className="rounded-pill"
              required
            />
          </FormGroup> */}

          <FormGroup>
            <Label for="worktitle" className="fw-semibold">
              عنوان کار
            </Label>
            <Input
              id="worktitle"
              name="worktitle"
              value={formValues.worktitle}
              onChange={handleChange}
              placeholder="مثال: طراحی فرم"
              className="rounded-pill"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="workDescribe" className="fw-semibold">
              توضیحات کار
            </Label>
            <Input
              id="workDescribe"
              name="workDescribe"
              type="textarea"
              rows="3"
              value={formValues.workDescribe}
              onChange={handleChange}
              placeholder="توضیحات مختصر درباره کار..."
              className="rounded-3"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="assistanceId" className="fw-semibold">
              شناسه کمک
            </Label>
            <Input
              id="assistanceId"
              name="assistanceId"
              value={formValues.assistanceId}
              onChange={handleChange}
              placeholder="شناسه مرتبط"
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

          <div className="text-center mt-4">
            <Button
              color="success"
              type="submit"
              disabled={isLoading}
              className="px-5 rounded-pill fw-bold"
            >
              {isLoading ? "در حال ایجاد..." : "ایجاد کار"}
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};

export default CreateWorkForm;
