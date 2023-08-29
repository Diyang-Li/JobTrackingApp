import { Form, redirect, useNavigation, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, FormRow, SubmitBtn } from "../components";
import customFetch from "./../utils/customFetch";
import { toast } from "react-toastify";
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="POST" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type={"text"} name={"name"} defaultValue={"lu"} />
        <FormRow
          type={"text"}
          name={"lastName"}
          lableText={"lastName"}
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
        <SubmitBtn />
        <p>
          Already a member?
          <Link to={"/login"} className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;
