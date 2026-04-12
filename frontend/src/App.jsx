import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/items`)
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching items:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app">
      <h1>Inventory</h1>
      {loading ? (
        <p>Loading items...</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.name} — {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;