import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Row,
  Col,
  Input,
  Label
} from "reactstrap";

import { EditcourseGroup } from "../../../service/reactQuery/group";

const UserEditModal = ({ open, toggle, data, onSuccess }) => {
  const [form, setForm] = useState({
    Id: "",
    GroupName: "",
    CourseId: "",
    GroupCapacity: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setForm({
        Id: data.id,
        GroupName: data.groupName,
        CourseId: data.courseId,
        GroupCapacity: data.groupCapacity,
      });
    }
  }, [data]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await EditcourseGroup(form);
      onSuccess();
      toggle();
    } catch {
      alert("خطا در ویرایش گروه");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>ویرایش گروه</ModalHeader>
      <ModalBody>
        <Row>
          <Col md={12}>
            <Label>نام گروه</Label>
            <Input
              value={form.GroupName}
              onChange={(e) =>
                setForm({ ...form, GroupName: e.target.value })
              }
            />
          </Col>

          <Col md={12} className="mt-1">
            <Label>Course ID</Label>
            <Input
              type="number"
              value={form.CourseId}
              onChange={(e) =>
                setForm({ ...form, CourseId: e.target.value })
              }
            />
          </Col>

          <Col md={12} className="mt-1">
            <Label>ظرفیت گروه</Label>
            <Input
              type="number"
              value={form.GroupCapacity}
              onChange={(e) =>
                setForm({ ...form, GroupCapacity: e.target.value })
              }
            />
          </Col>
        </Row>

        <Button
          color="primary"
          className="mt-2"
          block
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </Button>
      </ModalBody>
    </Modal>
  );
};


export default UserEditModal;
