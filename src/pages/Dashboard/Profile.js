import { useState } from "react";
import { useSelector } from "react-redux";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { toast } from "react-toastify";
import { updateUser } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
const Profile = () => {
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [info, setInfo] = useState({
    name: user.name || "",
    lastName: user.lastName || "",
    email: user.email || "",
    location: user.location || "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setInfo({ ...info, [name]: val });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, lastName, email, location } = info;
    if (!name || !lastName || !email || !location) {
      toast.error("please fill all values");
    }
    dispatch(updateUser({ name, lastName, email, location }));
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="name" className="form-label">
              name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              value={info.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label htmlFor="lastName" className="form-label">
              last name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="form-input"
              value={info.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label htmlFor="email" className="form-label">
              email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="form-input"
              value={info.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label htmlFor="location" className="form-label">
              location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="form-input"
              value={info.location}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-block" type="submit">
            save changes
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
