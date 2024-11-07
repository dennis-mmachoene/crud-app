import React, { useState, useEffect } from 'react';
import { getItems, createItem, updateItem, deleteItem } from './api';
import './App.css';

function App() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', description: '' });
    const [editItem, setEditItem] = useState(null);

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        const result = await getItems();
        setItems(result.data);
    };

    const handleCreate = async () => {
        await createItem(newItem);
        setNewItem({ name: '', description: '' });
        loadItems();
    };

    const handleUpdate = async () => {
        await updateItem(editItem.id, editItem);
        setEditItem(null);
        loadItems();
    };

    const handleDelete = async (id) => {
        await deleteItem(id);
        loadItems();
    };

    return (
        <div className="container">
            <h1>CRUD App</h1>
            <div className="form">
                <input
                    type="text"
                    placeholder="Name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                />
                <button onClick={handleCreate}>Add Item</button>
            </div>

            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <button onClick={() => setEditItem(item)}>Edit</button>
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {editItem && (
                <div className="form">
                    <input
                        type="text"
                        value={editItem.name}
                        onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                    />
                    <input
                        type="text"
                        value={editItem.description}
                        onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                    />
                    <button onClick={handleUpdate}>Update Item</button>
                </div>
            )}
        </div>
    );
}

export default App;
