import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useAssistanceEdit } from "../../../service/reactQuery/AssistanceWorkQuery";

const EditAssistanceModal = ({ isOpen, toggle, selectedAssistance, courseid, userId }) => {
  const { mutate, isLoading } = useAssistanceEdit();

  const handleSubmit = () => {


    const payload = {
      id: selectedAssistance.id,
            userId:selectedAssistance.userId ,
      courseId: courseid.id,

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
        آیا مطمئن هستید می‌خواهید این وظیفه را ویرایش کنید؟
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit} disabled={isLoading}>
          تایید
        </Button>
        <Button color="secondary" onClick={toggle}>
          لغو
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditAssistanceModal;
