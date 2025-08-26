"use client";

import { FiMail, FiLock, FiPhone } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { LuCake } from "react-icons/lu";
import { useState } from "react";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [surname, setSurname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic here (e.g., API call)
    console.log("Signup attempted with:", {
      email,
      password,
      surname,
      lastname,
      phone,
      dateOfBirth,
      gender,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email Field */}
      <div className="relative">
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email*"
          className="focus:ring-accent-600 border-accent-300 w-full rounded-lg border px-4 py-2 pl-10 focus:ring-2 focus:outline-none"
          required
        />
        <FiMail className="text-accent-500 absolute top-2.5 left-3" />
      </div>

      {/* Password Field */}
      <div className="relative">
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mật khẩu*"
          className="focus:ring-accent-600 border-accent-300 w-full rounded-lg border px-4 py-2 pl-10 focus:ring-2 focus:outline-none"
          required
        />
        <FiLock className="text-accent-500 absolute top-2.5 left-3" />
      </div>

      {/* Name Field */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <input
            id="surname"
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Họ*"
            className="focus:ring-accent-600 border-accent-300 w-full rounded-lg border px-4 py-2 pl-10 focus:ring-2 focus:outline-none"
            required
          />
          <FaRegUser className="text-accent-500 absolute top-2.5 left-3" />
        </div>

        <div className="relative flex-1">
          <input
            id="lastname"
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Tên*"
            className="focus:ring-accent-600 border-accent-300 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
            required
          />
        </div>
      </div>

      {/* Phone Field */}
      <div className="relative">
        <input
          id="phone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Số điện thoại"
          className="focus:ring-accent-600 border-accent-300 w-full rounded-lg border px-4 py-2 pl-10 focus:ring-2 focus:outline-none"
        />
        <FiPhone className="text-accent-500 absolute top-2.5 left-3" />
      </div>

      {/* Birth Field */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <input
            id="dateofbirth"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            placeholder="Ngày sinh"
            className="focus:ring-accent-600 border-accent-300 w-full rounded-lg border px-4 py-2 pl-10 focus:ring-2 focus:outline-none"
            required
          />
          <LuCake className="text-accent-500 absolute top-2.5 left-3" />
        </div>

        <div className="relative flex-1">
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="Giới tính"
            className="focus:ring-accent-600 border-accent-300 h-full w-full rounded-lg border px-4 py-2 pl-10 focus:ring-2 focus:outline-none"
            required
          >
            <option value="" className="text-gray-400">
              Chọn giới tính
            </option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
          <FaRegUser className="text-accent-500 absolute top-2.5 left-3" />
        </div>
      </div>

      {/* Signup Button */}
      <button
        type="submit"
        className="bg-accent-500 hover:bg-accent-800 hover:text-primary-100 w-full cursor-pointer rounded-lg py-2 transition-colors"
      >
        Đăng ký
      </button>
    </form>
  );
}
