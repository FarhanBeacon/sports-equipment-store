import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useNavigate } from "react-router";
import swal from 'sweetalert';

const Register = () => {
  const { createUser, updateUserProfile, signOutUser, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const cUser = { name, email };

    createUser(email, password)
      .then(() => {
        updateUserProfile(name);
        signOutUser();
        navigate("/login");
        // save user to database
        fetch("https://sports-equipment-store-server-xi.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(cUser),
        })
        .then(res=> res.json())
        .then(data=>{
          if(data.insertedId){
            swal("Registration Successful!", "Please Login to Continue", "success");
          }
        })
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
        onSubmit={handleRegister}
        className="fieldset w-full bg-base-200 drop-shadow-[0px_3px_3px_rgba(0,0,0,0.25)] p-8 rounded-xl"
      >
        <label className="label">Username</label>
        <input
          type="text"
          name="name"
          className="input w-full"
          placeholder="Username"
        />
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
        <button className="btn btn-neutral mt-4">Register</button>
        <p className="m-2 font-semibold">
          Already Have An Account?{" "}
          <Link className="text-blue-400" to={"/login"}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
