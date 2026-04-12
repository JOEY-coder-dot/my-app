import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/items`)
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  return (
    <div>
      <h1>Supabase Items</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;