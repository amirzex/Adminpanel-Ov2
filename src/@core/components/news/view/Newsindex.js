import { Col, Row } from "reactstrap";
import fallback from "../../../assets/fallback/code back.jpg";
import ComponentSpinner from "../../../components/spinner/Loading-spinner.js";

// Custom Components
import NewsTabs from "./Tabs.js";
import EditBlog from "./EditBlog.js";

// React Imports
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Redux
import { getNewsComments, getNewsDetails } from "../store/NewsDetail.js";

// Api
import { GetNewsDetail } from "../../../service/api/Getnewslist/GetNews";
import { ActiveDeactiveNews } from "../../../service/api/Getnewslist/GetNews";
import { useQueryWithDependencies } from "../../../../utility/hooks/useCustomQuery.js";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import useFormData from "../../../../utility/hooks/useFormData.js";
import InfoCard from "../../../../@core/components/item-detail-components/InfoCard";
import { NewsInformation } from "../../../components/news/news-manage/Details.js";

const NewsView = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [active, setActive] = useState("1");
  const [editModal, setEditModal] = useState(false);

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const { data, isSuccess, refetch, isRefetching, isLoading } =
    useQueryWithDependencies("GET_NEWS_DETAILS", GetNewsDetail, id, id);

  useEffect(() => {
    if (isSuccess === true || isRefetching) {
      dispatch(getNewsDetails(data.detailsNewsDto));
      dispatch(getNewsComments(data.commentDtos));
    }
  }, [isSuccess, isRefetching]);

  const { mutate } = useMutation({
    mutationKey: ["َACTIVE_DEACTIVE"],
    mutationFn: (data) => {
      return ActiveDeactiveNews(data, refetch);
    }
  });

  const handleActiveOrDeactive = (res) => {
    try {
      const dataObj = useFormData({ Active: res, Id: id });
      mutate(dataObj);
    } catch (error) {
      throw new Error("ERROR: ", error);
    }
  };

  const toggle = () => setEditModal(!editModal);

  if (isLoading) {
    return <ComponentSpinner />;
  }

  return (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <InfoCard
            setEditModal={setEditModal}
            activeOrDeactive={handleActiveOrDeactive}
            fields={NewsInformation(data?.detailsNewsDto)}
            detailParams={data?.detailsNewsDto}
            variant={"blog"}
            fallback={fallback}
          />
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <NewsTabs active={active} toggleTab={toggleTab} id={id} />
        </Col>
      </Row>
      <EditBlog isOpen={editModal} toggle={toggle} refetch={refetch} />
    </div>
  );
};
export default NewsView;
