// Style
import "@styles/react/libs/react-select/_react-select.scss";

// React Imports
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Formik
import { useFormik } from "formik";

// Reactstrap Imports
import {
  Button,
  Col,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";

// React Query
import {
  useQueryWithDependencies,
  useQueryWithoutDependencies,
} from "../../../../utility/hooks/useCustomQuery.js";
import { useMutation } from "@tanstack/react-query";

// Api
import {
  GetNewsCategory,
  GetNewsDetail,
} from "../../../service/api/Getnewslist/GetNews.js";
import { UpdateNews } from "../../../service/api/Getnewslist/GetNews";

// Redux
import { useDispatch } from "react-redux";

// Constants
import EditNewsFields from "../../../components/news/news-manage/EditNewsField.js";

const EditBlog = ({ isOpen, toggle, refetch }) => {
  const [initialValues, setInitialValues] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data: newsCategory, isSuccess: successGetNewsCat } =
    useQueryWithoutDependencies("GET_NEWS_CATEGORY", GetNewsCategory);

  const {
    data: newsDetail,
    isSuccess,
    isError,
  } = useQueryWithDependencies("GET_NEWS_DETAILS", GetNewsDetail, id, id);

  console.log(newsDetail);

  const { mutate } = useMutation({
    mutationKey: ["UPDATE_NEWS"],
    mutationFn: (values) => {
      UpdateNews(values, refetch);
    },
    onSuccess: () => {
      toggle();
    },
  });

  useEffect(() => {
    if (isSuccess === true) {
      setInitialValues(EditNewsFields(newsDetail?.detailsNewsDto));
    }
  }, [isSuccess]);

  const formik = useFormik({
    initialValues: initialValues && initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader className="bg-transparent" toggle={toggle}></ModalHeader>
      <ModalBody className="px-sm-5 mx-50 pb-5">
        <div className="text-center mb-2">
          <h1 className="mb-1">ویرایش اطلاعات این خبر</h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Row className="gy-1 pt-75">
            <Col md="5" className="mb-1">
              <Label className="form-label" for="Title">
                عنوان
              </Label>
              <Input
                id="Title"
                placeholder="عنوان خبر"
                name="Title"
                onChange={formik.handleChange}
                value={formik.values.Title}
                invalid={!!formik.errors.Title}
              />
              <FormFeedback>{formik.errors.Title}</FormFeedback>
            </Col>
            <Col md="7" className="mb-1">
              <Label className="form-label" for="GoogleTitle">
                عنوان گوگل
              </Label>
              <Input
                id="GoogleTitle"
                name="GoogleTitle"
                onChange={formik.handleChange}
                value={formik.values.GoogleTitle}
                invalid={!!formik.errors.GoogleTitle}
                placeholder="عنوان گوگل"
              />
              <FormFeedback>{formik.errors.GoogleTitle}</FormFeedback>
            </Col>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="Keyword">
                کلمات کلیدی
              </Label>
              <Input
                id="Keyword"
                name="Keyword"
                placeholder="کلمات کلیدی"
                onChange={formik.handleChange}
                value={formik.values.Keyword}
                invalid={!!formik.errors.Keyword}
              />
            </Col>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="NewsCatregoryId">
                انتخاب دسته بندی
              </Label>
              <Input
                id="NewsCatregoryId"
                name="NewsCatregoryId"
                type="select"
                onChange={formik.handleChange}
                placeholder=" دسته بندی"
                defaultValue={
                  isSuccess && newsDetail?.detailsNewsDto?.NewsCatregoryId
                }
              >
                {successGetNewsCat &&
                  newsCategory?.map((classItem) => (
                    <option key={classItem.id} value={classItem.id}>
                      {classItem.categoryName}
                    </option>
                  ))}
              </Input>
            </Col>
            <Col md="6">
              <Label className="form-label" for="MiniDescribe">
                توضیح کوتاه
              </Label>
              <Input
                id="MiniDescribe"
                name="MiniDescribe"
                onChange={formik.handleChange}
                value={formik.values.MiniDescribe}
                placeholder="توضیح کوتاه"
              />
            </Col>
            <Col md="6">
              <Label className="form-label" for="Describe">
                توضیحات
              </Label>
              <Input
                id="Describe"
                name="Describe"
                onChange={formik.handleChange}
                value={formik.values.Describe}
                placeholder="توضیحات"
              />
            </Col>
            <Col md="7" className="mb-1">
              <Label className="form-label" for="GoogleDescribe">
                توضیحات گوگل
              </Label>
              <Input
                id="GoogleDescribe"
                name="GoogleDescribe"
                onChange={formik.handleChange}
                value={formik.values.GoogleDescribe}
                placeholder="توضیحات گوگل"
              />
            </Col>
            <Col md="5" className="mb-1">
              <Label className="form-label" for="CurrentImageAddress">
                آپلود عکس
              </Label>
              <Input
                id="CurrentImageAddress"
                type="file"
                name="CurrentImageAddress"
                onChange={formik.handleChange}
                value={formik.values.CurrentImageAddress}
                placeholder="آپلود عکس"
              />
            </Col>
            <Col xs={12} className="text-center mt-2 pt-50">
              <Button type="submit" className="me-1" color="primary">
                ویرایش
              </Button>
              <Button type="reset" color="secondary" outline onClick={toggle}>
                لغو
              </Button>
            </Col>
          </Row>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default EditBlog;
