"use client";
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('https://backend-task-30.onrender.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    setResponse(data.received);

    // Clear form after submission
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Contact Form</h2>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          Submit
        </button>

        {response && (
          <div className="mt-4 p-3 bg-green-100 text-sm rounded">
            <strong>Received from backend:</strong>
            <pre className="whitespace-pre-wrap">{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </form>
    </div>
  );
}
