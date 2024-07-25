import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { registerService } from "../service/authService.js";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [createLoading, setCreateLoading] = useState(false);

  const create = async (registerData) => {
    setCreateLoading(true);
    setError("");
    try {
      const { data } = await registerService(registerData);

      if (data.success) {
        dispatch(login({ userData: data.data }));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setCreateLoading(false);
    }
  };

  const googleLogin = () => {
    window.open("http://localhost:8000/api/auth/google", "_self");
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="">
            <Logo color="" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight mb-2">
          Sign up to create account
        </h2>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Username: "
              placeholder="Enter your full name"
              {...register("username", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            {!createLoading && (
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            )}
            {createLoading && (
              <div className="text-center w-full">
                <Spin />
              </div>
            )}
          </div>
        </form>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        <div className="flex justify-center items-center w-full">
          <Button className="w-auto mt-2" onClick={googleLogin}>
            SignUp with <span className="font-semibold">Google</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
