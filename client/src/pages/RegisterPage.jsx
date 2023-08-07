import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";



const RegisterPage = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('/register', formData)
      alert("Registration successful!")
    } catch {
      alert("Registration failed! Please try again later!")
    }
  };

  const handleChange = (event) => {
    let { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value
    })

  }

  return (
    <section className="flex justify-center items-center grow">
      <div className="-mt-32">
        <h1 className="text-3xl text-center uppercase font-bold mb-4">Sign Up</h1>
        <form className="max-w-md" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} />
          <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} />
          <input type="password" name="password" placeholder="password" value={formData.password} onChange={handleChange}/>
          <button className="bg-primary p-2 rounded-3xl text-white w-full">Register</button>
          <p className="text-center my-2">
            Already have an account?<Link to="/login" className="text-primary text-underline">Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
