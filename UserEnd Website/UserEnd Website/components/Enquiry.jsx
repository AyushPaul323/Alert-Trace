"use client";

import {useState} from "react";

export default function Enquiry() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [problemType, setProblemType] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError]= useState([]);
  const [success, setSuccess]=useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Name: ", name);
    console.log("Phone: ", phone);
    console.log("Location: ", location);
    console.log("Problem Type: ", problemType);
    console.log("Problem Description: ", description);

    const res = await fetch("api/enquiry", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ name, phone, location, problemType, description,}),
    });


    const {msg, success }= await res.json();
    setError(msg);
    setSuccess(success);

    if (success) {
      setName("");
      setPhone("");
      setLocation("");
      setProblemType("");
      setDescription("");
    }
    //console.log(error);
  };
  return (
    <>
    <form
    onSubmit={handleSubmit}
    >
      <div className="flex justify-center items-center h-full">
        <h1 className="text-2xl font-bold mb-5 text-white">Enquiry Form</h1>
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
          type="text"
          placeholder="Your Location"
          id="location"
          className="w-full px-3 py-2 text-sm text-black-200 placeholder-gray-400 bg-white border-0 rounded shadow"
        />
      </div>
      <div className="mb-3">
      <select
        onChange={e => setProblemType(e.target.value)} 
        value={problemType}
        className="w-full px-3 py-2 text-sm text-black-200 placeholder-gray-400 bg-white border-0 rounded shadow">
        <option hidden value="" style={{color:"gray"}}>Choose The Type Of Problem:</option>
        <option id="pothholes">Potholes</option>
        <option id="accident_zone">Accident Prone Zone</option>
        <option id="tow">Tow Zone</option>
        <option id="nopark">No Parking Zone</option>
        <option id="nostop">No Stopping Zone</option>
        </select>
      </div>
      <div className="mb-3">
        <textarea
          onChange={e => setDescription(e.target.value)}
          value={description}
          type="text"
          placeholder="Describe The Problem"
          id="description"
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