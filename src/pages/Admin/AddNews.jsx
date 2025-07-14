import React, { useState } from "react";

const AddNews = () => {
  const [form, setForm] = useState({
    title: "",
    body: "",
    category: "",
    priority: "medium",
    tags: "",
    excerpt: "",
    attachments: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) setMessage("News published!");
    else setMessage("Error publishing news.");
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Publish News</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="input"
          required
        />
        <textarea
          name="body"
          placeholder="Body"
          value={form.body}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="input"
        />
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="input"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
        <input
          name="tags"
          placeholder="Tags"
          value={form.tags}
          onChange={handleChange}
          className="input"
        />
        <input
          name="excerpt"
          placeholder="Excerpt"
          value={form.excerpt}
          onChange={handleChange}
          className="input"
        />
        <input
          name="attachments"
          placeholder="Attachments"
          value={form.attachments}
          onChange={handleChange}
          className="input"
        />
        <button type="submit" className="btn">
          Publish
        </button>
      </form>
      {message && <div className="mt-4">{message}</div>}
    </div>
  );
};

export default AddNews;
