import { useState } from "react";
import Sidebar from "@components/sidebar";
import { useForm, Controller } from "react-hook-form";
import { Button, Label, Form, Input } from "reactstrap";
import { useUserDetailPost } from "../../../service/reactQuery/usersQuery";

const defaultValues = {
  lastName: "",
  firstName: "",
  gmail: "",
  password: "",
  phoneNumber: "",
};

const checkIsValid = (data) => {
  return Object.values(data).every((field) => field?.length > 0);
};

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  const [data, setData] = useState(null);

  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const { mutate: createUserMutation, isLoading } = useUserDetailPost();

  const onSubmit = (formData) => {
    setData(formData);
    if (checkIsValid(formData)) {
      const payload = {
        ...formData,
        isStudent: false,
        isTeacher: true,
      };
      createUserMutation(payload, {
        onSuccess: () => toggleSidebar(),
        onError: (err) => {
          console.error("خطا در ثبت کاربر:", err.response?.data || err.message);
        },
      });
    } else {
      for (const key in formData) {
        if (!formData[key]) {
          setError(key, { type: "manual" });
        }
      }
    }
  };

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, "");
    }
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="New User"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        {["firstName", "lastName", "gmail", "password", "phoneNumber"].map(
          (field) => (
            <div className="mb-1" key={field}>
              <Label className="form-label" for={field}>
                {field} <span className="text-danger">*</span>
              </Label>
              <Controller
                name={field}
                control={control}
                render={({ field: inputProps }) => (
                  <Input
                    id={field}
                    type={field === "password" ? "password" : "text"}
                    placeholder={field === "gmail" ? "example@gmail.com" : ""}
                    invalid={errors[field] && true}
                    {...inputProps}
                  />
                )}
              />
            </div>
          )
        )}
        <Button
          type="submit"
          className="me-1"
          color="primary"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
        <Button type="reset" color="secondary" outline onClick={toggleSidebar}>
          Cancel
        </Button>
      </Form>
    </Sidebar>
  );
};

export default SidebarNewUsers;
