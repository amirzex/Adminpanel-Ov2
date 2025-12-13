// ** React Imports
import { useState, Fragment } from "react";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Button,
  Badge,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader,
} from "reactstrap";

// ** Third Party Components
import Swal from "sweetalert2";
import Select from "react-select";
import { Check, Briefcase, X } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { updateUserDetail } from "../../../service/api/Getuserlist/Adminuserlist";
import { stringify } from "postcss";

const roleColors = {
  editor: "light-info",
  admin: "light-danger",
  author: "light-warning",
  maintainer: "light-success",
  subscriber: "light-primary",
};

const statusColors = {
  active: "light-success",
  pending: "light-warning",
  inactive: "light-secondary",
};

const statusOptions = [
  { value: true, label: "فعال" },
  { value: false, label: "غیرفعال" },
];

const roleOptions = [
  { value: "student", label: "دانشجو" },
  { value: "teacher", label: "مدرس" },
];

const twoStepAuthOptions = [
  { value: true, label: "بله" },
  { value: false, label: "خیر" },
];

const isDeleteOptions = [
  { value: true, label: "بله" },
  { value: false, label: "خیر" },
];

const genderOptions = [
  { value: true, label: "مرد" },
  { value: false, label: "زن" },
];

const MySwal = withReactContent(Swal);

const UserInfoCard = ({ selectedUser }) => {
  // ** State
  const [show, setShow] = useState(false);
  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: selectedUser.username,
      lastName: selectedUser.fullName.split(" ")[1],
      firstName: selectedUser.fullName.split(" ")[0],
    },
  });

  // ** render user img
  const renderUserImg = () => {
    if (!selectedUser) return null;

    const { avatar, fullName, avatarColor = "light-primary" } = selectedUser;
    const avatarSize = { height: 110, width: 110 };

    return avatar?.length ? (
      <img
        {...avatarSize}
        alt={`${fullName || "User"} avatar`}
        src={avatar}
        className="img-fluid rounded mt-3 mb-2"
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />
    ) : (
      <Avatar
        initials
        color={avatarColor}
        className="rounded mt-3 mb-2"
        content={fullName}
        contentStyles={{
          borderRadius: 0,
          fontSize: "calc(48px)",
          width: "100%",
          height: "100%",
        }}
        style={avatarSize}
      />
    );
  };

  const handleSubmiT = async (formData) => {
    try {
      // Validation: check all fields are filled
      if (
        !Object.values(formData).every(
          (field) => field !== undefined && field !== null && field !== ""
        )
      ) {
        setShow(false);
        Object.keys(formData).forEach((key) => {
          if (!formData[key]) {
            setError(key, { type: "manual" });
          }
        });
        return { success: false, error: "Please fill all required fields" };
      }

      const Dataforsend = {
        id: selectedUser.id,
        fName: formData.fname,
        lName: formData.lName,
        userName: formData.userName,
        gmail: formData.gmail,
        recoveryEmail: formData.recoveryEmail,
        phoneNumber: formData.phoneNumber,
        nationalCode: formData.nationalCode,
        userAbout: formData.userAbout,
        homeAdderess: formData.homeAdderess,
        birthDay: new Date(formData.birthDay).toISOString(),

        active: true,
        isDelete: false,
        gender: true,
        twoStepAuth: false,

        isTecher: true,
        isStudent: true,

        currentPictureAddress: selectedUser.avatar,

        insertDate: selectedUser.insertDate,
      };

      try {
        await updateUserDetail(Dataforsend);
        setShow(false);
        refetch();
      } catch (err) {
        console.error(" Update Error:", err);
      }

      setShow(false);
      return { success: true, data: await response.json() };
    } catch (error) {
      const errorMap = {
        400: `Invalid data: ${
          error.response?.data?.message || "Check your input"
        }`,
        401: "Session expired - Please login again",
        403: "You don't have permission to update this user",
        404: "User not found",
        500: "Server error - Please try again later",
      };

      const errorMessage = error.response
        ? errorMap[error.response.status] || "An error occurred"
        : error.request
        ? "No response from server"
        : error.message;

      return { success: false, error: errorMessage };
    }
  };

  const handleReset = () => {
    reset({
      username: selectedUser.username,
      lastName: selectedUser.fullName?.split(" ")[1] || "",
      firstName: selectedUser.fullName?.split(" ")[0] || "",
    });
  };



  const handleSuspendedClick = () => {
    return MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Suspend user!",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        MySwal.fire({
          icon: "success",
          title: "Suspended!",
          text: "User has been suspended.",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "Cancelled",
          text: "Cancelled Suspension :)",
          icon: "error",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderUserImg()}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>
                    {selectedUser !== null
                      ? selectedUser.fullName
                      : "Eleanor Aguilar"}
                  </h4>
                  {selectedUser !== null ? (
                    <Badge
                      color={roleColors[selectedUser.role]}
                      className="text-capitalize"
                    >
                      {selectedUser.role}
                    </Badge>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">جزئیات</h4>
          <div className="info-container">
            {selectedUser !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">نام کاربری:</span>
                  <span>{selectedUser.username}</span>
                </li>
                <li className="mb-75 ">
                  <span className="fw-bolder me-25">ایمیل:</span>
                  <span>{selectedUser.email}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">وضعیت:</span>
                  <Badge
                    className="text-capitalize"
                    color={statusColors[selectedUser.status]}
                  >
                    {selectedUser.status}
                  </Badge>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">نقش:</span>
                  <span className="text-capitalize">{selectedUser.role}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">شناسه مالیاتی:</span>
                  <span>
                    Tax-
                    {selectedUser.contact.substr(
                      selectedUser.contact.length - 4
                    )}
                  </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">تماس:</span>
                  <span>{selectedUser.contact}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">زبان:</span>
                  <span>English</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">کشور:</span>
                  <span>England</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={() => setShow(true)}>
              ویرایش
            </Button>
            <Button
              className="ms-1"
              color="danger"
              outline
              onClick={handleSuspendedClick}
            >
              تعلیق
            </Button>
          </div>
        </CardBody>
      </Card>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">ویرایش اطلاعات کاربر</h1>
            <p>
              به‌روزرسانی جزئیات کاربر، یک ممیزی حریم خصوصی دریافت خواهد کرد.
            </p>
          </div>
          <Form onSubmit={handleSubmit(handleSubmiT)}>
            <Row className="gy-1 pt-75">
              <Col md={6} xs={12}>
                <Label className="form-label" for="fname">
                  نام
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="fname"
                  name="fname"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="fname"
                      placeholder="Doe"
                      invalid={errors.fname && true}
                      onChange={(e) =>
                        field.onChange(e.target.value.toString())
                      }
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="lName">
                  نام خانوادگی
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="lName"
                  name="lName"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="lName"
                      placeholder="Doe"
                      invalid={errors.lName && true}
                      onChange={(e) =>
                        field.onChange(e.target.value.toString())
                      }
                    />
                  )}
                />
              </Col>
              <Col xs={6}>
                <Label className="form-label" for="userName">
                  نام کاربری
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="userName"
                  name="userName"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="userName"
                      placeholder="Username"
                      invalid={errors.userName && true}
                      onChange={(e) =>
                        field.onChange(e.target.value.toString())
                      }
                    />
                  )}
                />
              </Col>
              <Col xs={6}>
                <Label className="form-label" for="nationalCode">
                  کد ملی
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="nationalCode"
                  name="nationalCode"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="nationalCode"
                      placeholder="nationalCode"
                      invalid={errors.nationalCode && true}
                    />
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className="form-label" for="userAbout">
                  درباره کاربر
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="userAbout"
                  name="userAbout"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="userAbout"
                      placeholder="userAbout"
                      onChange={(e) =>
                        field.onChange(e.target.value.toString())
                      }
                      invalid={errors.userAbout && true}
                    />
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className="form-label" for="homeAdderess">
                  آدرس خانه
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="homeAdderess"
                  name="homeAdderess"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="homeAdderess"
                      placeholder="homeAdderess"
                      invalid={errors.homeAdderess && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="gmail">
                  gmail
                </Label>
                <Controller
                  defaultValue={selectedUser.gmail || ""}
                  control={control}
                  id="gmail"
                  name="gmail"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="email" // Changed from 'gmail' to standard 'email' type
                      id="gmail"
                      placeholder="example@domain.com"
                      onChange={(e) =>
                        field.onChange(e.target.value.toString())
                      }
                      invalid={errors.gmail && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="recoveryEmail">
                  recoveryEmail
                </Label>
                <Controller
                  defaultValue={selectedUser.recoveryEmail || ""}
                  control={control}
                  id="recoveryEmail"
                  name="recoveryEmail"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="recoveryEmail"
                      id="recoveryEmail"
                      placeholder="example@domain.com"
                      onChange={(e) =>
                        field.onChange(e.target.value.toString())
                      }
                      invalid={errors.recoveryEmail && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="phoneNumber">
                  شماره تلفن
                </Label>
                <Controller
                  defaultValue={selectedUser.phoneNumber || ""}
                  control={control}
                  id="phoneNumber"
                  name="phoneNumber"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="phoneNumber"
                      placeholder="phoneNumber"
                      onChange={(e) =>
                        field.onChange(e.target.value.toString())
                      }
                      invalid={errors.phoneNumber && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="birthDay">
                  تاریخ تولد
                </Label>
                <Controller
                  control={control}
                  name="birthDay"
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="date"
                      id="birthDay"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                      invalid={!!errors.birthDay}
                    />
                  )}
                />
                {errors.birthDay && (
                  <FormFeedback>{errors.birthDay.message}</FormFeedback>
                )}
              </Col>
              {/* 
              <Col md={6} xs={12}>
                <Label className="form-label d-block" for="active">
                  وضعیت:
                </Label>
                {statusOptions.map((isactive) => (
                  <div
                    className="form-check form-check-inline"
                    key={isactive.value}
                  >
                    <Input
                      type="checkbox"
                      id={`isactive-${isactive.value}`}
                      name="active"
                      value={isactive.value}
                      className="form-check-input"
                      onChange={handleActiveChange}
                      checked={selectedActive.includes(isactive.value)}
                    />
                    <Label
                      className="form-check-label"
                      for={`isactive-${isactive.value}`}
                    >
                      {isactive.label}
                    </Label>
                  </div>
                ))}
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label d-block" for="isDelete">
                  حذف
                </Label>
                {isDeleteOptions.map((isdelete) => (
                  <div
                    className="form-check form-check-inline"
                    key={isdelete.value}
                  >
                    <Input
                      type="checkbox"
                      id={`isdelete-${isdelete.value}`}
                      name="isDelete"
                      value={isdelete.value}
                      className="form-check-input"
                      onChange={handleDeleteChange}
                      checked={SelectedDelete.includes(isdelete.value)}
                    />
                    <Label
                      className="form-check-label"
                      for={`isdelete-${isdelete.value}`}
                    >
                      {isdelete.label}
                    </Label>
                  </div>
                ))}
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label d-block" for="gender">
                  جنسیت
                </Label>
                {genderOptions.map((gender) => (
                  <div
                    className="form-check form-check-inline"
                    key={gender.value}
                  >
                    <Input
                      type="checkbox"
                      id={`gender-${gender.value}`}
                      name="gender"
                      value={gender.value}
                      className="form-check-input"
                      onChange={handleGenderChange}
                      checked={selectedGender.includes(gender.value)}
                    />
                    <Label
                      className="form-check-label"
                      for={`gender-${gender.value}`}
                    >
                      {gender.label}
                    </Label>
                  </div>
                ))}
              </Col>

              <Col md={6} xs={12}>
                <Label className="form-label d-block" for="twoStepAuth">
                  تایید دو مرحله‌ای
                </Label>
                {twoStepAuthOptions.map((option) => (
                  <div
                    className="form-check2 form-check-inline"
                    key={option.value}
                  >
                    <Input
                      type="checkbox"
                      id={`twoStepAuth-${option.value}`}
                      name="twoStepAuth"
                      value={option.value}
                      className="form-check-input"
                      onChange={handleStepChange}
                      checked={selectedStep.includes(option.value)}
                    />
                    <Label
                      className="form-check-label"
                      for={`twoStepAuth-${option.value}`}
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label d-block" for="role">
                  نقش
                </Label>
                {roleOptions.map((role) => (
                  <div
                    className="form-check form-check-inline"
                    key={role.value}
                  >
                    <Input
                      type="checkbox"
                      id={`role-${role.value}`}
                      name="roles"
                      value={role.value}
                      className="form-check-input"
                      onChange={handleRoleChange}
                      checked={selectedRoles.includes(role.value)}
                    />
                    <Label
                      className="form-check-label"
                      for={`role-${role.value}`}
                    >
                      {role.label}
                    </Label>
                  </div>
                ))}
              </Col>
              <Col xs={12}>
                <div className="d-flex align-items-center mt-1">
                  <div className="form-switch">
                    <Input
                      type="switch"
                      defaultChecked
                      id="billing-switch"
                      name="billing-switch"
                    />
                    <Label
                      className="form-check-label"
                      htmlFor="billing-switch"
                    >
                      <span className="switch-icon-left">
                        <Check size={14} />
                      </span>
                      <span className="switch-icon-right">
                        <X size={14} />
                      </span>
                    </Label>
                  </div>
                  <Label
                    className="form-check-label fw-bolder"
                    for="billing-switch"
                  >
                    به عنوان آدرس صورتحساب استفاده شود؟
                  </Label>
                </div>
              </Col> */}
              <Col xs={12} className="text-center mt-2 pt-50">
                <Button
                  type="submit"
                  className="me-1"
                  color="primary"
                  // onSubmit={handleSubmiT}
                >
                  Submit
                </Button>
                <Button
                  type="reset"
                  color="secondary"
                  outline
                  onClick={() => {
                    handleReset();
                    setShow(false);
                  }}
                >
                  Discard
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default UserInfoCard;
