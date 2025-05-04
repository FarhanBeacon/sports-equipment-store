import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../providers/AuthProvider";

const Login = () => {
  const { signInUser, signInWithGoogle, setUser, setLoading } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signInUser(email, password)
      .then((result) => {
        setUser(result.user);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        setUser(result.user);
        navigate("/");
        const { displayName, email } = result.user;
        const cUser = { name: displayName, email };

        // save user to database
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(cUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="w-[85%] md:w-[40%] mx-auto min-h-[90vh] flex flex-col justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="fieldset w-full bg-base-200 drop-shadow-[0px_3px_3px_rgba(0,0,0,0.25)] p-8 rounded-xl"
      >
        <label className="label">Email</label>
        <input
          type="email"
          name="email"
          className="input w-full"
          placeholder="Email"
        />
        <label className="label">Password</label>
        <input
          type="password"
          name="password"
          className="input w-full"
          placeholder="Password"
        />
        <div>
          <a className="link link-hover">Forgot password?</a>
        </div>
        <button className="btn btn-neutral mt-4">Login</button>
        <p className="m-2 font-semibold">
          Don't Have An Account?{" "}
          <Link className="text-blue-400" to={"/register"}>
            Register
          </Link>
        </p>
      </form>
      <div className="divider">OR</div>
      <div className="w-full flex justify-center">
        <button
          onClick={handleGoogle}
          className="btn w-full bg-base-200 text-black border-[#e5e5e5]"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
