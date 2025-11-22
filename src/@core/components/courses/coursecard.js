// ** React Imports
import { Card, CardImg, CardBody, CardTitle, CardText, CardFooter } from 'reactstrap';
import imgDefault from '@src/assets/images/slider/03.jpg';

const formatDate = (dateString) => {
  if (!dateString) return "نامشخص";
  return new Date(dateString).toLocaleDateString("fa-IR");
};

const Coursecard = ({ course }) => {
  return (
    <Card className="mb-2 shadow-sm">
      <CardImg
        top
        src={course?.imageAddress || imgDefault}
        alt={course?.title || 'Course Image'}
        style={{ height: "220px", objectFit: "cover" }}
      />

      <CardBody>
        <CardTitle tag="h4">{course?.title || 'عنوان دوره'}</CardTitle>

        <CardText className="text-muted">
          {course?.miniDescribe || 'توضیحات دوره'}
        </CardText>

        <CardText>
          <strong>قیمت:</strong> {course?.cost ? `${course.cost} تومان` : "رایگان"}
        </CardText>

        <CardText>

        </CardText>
      </CardBody>

      <CardFooter>
           <strong>شروع:</strong> {formatDate(course?.startTime)}  
          <br />
          <strong>پایان:</strong> {formatDate(course?.endTime)}
      </CardFooter>
    </Card>
  );
};

export default Coursecard;
