'use client'
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [key, setKey] = useState('');
  const router = useRouter();

  const handleSubmit = (e:any) => {
    e.preventDefault();
    sessionStorage.setItem('key', key);
    router.push('/ui/asset');
  };

  return (
    <div>
      <h1>Nhập Key</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={key} onChange={(e) => setKey(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
