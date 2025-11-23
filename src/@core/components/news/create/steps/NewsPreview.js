import { Badge, Button, Col, Row } from "reactstrap";

import { useSelector } from "react-redux";

// Custom Component
import ButtonsForMove from "../../../../components/button-for-move/ButtonsForMove";

// Api
import { CreateNews } from "../../../../service/api/Getnewslist/GetNews";

// Image
import fallback from "../../../../assets/fallback/code back.jpg";
import ImageFallBack from "../../../../components/image-fallback/index";
import { useQueryWithDependencies } from "../../../../../utility/hooks/useCustomQuery";
import { GetNewsCategoryWithId } from "../../../../service/api/Getnewslist/GetNews";
import CreateEditorJsBlocks from "../../../../../utility/create-editorjs-blocks/index";
import { useMutation } from "@tanstack/react-query";

const NewsPreview = ({ stepper }) => {
  const previewNews = useSelector((state) => state.CreateNewsSlice);
  const createObj = useSelector((state) => state.CreateNewsSlice);

  const { data } = useQueryWithDependencies(
    "GET_NEWS_CATEGORY",
    GetNewsCategoryWithId,
    previewNews?.NewsCatregoryId,
    parseInt(previewNews?.NewsCatregoryId)
  );

  const { mutate } = useMutation({
    mutationKey: ["CREATE_NEWS"],
    mutationFn: (values) => {
      CreateNews(values);
    },
  });

  return (
    <Row>
      <h1 className="w-100 text-center mb-4">پیش نمایش خبر</h1>
      <Col xs={12}>
        <ImageFallBack
          className="img-fluid card-img-top w-100 rounded"
          style={{ height: "450px" }}
          src={previewNews.PreviewImage}
          fallback={fallback}
        />
      </Col>
      <Col xs={12} className="my-2 d-flex flex-wrap gap-1">
        <h3 className="w-100">{previewNews?.Title}</h3>

        <Badge color="light-primary" pill>
          {data?.categoryName}
        </Badge>

        <p className="mb-2">{previewNews?.MiniDescribe}</p>
      </Col>
      <Col xs={12}>
        <CreateEditorJsBlocks editorData={previewNews?.Describe} />
        <Button
          onClick={() => {
            mutate(createObj);
          }}
        >
          Create
        </Button>
      </Col>
      <Col xs={12}>
        <ButtonsForMove stepper={stepper} />
      </Col>
    </Row>
  );
};

export default NewsPreview;
