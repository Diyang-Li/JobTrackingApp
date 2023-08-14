import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, FormRow } from "../components";
const Login = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h2>Login</h2>
        <FormRow
          type={"email"}
          name={"email"}
          defaultValue={"lulu@gmail.com"}
        />
        <FormRow type={"password"} name={"password"} defaultValue={"1234"} />
        <button type="submit" className="btn btn-block">
          Login
        </button>
        <button type="button" className="btn btn-block">
          Explore the app
        </button>
        <p>
          Not a member yet?
          <Link to={"/register"} className="member-btn">
            Register
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default Login;
