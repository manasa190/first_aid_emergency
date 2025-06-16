import React, { useState, useEffect } from 'react';

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  
  const userId = 'YOUR_USER_ID';

  useEffect(() => {
    fetch(`/api/emergency-contacts/get/${userId}`)
      .then(res => res.json())
      .then(data => setContacts(data.emergencyContacts || []));
  }, [userId]);

  const addContact = async () => {
    if (!name || !phone) return;
    const res = await fetch('/api/emergency-contacts/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, contact: { name, phone } })
    });
    const data = await res.json();
    if (data.contact) setContacts([...contacts, data.contact]);
    setName(''); setPhone('');
  };

  return (
    <div className="app-container">
      <header>Emergency Contacts</header>
      <div style={{ marginBottom: 24 }}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
        <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" />
        <button className="button" onClick={addContact}>Add Contact</button>
      </div>
      <div className="masonry-grid">
        {contacts.map((c, i) => (
          <div className="masonry-card" key={i}>
            <div className="card-title">{c.name}</div>
            <div className="card-content">{c.phone}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contacts;