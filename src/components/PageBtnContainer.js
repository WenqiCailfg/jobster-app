import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { changePage } from "../features/allJobs/allJobsSlice";
const PageBtnContainer = () => {
  const { numOfPages, page } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });
  console.log(page);
  const nextPage = () => {
    let newPage = page + 1;
    if (page + 1 > numOfPages) {
      newPage = 1;
    }
    dispatch(changePage(newPage));
  };
  const prevPage = () => {
    let newPage = page - 1;
    if (page - 1 < 1) {
      newPage = numOfPages;
    }
    dispatch(changePage(newPage));
  };
  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        previous
      </button>
      <div className="btn-container">
        {pages.map((num) => {
          return (
            <button
              className={num === page ? "pageBtn active" : "pageBtn"}
              key={num}
              onClick={() => {
                dispatch(changePage(num));
              }}
            >
              {num}
            </button>
          );
        })}
      </div>
      <button className="next-btn" onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
