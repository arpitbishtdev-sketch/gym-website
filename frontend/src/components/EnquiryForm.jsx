import { useState } from "react";
import axios from "axios";
import { API } from "../api";
import { toast } from "react-toastify";

export default function EnquiryForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/api/contact`, form);

      toast.success("Enquiry sent! We will contact you soon 💪");

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section style={{ padding: "70px 20px", textAlign: "center" }}>
      <h2>Enquire Now</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "500px",
          margin: "30px auto",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
        />
        <button type="submit">Send Enquiry</button>
      </form>
    </section>
  );
}
