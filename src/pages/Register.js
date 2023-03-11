import { useState, useEffect, React } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import Logo from "../components/Logo";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  password: "",
  email: "",
  isMember: true,
};
const Register = () => {
  const [value, setValue] = useState(initialState);
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setValue({ ...value, [name]: val });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, password, email, isMember } = value;
    if ((!isMember && !name) || !password || !email) {
      toast.error("Please Fill Out All aields");
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };
  const toggleLogin = () => {
    setValue({ ...value, isMember: !value.isMember });
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />

        <h3>{value.isMember ? "login" : "register"}</h3>
        {!value.isMember ? (
          <div className="form-row">
            <label htmlFor="name" className="form-label">
              name
            </label>
            <input
              type="name"
              id="name"
              name="name"
              className="form-input"
              onChange={handleChange}
            />
          </div>
        ) : (
          ""
        )}

        <div className="form-row">
          <label htmlFor="email" className="form-label">
            email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="password" className="form-label">
            password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-block" type="submit">
          submit
        </button>
        <button className="btn btn-block btn-hipster" type="button">
          demo app
        </button>
        <p>
          {value.isMember ? "Not a member yet?" : "Already a member?"}
          <button className="member-btn" type="button" onClick={toggleLogin}>
            {value.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
