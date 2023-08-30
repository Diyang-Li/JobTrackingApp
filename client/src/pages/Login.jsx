import {
  Link,
  Form,
  redirect,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login successful");
    return redirect("/dashboard");
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  const navigate = useNavigate();
  const loginDemoUser = async () => {
    const data = {
      email: "test@test.com",
      password: "1234",
    };
    try {
      await customFetch.post("/auth/login", data);
      // toast.success("Take a test drive");
      navigate("/dashboard");
      console.log("hello");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h2>Login</h2>
        <FormRow
          type={"email"}
          name={"email"}
          defaultValue={"lucy@gmail.com"}
        />
        <FormRow type={"password"} name={"password"} defaultValue={"1234"} />
        <SubmitBtn />
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          Explore the app
        </button>
        <p>
          Not a member yet?
          <Link to={"/register"} className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
