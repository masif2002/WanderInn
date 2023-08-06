import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <section className="flex justify-center items-center grow">
      <div className="-mt-32">
        <h1 className="text-3xl text-center uppercase font-bold mb-4">Login</h1>
        <form className="max-w-md">
          <input type="email" placeholder="you@example.com" />
          <input type="password" placeholder="*****" />
          <button className="bg-primary p-2 rounded-3xl text-white w-full">
            Login
          </button>
          <p className="text-center my-2">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary text-underline">
              Register Here
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
