"use client";

import { useState } from "react";
export default function Emergency() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError]= useState([]);
  const [success, setSuccess]=useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Name: ", name);
    console.log("Phone: ", phone);
    console.log("Location: ", location);

    const res = await fetch("api/emergency", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ name, phone, location, }),
    });
    const {msg, success }= await res.json();
    setError(msg);
    setSuccess(success);

    if (success) {
      setName("");
      setPhone("");
      setLocation("");
    }
    //console.log(error);
  };


  return (
    <form
    onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-5 text-white">Emergency Contact Form </h2>
      <div className="mb-3">
        <input
          onChange={e => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Your name"
          id="name"
          className="w-full px-3 py-2 text-sm text-black-200 placeholder-gray-400 bg-white border-0 rounded shadow"
        />
      </div>
      <div className="mb-3">
        <input
          onChange={e => setPhone(e.target.value)}
          value={phone}
          type="tel"
          placeholder="Phone Number"
          id="phone"
          className="w-full px-3 py-2 text-sm text-black-200 placeholder-gray-400 bg-white border-0 rounded shadow"
        />
      </div>
      <div className="mb-3">
        <input
          onChange={e => setLocation(e.target.value)}
          value={location}
          placeholder="Your location"
          id="location"
          className="w-full px-3 py-2 text-sm text-black-200 placeholder-gray-400 bg-white border-0 rounded shadow"
        />
      </div>
      <div className="flex justify-center">
      <button type="submit" className="rounded-[30px] group relative bg-yellow-500 hover:bg-yellow-400 px-8 py-3 text-lg text-white max-w-[200px]">
        Submit
      </button>
      </div>
    </form>
  );
}