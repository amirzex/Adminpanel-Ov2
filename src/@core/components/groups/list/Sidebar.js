import { useState } from "react";
import {
  Button,
  Label,
  Input,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
} from "reactstrap";
import { AddcourseGroup } from "../../../service/reactQuery/group";

const Sidebar = ({ open, toggleSidebar, refetch }) => {
  const [groupName, setGroupName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!groupName || !courseId) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("GroupName", groupName);
    formData.append("CourseId", courseId);

    try {
      await AddcourseGroup(formData); // ✅ فقط همین
      toggleSidebar();               // بستن سایدبار
      refetch();                     // رفرش جدول
      setGroupName("");
      setCourseId("");
    } catch (err) {
      console.error("خطا در ثبت گروه", err);
      alert("ثبت گروه با خطا مواجه شد");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Offcanvas isOpen={open} toggle={toggleSidebar} direction="end">
      <OffcanvasHeader toggle={toggleSidebar}>
        اضافه کردن گروه جدید
      </OffcanvasHeader>

      <OffcanvasBody>
        <div className="mb-1">
          <Label>نام گروه</Label>
          <Input
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="مثلاً گروه React مقدماتی"
          />
        </div>

        <div className="mb-1">
          <Label>Course ID</Label>
          <Input
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            placeholder="Course UUID"
          />
        </div>

        <Button
          color="primary"
          className="mt-2"
          block
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "در حال ثبت..." : "ثبت گروه"}
        </Button>
      </OffcanvasBody>
    </Offcanvas>
  );
};

export default Sidebar;
