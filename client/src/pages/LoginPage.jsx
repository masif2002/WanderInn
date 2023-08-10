import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate()
  const { user, setUser, fetchingUser } = useContext(UserContext)
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post("/login", formData);
      const { _id, name, email } = data
      alert(data.message);
      setUser({_id, name, email})
      navigate('/')
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }

   
  };

  if (fetchingUser) {
    // Fetching state of user, if logged in or not
    return <h1>Loading ...</h1>
  } else if (user) {
    // If user already logged in 
    return <Navigate to={'/profile'} />
  }

  return (
    <section className="flex justify-center items-center grow">
      <div className="-mt-32">
        <h1 className="text-3xl text-center uppercase font-bold mb-4">Login</h1>
        <form className="max-w-md" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="*****"
            value={formData.password}
            onChange={handleChange}
          />
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
