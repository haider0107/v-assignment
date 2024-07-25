import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { loginService } from "../service/authService";
import { Spin } from "antd";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [signinLoading, setsigninLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (userData) => {
    setError("");
    setsigninLoading(true);
    try {
      const res = await loginService(userData);

      console.log(res);

      if (res.data.success) {
        dispatch(authLogin({ userData: res.data.data }));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setsigninLoading(false);
    }
  };

  const googleLogin = () => {
    window.open("/api/auth/google", "_self");
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="text-center">
            <Logo color="" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
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
            {!signinLoading && (
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            )}
            {signinLoading && (
              <div className="text-center w-full">
                <Spin />
              </div>
            )}
          </div>
        </form>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        <div className="flex justify-center items-center w-full">
          <Button className="w-auto mt-2" onClick={googleLogin}>
            Login with <span className="font-semibold">Google</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
