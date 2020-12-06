import './App.css';
import { useState, useEffect } from 'react';
function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [_id, setId] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [])

  function addUser() {
      fetch('http://localhost:3001/users', {
      method: "POST",
      body: JSON.stringify({ name, price, description, date }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    })
    .then(res => res.json())
    .then(data => {
      setName('');
      setPrice('');
      setDescription('');
      setDate('');
      setUsers([...users, data])
    });
  }

  function updateUser(user) {
    fetch(`http://localhost:3001/users/${user}`, {
      method: "PUT",
    })
    setName(user.name);
    setPrice(user.price);
    setDescription(user.description);
    setDate(user.date);
    setId(user._id);
  }

  function deleteUser(_id) {
    fetch(`http://localhost:3001/users/${_id}`, {
      method: "DELETE",
    })
    .then(res => res.json())
    .then(data => {
      const newProducts = users.filter(user => user._id !== _id);
      setUsers(newProducts);
    });
  }

  return (
    <div className="App">
      <div>
        <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input type="text" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="text" placeholder="date ex: 2020-02-25" value={date} onChange={(e) => setDate(e.target.value)} />
        <button onClick={addUser}>Adicionar</button>
      </div>

      {
        users.map(user => {
          return (
          <div className="usuario" key={user._id}>
            <div>Name: {user.name}</div>
            <div>Price: {user.price}</div>
            <div>Description: {user.description}</div>
            <div>Date: {user.date}</div>
            <button onClick={() => updateUser(user)}>Atualizar</button>
            <button onClick={() => deleteUser(user._id)}>Deletar</button>
          </div>
          )
        })
      }
    </div>
      
  );
}

export default App;
