import React, { useState, useEffect } from "react";
import UpdateItem from "./components/UpdateItem";

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`${API_URI}/1`) // Replace "1" with desired ID
      .then((response) => {
        console.log("Response status:", response.status); // Debugging
        if (!response.ok) throw new Error("Failed to fetch data");
        return response.json();
      })
      .then((data) => {
        console.log("Fetched item:", data); // Debugging
        setItem(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return item ? <UpdateItem item={item} /> : <p>Loading...</p>;
}

export default App;
