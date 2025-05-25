"use client";

import { useState } from "react";
export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError]= useState([]);
  const [success, setSuccess]=useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Name: ", name);
    console.log("Email: ", email);
    console.log("Message: ", message);

    const res = await fetch("api/contact", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ name, email, message, }),
    });


    const {msg, success }= await res.json();
    setError(msg);
    setSuccess(success);

    if (success) {
      setName("");
      setEmail("");
      setMessage("");
    }
    //console.log(error);
  };
  return (
    <>
    <form
      onSubmit={handleSubmit}
    >
      <div className="flex justify-center items-center h-full">
        <h2 className="text-2xl font-bold mb-5 text-white">Contact Us</h2>
      </div>
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
          onChange={e => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email"
          id="email"
          className="w-full px-3 py-2 text-sm text-black-200 placeholder-gray-400 bg-white border-0 rounded shadow"
        />
      </div>
      <div className="mb-3">
        <textarea
          onChange={e => setMessage(e.target.value)}
          value={message}
          placeholder="Your message"
          id="message"
          className="w-full px-3 py-2 text-sm text-black-200 placeholder-gray-400 bg-white border-0 rounded shadow"
        ></textarea>
      </div>
      <div className="flex justify-center">
        <button type="submit" className="rounded-[30px] group relative bg-yellow-500 hover:bg-yellow-400 px-8 py-3 text-lg text-white max-w-[200px]">
          Submit
        </button>
      </div>
    </form>
    
    
    </>
  );
}