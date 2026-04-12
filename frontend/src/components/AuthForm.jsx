import { useState } from 'react';

export default function AuthForm({ onSubmit, type }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <h2>{type === 'login' ? 'Login' : 'Register'}</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={() => onSubmit(username, password)}>
        {type === 'login' ? 'Login' : 'Register'}
      </button>
    </div>
  );
}