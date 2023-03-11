import { useState, useMemo } from "react";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useSelector, useDispatch } from "react-redux";
import {
  handleChange,
  clearFilters,
  clearAllJobsState,
} from "../features/allJobs/allJobsSlice";
const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState("");
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.allJobs);
  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    if (isLoading) return;
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // setLocalSearch("");
    dispatch(clearFilters());
  };
  const debounce = () => {
    let timeoutId;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        dispatch(handleChange({ name: e.target.name, value: e.target.value }));
      }, 1000);
    };
  };

  const optimizedDebounce = useMemo(() => debounce(), []);

  return (
    <Wrapper>
      <form action="submit" className="form" onSubmit={handleSubmit}>
        <h3>Search job</h3>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="search" className="form-label">
              search
            </label>
            <input
              type="text"
              name="search"
              id="search"
              className="form-input"
              value={localSearch}
              onChange={optimizedDebounce}
            />
          </div>

          <div className="form-row">
            <label htmlFor="searchStatus" className="form-label">
              Status
            </label>

            <select
              name="searchStatus"
              id="searchStatus"
              className="form-select"
              onChange={handleSearch}
            >
              {["all", ...statusOptions].map((status, index) => {
                return (
                  <option key={index} value={status}>
                    {status}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="jobType" className="form-label">
              job type
            </label>

            <select
              name="jobType"
              id="jobType"
              className="form-select"
              onChange={handleSearch}
            >
              {["all", ...jobTypeOptions].map((jobType, index) => {
                return (
                  <option key={index} value={jobType}>
                    {jobType}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="sort" className="form-label">
              Sort
            </label>

            <select
              name="sort"
              id="sort"
              className="form-select"
              onChange={handleSearch}
            >
              {sortOptions.map((sortType, index) => {
                return (
                  <option key={index} value={sort}>
                    {sortType}
                  </option>
                );
              })}
            </select>
          </div>

          <button
            type="button"
            className="btn btn-block btn-danger"
            onClick={() => dispatch(clearAllJobsState())}
          >
            clear
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
