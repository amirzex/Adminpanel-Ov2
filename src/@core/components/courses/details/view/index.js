// ** React
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// ** React Query (simple async functions)
import {
  usecoursedatils,
  updateCourse,
  deactiveCourse
} from "../../../../service/reactQuery/courseQuery";

// ** React Hook Form
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Reactstrap
import {
  Row,
  Col,
  Card,
  CardBody,
  CardImg,
  Badge,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Spinner,
  Alert,
  Input,
  FormFeedback
} from "reactstrap";


import Coursedetailstab from "../../details/view/Tabs";


const schema = yup.object().shape({
  title: yup.string().required("عنوان دوره الزامی است"),
  capacity: yup.number().typeError("عدد وارد کنید").required("ظرفیت الزامی است"),
  cost: yup.number().typeError("عدد وارد کنید").min(0).required("قیمت الزامی است"),
  miniDescribe: yup.string().min(5).required("توضیح کوتاه الزامی است"),
  describe: yup.string().min(10).required("توضیحات کامل الزامی است"),
  startTime: yup.date().typeError("تاریخ نامعتبر").required(),
  endTime: yup
    .date()
    .typeError("تاریخ نامعتبر")
    .min(yup.ref("startTime"), "پایان قبل از شروع نمی‌شود")
    .required(),
  uniqeUrlString: yup.string().required("آدرس یکتا الزامی است"),
});


const Coursedetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [active, setActive] = useState("1");

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  const { data: course, isLoading, error, refetch } = usecoursedatils(id);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });


  let courseDescription = "";
  try {
    const parsed = JSON.parse(course?.describe || "");
    courseDescription = parsed.blocks.map(b => b.data.text).join("\n");
  } catch {
    courseDescription = course?.describe || "";
  }


  useEffect(() => {
    if (show && course) {
      reset({
        title: course.title,
        capacity: course.capacity,
        cost: course.cost,
        miniDescribe: course.miniDescribe,
        describe: courseDescription,
        startTime: course.startTime?.split("T")[0],
        endTime: course.endTime?.split("T")[0],
        uniqeUrlString: course.uniqeUrlString
      });
    }
  }, [show, course]);


const onSubmit = async (data) => {
  const formData = new FormData();

  formData.append("id", id);
  formData.append("title", data.title);
  formData.append("capacity", data.capacity);
  formData.append("cost", data.cost);
  formData.append("miniDescribe", data.miniDescribe);
  formData.append("describe", data.describe);
  formData.append("uniqeUrlString", data.uniqeUrlString);

  formData.append("startTime", new Date(data.startTime).toISOString());
  formData.append("endTime", new Date(data.endTime).toISOString());


  try {
    await updateCourse(formData); 
    setShow(false);
    refetch();
  } catch (err) {
    console.error(" Update Course Error:", err);
  }
};



  const handleToggleActive = async () => {
    const payload = { 
        active: !course.active
     , id: id,
   
    };

    try {
      await deactiveCourse(payload);
      refetch();
    } catch (err) {
      console.error(" Toggle Active Error:", err);
    }
  };


  if (isLoading)
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner />
      </div>
    );

  if (error)
    return <Alert color="danger">خطا در دریافت اطلاعات</Alert>;


  return (
    <div className="app-user-view">
      <Row>
        {/* LEFT */}
        <Col xl="4" lg="5" md="12">
          <Card className="mb-2 shadow-sm">
            <CardImg
              top
              src={course.imageAddress || "https://via.placeholder.com/500x300"}
              style={{ height: "240px", objectFit: "cover" }}
            />
            <CardBody>
              <h3>{course.title}</h3>

              <Badge color={course.active ? "success" : "danger"}>
                {course.active ? "فعال" : "غیرفعال"}
              </Badge>

              <hr />

              <p><b>مدرس:</b> {course.teacherName}</p>
              <p><b>قیمت:</b> {course.cost ? `${course.cost} تومان` : "رایگان"}</p>
              <p><b>ظرفیت:</b> {course.capacity}</p>
              <p><b>رزرو شده:</b> {course.reserveUserTotal}</p>

              <hr />

              <p><b>توضیح کوتاه:</b></p>
              <p className="text-muted">{course.miniDescribe}</p>
            </CardBody>
          </Card>

          <Card className="mb-1">
            <CardBody>
              <h5>اطلاعات مدرس</h5>
              <p>نام: {course.teacherName}</p>
              <p>آیدی: {course.teacherId}</p>
            </CardBody>
          </Card>

          <Button color="primary" className="me-1" onClick={() => setShow(true)}>
            ویرایش
          </Button>

          <Button
            color={course.active ? "danger" : "success"}
            onClick={handleToggleActive}
          >
            {course.active ? "غیرفعال کردن" : "فعال کردن"}
          </Button>
        </Col>

        {/* RIGHT */}
        <Col xl="8" lg="7" md="12">
          <Card>
            <CardBody>
              <h3>توضیحات دوره</h3>
              <p style={{ lineHeight: "28px" }}>{courseDescription}</p>
            </CardBody>
          </Card>

          <Coursedetailstab active={active} toggleTab={toggleTab} id={id}/>
        </Col>
      </Row>

     
      <Modal isOpen={show} toggle={() => setShow(false)} className="modal-lg">
        <ModalHeader toggle={() => setShow(false)}>ویرایش دوره</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-2">
              {[
                { name: "title", label: "عنوان" },
                { name: "capacity", label: "ظرفیت", type: "number" },
                { name: "cost", label: "قیمت", type: "number" },
                { name: "uniqeUrlString", label: "Uniqe URL" }
              ].map(({ name, label, type }) => (
                <Col md={6} key={name}>
                  <Label>{label}</Label>
                  <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                      <Input {...field} type={type} invalid={!!errors[name]} />
                    )}
                  />
                  <FormFeedback>{errors[name]?.message}</FormFeedback>
                </Col>
              ))}

              <Col xs={12}>
                <Label>توضیح کوتاه</Label>
                <Controller
                  name="miniDescribe"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} type="textarea" invalid={!!errors.miniDescribe} />
                  )}
                />
                <FormFeedback>{errors.miniDescribe?.message}</FormFeedback>
              </Col>

              <Col xs={12}>
                <Label>توضیحات کامل</Label>
                <Controller
                  name="describe"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} type="textarea" rows={4} invalid={!!errors.describe} />
                  )}
                />
                <FormFeedback>{errors.describe?.message}</FormFeedback>
              </Col>

              <Col md={6}>
                <Label>شروع</Label>
                <Controller
                  name="startTime"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} type="date" invalid={!!errors.startTime} />
                  )}
                />
              </Col>

              <Col md={6}>
                <Label>پایان</Label>
                <Controller
                  name="endTime"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} type="date" invalid={!!errors.endTime} />
                  )}
                />
              </Col>

              <Col xs={12} className="text-center mt-2">
                <Button type="submit" color="primary" className="me-1">
                  ذخیره
                </Button>
                <Button outline onClick={() => setShow(false)}>
                  انصراف
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Coursedetails;
