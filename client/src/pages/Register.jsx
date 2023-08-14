import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, FormRow } from "../components";

const Register = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow
          type={"text"}
          name={"firstname"}
          lableText={"firstname"}
          defaultValue={"lu"}
        />
        <FormRow
          type={"text"}
          name={"lastname"}
          lableText={"lastname"}
          defaultValue={"lu"}
        />
        <FormRow
          type={"text"}
          name={"location"}
          lableText={"location"}
          defaultValue={"ATL"}
        />
        <FormRow
          type={"email"}
          name={"email"}
          lableText={"email"}
          defaultValue={"lulu@gmail.com"}
        />
        <FormRow
          type={"password"}
          name={"password"}
          lableText={"password"}
          defaultValue={"1234"}
        />
        <button type="submit" className="btn btn-block">
          submit
        </button>
        <p>
          Already a member?
          <Link to={"/login"} className="member-btn">
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
