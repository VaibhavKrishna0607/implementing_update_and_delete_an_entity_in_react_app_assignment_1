import React, { useState, useEffect } from "react";
import UpdateItem from "./components/UpdateItem";

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`${API_URI}/1`) 
      .then((response) => {
        console.log("Response status:", response.status); 
        if (!response.ok) throw new Error("Failed to fetch data");
        return response.json();
      })
      .then((data) => {
        console.log("Fetched item:", data); 
        setItem(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return <UpdateItem item={item} />;
}

export default App;
