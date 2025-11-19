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
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "suspended", label: "Suspended" },
];

const roleOptions = [
  { isStudent: "student", label: "Student" },
  { isTecher: "teacher", label: "teacher" },
  // Add more roles if needed, e.g.:
  // { value: 'teacher', label: 'Teacher' }
];

const twoStepAuthOptions = [
  { value: "yes", label: "yes" },
  { value: "no", label: "no" },
  // { value: 'french', label: 'French' },
  // { value: 'german', label: 'German' },
  // { value: 'dutch', label: 'Dutch' }
];

const isDeleteOptions = [
  { value: "yes", label: "yes" },
  { value: "no", label: "no" },
];

const genderOptions = [
  { value: true, label: "male" },
  { value: false, label: "female" },
];

const MySwal = withReactContent(Swal);

const UserInfoCard = ({ selectedUser }) => {
  // ** State
  const [show, setShow] = useState(false);

  // update user information
  // const handleupdate = async (formData) => {
  //   try {

  //     if (!formData?.id) {
  //       throw new Error("User ID is required for update");
  //     }
  //           const userData = {

  //             id: selectedUser.id, //1200312000
  //             fName: string(formData.fname) ,
  //             lName: string(formData.lName),
  //             userName: string(formData.username),
  //             gmail: string(formData.gmail),
  //             phoneNumber: string(formData.phoneNumber),
  //             active: true, //1200312000
  //             isDelete: false, //1200312000
  //             isTecher: false, //1200312000
  //             isStudent: true, //1200312000
  //             recoveryEmail: string(formData.recoveryEmail),
  //             twoStepAuth: true, //1200312000
  //             userAbout: string(formData.userAbout),
  //             currentPictureAddress: formData.currentPictureAddress,
  //             linkdinProfile: formData.linkdinProfile,
  //             telegramLink: formData.telegramLink,
  //             receiveMessageEvent: true, //1200312000
  //             homeAdderess: formData.homeAdderess,
  //             nationalCode: formData.nationalCode,
  //             gender: true, //1200312000
  //             latitude: formData.latitude,
  //             longitude: formData.longitude,
  //             insertDate: formData.insertDate, //1200312000
  //             birthDay: string(formData.birthDay), //1200312000

  //             roles: formData.roles[
  //               {
  //                 id: formData.id, //1200312000
  //                 roleName: formData.roleName,
  //                 roleParentName: formData.roleParentName
  //               },
  //               {
  //                 id: formData.id, //1200312000
  //                 roleName: formData.roleName,
  //                 roleParentName: formData.roleParentName
  //               }
  //               ],
  //               courses: formData.courses[
  //                 {
  //                   title: formData.title,
  //                   describe: formData.describe,
  //                   tumbImageAddress: formData.tumbImageAddress,
  //                   lastUpdate: formData.lastUpdate, //1200312000
  //                   courseId: formData.courseId //1200312000
  //                 }
  //               ],
  //               coursesReseves: formData.coursesReseves [
  //                 {
  //                   reserveId: formData.reserveId, //1200312000
  //                   courseId: formData.courseId, //1200312000
  //                   courseName: formData.courseName,
  //                   studentId: formData.studentId, //1200312000
  //                   studentName: formData.studentName,
  //                   reserverDate: formData.reserverDate, //1200312000
  //                   accept: true //1200312000
  //                 }
  //               ],
  //               userProfileId: formData.userProfileId //1200312000
  //                 };

  //     const response = await updateUserDetail(userData);

  //     console.log('Update successful:', response);

  //     return { success: true, data: response.data };

  //   } catch (error) {

  //     let errorMessage = "An error occurred during update";

  //     if (error.response) {
  //       switch (error.response.status) {
  //         case 400:
  //           errorMessage = `Invalid data: ${error.response.data?.message || "Check your input"}`;
  //           break;
  //         case 401:
  //           errorMessage = "Session expired - Please login again";
  //           break;
  //         case 403:
  //           errorMessage = "You don't have permission to update this user";
  //           break;
  //         case 404:
  //           errorMessage = "User not found";
  //           break;
  //         case 500:
  //           errorMessage = "Server error - Please try again later";
  //           break;
  //       }
  //     } else if (error.request) {
  //       errorMessage = "No response from server - Check your connection";
  //     } else {
  //       errorMessage = error.message || errorMessage;
  //     }

  //     return { success: false, error: errorMessage };
  //   }
  // }

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
      if (!Object.values(formData).every((field) => field?.length > 0)) {
        setShow(false);
        Object.keys(formData).forEach((key) => {
          if (!formData[key]?.length) {
            setError(key, { type: "manual" });
          }
        });
        return { success: false, error: "Please fill all required fields" };
      }

      const userData = {
        id: selectedUser.id,
        fName: String(formData.fname),
        lName: String(formData.lName),
        userName: String(formData.username),

        gmail: String(formData.gmail || ""),
        phoneNumber: String(formData.phoneNumber || ""),
        active: true,
        isDelete: false,
        isTecher: Boolean(formData.isTecher), // Convert to boolean
        isStudent: Boolean(formData.isStudent), // Convert to boolean
        recoveryEmail: String(formData.recoveryEmail || ""),
        twoStepAuth: Boolean(formData.twoStepAuth),
        userAbout: String(formData.userAbout || ""),
        currentPictureAddress: String(formData.currentPictureAddress || ""),
        linkdinProfile: String(formData.linkdinProfile || ""),

        telegramLink: "https://t.me/amirzex70",
        // formData.telegramLink || ''
        receiveMessageEvent: Boolean(formData.receiveMessageEvent),
        homeAdderess: String(formData.homeAdderess || ""),
        nationalCode: String(formData.nationalCode || ""),
        gender: Boolean(formData.gender),
        latitude: String(formData.latitude || ""),
        longitude: String(formData.longitude || ""),
        insertDate: new Date().toISOString(),
        birthDay: formData.birthDay
          ? new Date(formData.birthDay).toISOString()
          : null,

        // Your nested objects (assuming they exist in formData)
        roles:
          formData.roles?.map((role) => ({
            id: role.id,
            roleName: String(role.roleName || ""),
            roleParentName: String(role.roleParentName || ""),
          })) || [],

        courses:
          formData.courses?.map((course) => ({
            title: String(course.title || ""),
            describe: String(course.describe || ""),
            tumbImageAddress: String(course.tumbImageAddress || ""),
            lastUpdate: new Date().toISOString(),
            courseId: course.courseId,
          })) || [],

        coursesReseves:
          formData.coursesReseves?.map((reserve) => ({
            reserveId: reserve.reserveId,
            courseId: reserve.courseId,
            courseName: String(reserve.courseName || ""),
            studentId: reserve.studentId,
            studentName: String(reserve.studentName || ""),
            reserverDate: new Date().toISOString(),
            accept: Boolean(reserve.accept),
          })) || [],

        userProfileId: 55021,
      };

      const response = await updateUserDetail(userData);
      setShow(false);
      return { success: true, data: response.data };
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

  // const onSubmit = data => {
  //   if (Object.values(data).every(field => field.length > 0)) {
  //     setShow(false)
  //   } else {
  //     for (const key in data) {
  //       if (data[key].length === 0) {
  //         setError(key, {
  //           type: 'manual'
  //         })
  //       }
  //     }
  //   }
  // }

  // const handleReset = () => {
  //   reset({
  //     username: selectedUser.username,
  //     lastName: selectedUser.fullName.split(' ')[1],
  //     firstName: selectedUser.fullName.split(' ')[0]
  //   })
  // }

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
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <Check className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">1.23k</h4>
                <small>Tasks Done</small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <Briefcase className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">568</h4>
                <small>Projects Done</small>
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
            <h1 className="mb-1">Edit User Information</h1>
            <p>Updating user details will receive a privacy audit.</p>
          </div>
          <Form onSubmit={handleSubmit(handleSubmiT)}>
            <Row className="gy-1 pt-75">
              <Col md={6} xs={12}>
                <Label className="form-label" for="fname">
                  First Name
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
                      } // Ensure string
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="lName">
                  Last Name
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
                      } // Ensure string
                    />
                  )}
                />
              </Col>
              <Col xs={6}>
                <Label className="form-label" for="userName">
                  Username
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
                      } // Ensure string
                    />
                  )}
                />
              </Col>
              {/* <Col xs={6}>
                <Label className='form-label' for='linkdinProfile'>
                  linkdinProfile
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='linkdinProfile'
                  name='linkdinProfile'
                  render={({ field }) => (
                    <Input {...field} id='linkdinProfile' placeholder='linkdinProfile' invalid={errors.linkdinProfile && true} />
                  )}
                />
              </Col> */}
              {/* <Col xs={6}>
                <Label className='form-label' for='telegramLink'>
                  telegramLink
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='telegramLink'
                  name='telegramLink'
                  render={({ field }) => (
                    <Input {...field} id='telegramLink' placeholder='telegramLink' invalid={errors.telegramLink && true} />
                  )}
                />
              </Col> */}
              <Col xs={6}>
                <Label className="form-label" for="nationalCode">
                  nationalCode
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
                  userAbout
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
                  homeAdderess
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
                <Label className="form-label" for="active">
                  Status:
                </Label>
                <Select
                  id="active"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={statusOptions}
                  theme={selectThemeColors}
                  defaultValue={
                    statusOptions[
                      statusOptions.findIndex(
                        (i) => i.value === selectedUser.active
                      )
                    ]
                  }
                />
              </Col>
              {/* <Col md={6} xs={12}>
                <Label className='form-label' for='tax-id'>
                  Tax ID
                </Label>
                <Input
                  id='tax-id'
                  placeholder='Tax-1234'
                  defaultValue={selectedUser.contact.substr(selectedUser.contact.length - 4)}
                />
              </Col> */}
              <Col md={6} xs={12}>
                <Label className="form-label" for="phoneNumber">
                  phoneNumber
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
                <Label className="form-label" for="isDelete">
                  isDelete
                </Label>
                <Select
                  id="isDelete"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={isDeleteOptions}
                  theme={selectThemeColors}
                  defaultValue={isDeleteOptions[0]}
                  onChange={(selectedOption) => {
                    const apiValue =
                      selectedOption.value === "yes" ? true : false;
                    // Send apiValue to your API
                  }}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="birthDay">
                  Birth Date
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="birthDay"
                  name="birthDay"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="date"
                      id="birthDay"
                      onChange={(e) => {
                        const formattedDate = e.target.value
                          ? `${e.target.value}T00:00:00`
                          : "";
                        field.onChange(formattedDate);
                      }}
                      invalid={errors.birthDay && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="gender">
                  gender
                </Label>
                <Select
                  id="gender"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={genderOptions}
                  theme={selectThemeColors}
                  defaultValue={genderOptions[0]}
                  onChange={(selectedOption) => {
                    const apiGenderValue = selectedOption.value; // This will be true (male) or false (female)
                    // Send apiGenderValue directly to your API
                  }}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="twoStepAuth">
                  twoStepAuth
                </Label>
                <Select
                  id="twoStepAuth"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={twoStepAuthOptions}
                  theme={selectThemeColors}
                  defaultValue={twoStepAuthOptions[0]}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="role">
                  Role
                </Label>
                <Select
                  id="role"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={roleOptions}
                  theme={selectThemeColors}
                  defaultValue={roleOptions[0]}
                />
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
                    Use as a billing address?
                  </Label>
                </div>
              </Col>
              <Col xs={12} className="text-center mt-2 pt-50">
                <Button type="submit" className="me-1" color="primary" onClick={handleSubmiT}>
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
