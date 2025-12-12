import { Fragment, useState } from "react";
import { Col, Row } from "reactstrap";
import { Book, Eye, EyeOff } from "react-feather";
import fallback from "../../../assets/fallback/code back.jpg";
import ComponentSpinner from "../../../components/spinner/Loading-spinner.js";

// Custom Components
import CustomPagination from "../../../components/pagination/index";
import {
  Sidebar,
  ListHeader,
  ListSearchbar,
  ProductCards,
} from "../../../components/products-list";

// Api
import { GetNewsList } from "../../../service/api/Getnewslist/GetNews";

// React Query
import {
  useQueryWithDependencies,
  useQueryWithoutDependencies,
} from "../../../../utility/hooks/useCustomQuery.js";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  handleIsActive,
  handlePageNumber,
  handleQuery,
  handleRowsOfPage,
  handleSortingCol,
} from "../store/NewsList";

// Custom function
import ChangeMoment from "../../../../utility/hooks/moment/index";

// Style
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import {
  NewsSortOption,
  StatisticsOfNews,
} from "../../../components/news/news-manage/Options.js";
import { useMutation } from "@tanstack/react-query";
import { ActiveDeactiveNews } from "../../../service/api/Getnewslist/GetNews";
import useFormData from "../../../../utility/hooks/useFormData.js";

import { useEffect } from "react";

const NewsTable = () => {
  const [activeView, setActiveView] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  // 🔎 Debounce inline
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // 📄 Local pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const newsParams = useSelector((state) => state.news);
  const dispatch = useDispatch();

  const { data, isSuccess, refetch, isLoading } = useQueryWithDependencies(
    "GET_NEWS_LIST",
    GetNewsList,
    { ...newsParams, RowsOfPage: 1000 }, // fetch all
    { ...newsParams, RowsOfPage: 1000 }
  );

  const { data: activeData } = useQueryWithDependencies(
    "GET_NEWS_ACTIVE",
    GetNewsList,
    null,
    {
      RowsOfPage: 1,
      IsActive: true,
      Query: "",
    }
  );

  const { data: unActiveData } = useQueryWithDependencies(
    "GET_NEWS_UNACTIVE",
    GetNewsList,
    null,
    {
      RowsOfPage: 1,
      IsActive: false,
    }
  );

  const { mutate } = useMutation({
    mutationKey: ["ACTIVE_DEACTIVE"],
    mutationFn: (data) => {
      ActiveDeactiveNews(data, refetch);
    },
  });

  const handleActiveOrDetective = (boolean, id) => {
    try {
      const dataObj = useFormData({ Active: boolean, Id: id });
      mutate(dataObj);
    } catch (error) {
      throw new Error("ERROR: ", error);
    }
  };

  if (isLoading) {
    return <ComponentSpinner />;
  }

  // 🔎 Local search filter
  const filteredNews = isSuccess
    ? data.news?.filter((item) =>
        item.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
    : [];

  // 📄 Local pagination slice
  const totalItems = filteredNews.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedNews = filteredNews.slice(startIndex, endIndex);

  // 📄 Dynamic pagination numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 3; // how many pages around current

    pages.push(1); // always show first

    if (currentPage > maxVisible) {
      pages.push("...");
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - maxVisible + 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages); // always show last
    }

    return pages;
  };

  return (
    <Fragment>
      <Row>
        <Col xs={12} lg={3}>
          <Sidebar
            data={{
              active: activeData?.totalCount,
              unActive: unActiveData?.totalCount,
            }}
            statisticsData={StatisticsOfNews}
            resize="12"
          />
        </Col>
        <Col xs={12} lg={9}>
          <div className="content-detached content-right">
            <div className="content-body" style={{ marginRight: "0" }}>
              {/* <ListHeader
                rowsFunc={handleRowsOfPage}
                sortOptions={NewsSortOption}
              /> */}

              {/* 🔎 Local Search Input */}
              <input
                type="text"
                placeholder="جستجو در اخبار..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // reset to page 1 when searching
                }}
                className="form-control mb-3"
              />

              <div className="d-flex flex-wrap justify-content-start gap-3">
                {paginatedNews?.map((item, index) => (
                  <ProductCards
                    key={index}
                    href={"/blogs/view/"}
                    id={item.id}
                    image={item.currentImageAddressTumb}
                    currentRate={item.currentRate}
                    title={item.title}
                    miniDescribe={item.miniDescribe}
                    insertDate={ChangeMoment(
                      item.insertDate,
                      "YYYY/MM/DD",
                      "persian"
                    )}
                    currentView={item.currentView}
                    handleActiveOrDetective={handleActiveOrDetective}
                    status={item.isActive}
                    fallback={fallback}
                  />
                ))}
              </div>

              {/* 📄 Local Pagination */}
              <div className="d-flex justify-content-center mt-3">
                <nav>
                  <ul className="pagination">
                    {getPageNumbers().map((page, index) => (
                      <li
                        key={index}
                        className={`page-item ${
                          page === currentPage ? "active" : ""
                        }`}
                      >
                        {page === "..." ? (
                          <span className="page-link">...</span>
                        ) : (
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default NewsTable;
