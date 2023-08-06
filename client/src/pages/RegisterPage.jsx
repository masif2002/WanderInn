import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <section className="flex justify-center items-center grow">
      <div className="-mt-32">
        <h1 className="text-3xl text-center uppercase font-bold mb-4">
          Sign Up
        </h1>
        <form className="max-w-md">
          <input type="email" placeholder="you@example.com" />
          <input type="password" placeholder="password" />
          <input type="password" placeholder="confirm password" />
          <button className="bg-primary p-2 rounded-3xl text-white w-full">
            Register
          </button>
          <p className="text-center my-2">
            Already have an account?{" "}
            <Link to="/login" className="text-primary text-underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
