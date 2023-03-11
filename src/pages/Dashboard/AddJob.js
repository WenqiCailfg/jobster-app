import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import {
  clearValues,
  createJob,
  handleChange,
  editJob,
} from "../../features/job/jobSlice";
const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error("Please fill out all fields!");
      return;
    }
    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: {
            position,
            company,
            jobLocation,
            jobType,
            status,
          },
        })
      );
      return;
    }
    dispatch(createJob({ position, company, jobLocation, status, jobType }));
  };
  useEffect(() => {
    if (!isEditing) {
      dispatch(handleChange({ name: "jobLocation", value: user.location }));
    }
  }, []);

  return (
    <Wrapper>
      <form action="submit" className="form" onSubmit={handleSubmit}>
        <h3>add job</h3>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="position" className="form-label">
              position
            </label>
            <input
              type="text"
              name="position"
              id="position"
              className="form-input"
              value={position}
              onChange={handleJobInput}
            />
          </div>
          <div className="form-row">
            <label htmlFor="company" className="form-label">
              company
            </label>
            <input
              type="text"
              name="company"
              id="company"
              className="form-input"
              value={company}
              onChange={handleJobInput}
            />
          </div>
          <div className="form-row">
            <label htmlFor="jobLocation" className="form-label">
              job location
            </label>
            <input
              type="text"
              name="jobLocation"
              id="jobLocation"
              className="form-input"
              value={jobLocation}
              onChange={handleJobInput}
            />
          </div>
          <div className="form-row">
            <label htmlFor="status" className="form-label">
              status
            </label>

            <select
              name="status"
              id="status"
              className="form-select"
              onChange={handleJobInput}
            >
              {statusOptions.map((status, index) => {
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
              onChange={handleJobInput}
            >
              {jobTypeOptions.map((jobType, index) => {
                return (
                  <option key={index} value={jobType}>
                    {jobType}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button type="submit" className="btn btn-block submit-btn">
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
