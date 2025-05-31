import React, { useState } from 'react';
import axios from 'axios';
import { MessageSquare, SendHorizonal, User, Bot } from 'lucide-react';

export default function RepairSolutions() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [problem, setProblem] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/repair', {
        name, email, phone, location, problem,
      });
      setSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setLocation('');
      setProblem('');
    } catch (err) {
      console.error('Form submission error:', err);
      alert('Error submitting your problem. Please try again.');
    }
    setLoading(false);
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMessages = [...chatMessages, { sender: 'user', text: chatInput }];
    setChatMessages(newMessages);

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/repair/chat', {
        query: chatInput,
      });
      const reply = res.data.reply || 'Sorry, no relevant answer found.';
      setChatMessages([...newMessages, { sender: 'bot', text: reply }]);
    } catch (err) {
      console.error('Chat error:', err);
      setChatMessages([
        ...newMessages,
        { sender: 'bot', text: 'Error processing your query.' },
      ]);
    }
    setChatInput('');
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-700 flex items-center justify-center gap-2">
        <MessageSquare /> Solar Repair & Solutions
      </h1>

      {/* Repair form */}
      <form onSubmit={handleFormSubmit} className="space-y-4 bg-gray-50 p-4 rounded shadow">
        {/* Inputs */}
        {[
          { label: "Name", value: name, setter: setName, type: "text", placeholder: "Your Name" },
          { label: "Email", value: email, setter: setEmail, type: "email", placeholder: "you@example.com" },
          { label: "Phone Number", value: phone, setter: setPhone, type: "tel", placeholder: "03XX-XXXXXXX" },
          { label: "Location", value: location, setter: setLocation, type: "text", placeholder: "City or Area" }
        ].map(({ label, value, setter, type, placeholder }, idx) => (
          <div key={idx}>
            <label className="block mb-1 font-semibold text-blue-700">{label}</label>
            <input
              type={type}
              value={value}
              onChange={(e) => setter(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={placeholder}
              required
            />
          </div>
        ))}

        {/* Problem description */}
        <div>
          <label className="block mb-1 font-semibold text-blue-700">Problem Description</label>
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Describe the issue you're facing..."
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className={`bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Problem'}
        </button>

        {submitted && (
          <p className="text-blue-600 mt-2">✅ Your issue has been submitted successfully!</p>
        )}
      </form>

      {/* Chatbot */}
      <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-4 text-gray-800 flex items-center gap-2">
        <Bot /> Chat with SolarBot
      </h2>

      <div className="border rounded h-64 overflow-y-auto p-4 bg-gray-100 mb-4">
        {chatMessages.map((msg, i) => (
          <div
            key={i}
            className={`mb-3 flex items-start gap-2 ${msg.sender === 'user' ? 'justify-end text-right' : 'justify-start text-left'}`}
          >
            {msg.sender === 'bot' && <Bot className="text-blue-600" size={20} />}
            {msg.sender === 'user' && <User className="text-blue-600" size={20} />}
            <div className="inline-block px-4 py-2 rounded bg-white shadow text-sm">
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleChatSubmit} className="flex items-center gap-2">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Ask about your solar issue..."
          className="flex-1 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          <SendHorizonal size={18} />
        </button>
      </form>
    </div>
  );
}
