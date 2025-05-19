import axios from "axios";
import { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false); // 🔄 New loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const res = await axios.post("https://backend-task-30.onrender.com/submit", formData);
      setResponse(res.data.received);
      setFormData({ name: "", email: "", message: "" }); // Clear form
    } catch (error) {
      console.error("Error submitting form:", error);
      setResponse({ error: "Something went wrong. Please try again later." });
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="min-h-screen flex items-center w-full justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded-md w-full max-w-md space-y-4"
      >
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
          type="email"
          placeholder="Email"
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
          disabled={loading} // ⛔ Disable during loading
          className={`w-full text-white px-4 py-2 rounded cursor-pointer transition ${
            loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {response && (
          <div className="mt-4 p-3 bg-green-100 text-sm rounded">
            <strong>Received from backend:</strong>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </form>
    </div>
  );
}

export default App;
