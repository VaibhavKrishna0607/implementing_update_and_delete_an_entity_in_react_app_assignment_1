import React, { useState } from "react";

const UpdateItem = ({ item }) => {
  const [formData, setFormData] = useState({
    name: item.name || "",
    description: item.description || "",
  });
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log("Form data on change:", formData); // Debugging
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData); // Debugging

    fetch(`http://${import.meta.env.VITE_API_URI}/doors/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        console.log("Update response status:", response.status); // Debugging
        if (!response.ok) throw new Error("Failed to update data");
        return response.json();
      })
      .then((data) => {
        console.log("Update success:", data); // Debugging
        setMessage("Item updated successfully!");
      })
      .catch((error) => setMessage(`Error updating item: ${error.message}`));
  };

  return (
    <div>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <button type="submit">Update</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateItem;
