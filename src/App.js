import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [grocery, setGrocery] = useState({ name: '', quantity: '', category: '' });
  const [groceries, setGroceries] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGrocery({ ...grocery, [name]: value });
  };

  const handleAddGrocery = () => {
    if (grocery.name && grocery.quantity && grocery.category) {
      if (editIndex !== null) {
        const updatedGroceries = groceries.map((item, index) =>
          index === editIndex ? grocery : item
        );
        setGroceries(updatedGroceries);
        setEditIndex(null);
      } else {
        setGroceries([...groceries, grocery]);
      }
      setGrocery({ name: '', quantity: '', category: '' });
    }
  };

  const handleEditGrocery = (index) => {
    setGrocery(groceries[index]);
    setEditIndex(index);
  };

  const handleDeleteGrocery = (index) => {
    const updatedGroceries = groceries.filter((_, i) => i !== index);
    setGroceries(updatedGroceries);
  };

  return (
    <div className="App">
      <h1>Grocery List</h1>
      <input
        type="text"
        name="name"
        value={grocery.name}
        onChange={handleInputChange}
        placeholder="Enter grocery name"
      />
      <input
        type="number"
        name="quantity"
        value={grocery.quantity}
        onChange={handleInputChange}
        placeholder="Enter quantity"
      />
      <input
        type="text"
        name="category"
        value={grocery.category}
        onChange={handleInputChange}
        placeholder="Enter category"
      />
      <button onClick={handleAddGrocery}>
        {editIndex !== null ? 'Update' : 'Add'}
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {groceries.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.category}</td>
              <td>
                <button onClick={() => handleEditGrocery(index)}>Edit</button>
                <button onClick={() => handleDeleteGrocery(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;

