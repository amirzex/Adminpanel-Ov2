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
import { useGetCourseGroups } from "../../../service/reactQuery/courseQuery";
import { useSendReserveToCourse } from "../../../service/reactQuery/courseQuery";

const EditAssistanceModal = ({
  isOpen,
  toggle,
  selectedAssistance,
  courseId,
}) => {
  console.log(courseId);
  const teacherId = localStorage.getItem("teacherId");

  const [formValues, setFormValues] = useState({
    courseId: "",
    courseGroupId: "",
    studentId: "",
  });

  useEffect(() => {
    if (selectedAssistance && courseId) {
      setFormValues({
        courseId: courseId.id,
        courseGroupId: selectedAssistance.courseGroupId ?? "",
        studentId: selectedAssistance.studentId ?? "",
      });
    }
  }, [selectedAssistance, courseId]);

  const { data: courseGroups = [], isLoading: groupsLoading } =
    useGetCourseGroups(teacherId, courseId.id);
        console.log(courseGroups);

  const { mutate, isLoading } = useSendReserveToCourse();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const payload = {
      courseId: formValues.courseId,
      courseGroupId: formValues.courseGroupId,
       studentId: String(formValues.studentId || "")
    };

    mutate(payload, {
      onSuccess: () => toggle(),
    });

  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>ویرایش ثبت‌نام</ModalHeader>

      <ModalBody>
        <Form>
          <FormGroup>
            <Label>Course ID</Label>
            <Input value={formValues.courseId} disabled />
          </FormGroup>

          <FormGroup>
            <Label for="courseGroupId">گروه دوره</Label>
            <Input
              type="select"
              id="courseGroupId"
              name="courseGroupId"
              value={formValues.courseGroupId}
              onChange={handleChange}
              disabled={groupsLoading}
            >
              <option value="">انتخاب گروه</option>
              {courseGroups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.groupName}
                </option>
              ))}
            </Input>
          </FormGroup>

          <FormGroup>
            <Label>Student ID</Label>
            <Input value={formValues.studentId} disabled />
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
