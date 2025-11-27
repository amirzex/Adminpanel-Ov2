// ** React
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// ** React Query
import { usecoursedatils } from "../../../../service/reactQuery/courseQuery";

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

// ** Components
import Coursedetailstab from "../../details/view/Tabs";
const schema = yup.object().shape({
  title: yup.string().required("عنوان دوره الزامی است"),
  capacity: yup
    .number()
    .typeError("عدد وارد کنید")
    .positive("عدد معتبر نیست")
    .required("ظرفیت الزامی است"),

  cost: yup
    .number()
    .typeError("عدد وارد کنید")
    .min(0, "قیمت نمی‌تواند منفی باشد")
    .required("قیمت الزامی است"),

  miniDescribe: yup
    .string()
    .min(5, "حداقل ۵ کاراکتر")
    .required("توضیح کوتاه الزامی است"),

  describe: yup
    .string()
    .min(10, "حداقل ۱۰ کاراکتر")
    .required("توضیحات کامل الزامی است"),

  startTime: yup
    .date()
    .typeError("تاریخ معتبر نیست")
    .required("تاریخ شروع الزامی است"),

  endTime: yup
    .date()
    .typeError("تاریخ معتبر نیست")
    .min(yup.ref("startTime"), "پایان نمی‌تواند قبل از شروع باشد")
    .required("تاریخ پایان الزامی است"),

  uniqeUrlString: yup.string().required("آدرس یکتا الزامی است"),
});
const Coursedetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(false);

  const { data: course, isLoading, error, refetch } = usecoursedatils(id);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  // تبدیل editor به متن ساده
  let courseDescription = "";
  try {
    const parsed = JSON.parse(course?.describe || "");
    courseDescription = parsed.blocks.map(b => b.data.text).join("\n");
  } catch {
    courseDescription = course?.describe || "";
  }

  // مقداردهی فرم هنگام باز شدن مودال
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

  const onSubmit = (data) => {
    const payload = {
      ...data,
      id: course.id,
      startTime: new Date(data.startTime).toISOString(),
      endTime: new Date(data.endTime).toISOString(),
    };
     

    console.log("✅ API PAYLOAD:", payload);

    // 🔴🔴🔴 اینجا باید API Update Course صدا زده شود
    /*
    updateCourse(payload).then(() => {
      setShow(false);
      refetch();
    });
    */
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
        {/* ستون چپ */}
        <Col xl="4" lg="5" md="12">
          <Card className="mb-2 shadow-sm">
            <CardImg
              top
              src={
                course.imageAddress
                  ? course.imageAddress
                  : "https://via.placeholder.com/500x300?text=No+Image"
              }
              alt={course.title}
              style={{ height: "240px", objectFit: "cover" }}
            />
            <CardBody>
              <h3 className="mb-1">{course.title}</h3>
              <Badge color={ "secondary"}>
                {course.statusName === "started"
                  ? "در حال برگزاری"
                  : course.statusName === "upcoming"
                    ? "در آینده"
                    : "پایان یافته"}
              </Badge>

              <hr />

              <p><strong>مدرس:</strong> {course.teacherName}</p>
              <p><strong>قیمت:</strong> {course.cost ? `${course.cost} تومان` : "رایگان"}</p>

              <p><strong>ظرفیت:</strong> {course.capacity}</p>
              <p><strong>رزرو شده:</strong> {course.reserveUserTotal}</p>

              <hr />

              {/* <p><strong>شروع:</strong> {formatDate(course.startTime)}</p>
              <p><strong>پایان:</strong> {formatDate(course.endTime)}</p> */}

              <hr />

              <p><strong>توضیح کوتاه:</strong></p>
              <p className="text-muted">{course.miniDescribe}</p>
            </CardBody>
          </Card>

          {/* اطلاعات مدرس */}
          <Card>
            <CardBody>
              <h4><b>اطلاعات مدرس</b></h4>
              <p><strong>نام:</strong> {course.teacherName}</p>
              <p><strong>آیدی:</strong> {course.teacherId}</p>
              <p><strong>سطح دوره:</strong> {course.courseLvlId}</p>
            </CardBody>
          </Card>
          <Button color="primary" onClick={() => setShow(true)}>
            ویرایش
          </Button>
        </Col>


        {/* ستون راست */}
        <Col xl="8" lg="7" md="12">
          <Card>
            <CardBody>
              <h3 className="mb-2">توضیحات دوره</h3>
              <p style={{ lineHeight: "28px" }}>{courseDescription}</p>
            </CardBody>
          </Card>

          <Coursedetailstab active={"1"} toggleTab={() => { }} />
        </Col>
      </Row>

      {/* ✅ MODAL EDIT */}
      <Modal isOpen={show} toggle={() => setShow(false)} className="modal-lg">
        <ModalHeader toggle={() => setShow(false)}>
          ویرایش دوره
        </ModalHeader>

        <ModalBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-2">

              {/** title */}
              <Col md={6}>
                <Label>عنوان دوره</Label>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} invalid={!!errors.title} />
                  )}
                />
                <FormFeedback>{errors.title?.message}</FormFeedback>
              </Col>

              {/** capacity */}
              <Col md={6}>
                <Label>ظرفیت</Label>
                <Controller
                  name="capacity"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} type="number" invalid={!!errors.capacity} />
                  )}
                />
                <FormFeedback>{errors.capacity?.message}</FormFeedback>
              </Col>

              {/** cost */}
              <Col md={6}>
                <Label>قیمت</Label>
                <Controller
                  name="cost"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} type="number" invalid={!!errors.cost} />
                  )}
                />
                <FormFeedback>{errors.cost?.message}</FormFeedback>
              </Col>

              {/** uniqeUrlString */}
              <Col md={6}>
                <Label>Uniqe URL</Label>
                <Controller
                  name="uniqeUrlString"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} invalid={!!errors.uniqeUrlString} />
                  )}
                />
                <FormFeedback>{errors.uniqeUrlString?.message}</FormFeedback>
              </Col>

              {/** miniDescribe */}
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

              {/** describe */}
              <Col xs={12}>
                <Label>توضیحات کامل</Label>
                <Controller
                  name="describe"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} type="textarea" rows="4" invalid={!!errors.describe}/>
                  )}
                />
                <FormFeedback>{errors.describe?.message}</FormFeedback>
              </Col>

              {/** dates */}
              <Col md={6}>
                <Label>شروع</Label>
                <Controller
                  name="startTime"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} type="date" invalid={!!errors.startTime}/>
                  )}
                />
                <FormFeedback>{errors.startTime?.message}</FormFeedback>
              </Col>

              <Col md={6}>
                <Label>پایان</Label>
                <Controller
                  name="endTime"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} type="date" invalid={!!errors.endTime}/>
                  )}
                />
                <FormFeedback>{errors.endTime?.message}</FormFeedback>
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
