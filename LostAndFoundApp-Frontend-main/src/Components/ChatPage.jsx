import React, { useState } from 'react';
import { useWebSocket } from '../Context/WebSocketContext';
import { Send, Users, User, MessageSquarePlus } from 'lucide-react';

const ChatPage = () => {
  const { 
    isConnected, 
    globalMessages, 
    privateMessages, 
    currentUser, 
    sendGlobalMessage, 
    sendPrivateMessage 
  } = useWebSocket();

  const [globalInput, setGlobalInput] = useState('');
  const [privateInput, setPrivateInput] = useState('');
  const [recipient, setRecipient] = useState('');
  const [activeChatUser, setActiveChatUser] = useState(null); 
  const [showNewPrivateForm, setShowNewPrivateForm] = useState(false);

  const handleSendGlobal = (e) => {
    e.preventDefault();
    if (globalInput.trim()) {
      sendGlobalMessage(globalInput);
      setGlobalInput('');
    }
  };

  const handleSendPrivate = (e) => {
    e.preventDefault();
    if (privateInput.trim() && (recipient || activeChatUser)) {
      const targetUser = recipient || activeChatUser;
      sendPrivateMessage(targetUser, privateInput);
      setPrivateInput('');
      if (recipient) setRecipient('');
      if (!activeChatUser) {
        setActiveChatUser(targetUser);
        setShowNewPrivateForm(false); // Hide form after initiating chat
      }
    }
  };

  const privateChatUsers = Object.keys(privateMessages);
  const activeChatMessages = activeChatUser ? privateMessages[activeChatUser] || [] : [];

  if (!isConnected || !currentUser) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="text-center">
          <p>Connecting to chat...</p>
          <p className="text-sm text-gray-400 mt-2">Messages are session-only and clear on disconnect.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-800 text-white">
      {/* Sidebar: Profile & Chat List */}
      <div className="w-1/4 bg-gray-900 p-4 border-r border-gray-700 flex flex-col overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <User size={20} /> My Profile
        </h2>
        <div className="p-3 bg-gray-700 rounded-lg mb-6">
          <p className="font-semibold">{currentUser.username}</p>
          <p className="text-sm text-gray-400 capitalize">{currentUser.role}</p>
        </div>
        
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Users size={20} /> Chats
        </h2>
        
        {/* Global Chat Button */}
        <button
          onClick={() => setActiveChatUser(null)}
          className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
            !activeChatUser ? 'bg-yellow-600 text-black' : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          🌐 Global Chat
        </button>

        {/* Private Chats List */}
        {privateChatUsers.length > 0 && (
          <div className="space-y-2 mb-4">
            {privateChatUsers.map((user) => (
              <button
                key={user}
                onClick={() => setActiveChatUser(user)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  activeChatUser === user ? 'bg-yellow-600 text-black' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                👤 {user}
              </button>
            ))}
          </div>
        )}

        {/* Toggle New Private Chat */}
        {!activeChatUser && (
          <button
            onClick={() => setShowNewPrivateForm(!showNewPrivateForm)}
            className="w-full flex items-center gap-2 p-3 rounded-lg mt-auto bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <MessageSquarePlus size={16} />
            {showNewPrivateForm ? 'Cancel New Chat' : 'Start New Private Chat'}
          </button>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="w-3/4 flex flex-col">
        {/* Header */}
        <div className="bg-gray-900 p-4 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {activeChatUser ? `Chat with ${activeChatUser}` : 'Global Chat'}
          </h2>
          <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
            isConnected ? 'bg-green-600' : 'bg-red-600'
          }`}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-800">
          {(activeChatUser ? activeChatMessages : globalMessages).map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === currentUser.username ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`p-3 rounded-lg max-w-lg ${
                  msg.sender === currentUser.username
                    ? 'bg-yellow-600 text-black'
                    : 'bg-gray-700 text-white'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <p className="font-bold text-sm">{msg.sender}</p>
                  <p className="text-xs text-gray-500">{new Date().toLocaleTimeString()}</p>
                </div>
                <p className="text-base break-words">{msg.content}</p>
              </div>
            </div>
          ))}
          {globalMessages.length === 0 && !activeChatUser && (
            <div className="text-center text-gray-400 mt-8">
              <p>Start the conversation in the global chat!</p>
              <p className="text-sm mt-1">(Messages clear when you disconnect)</p>
            </div>
          )}
          {activeChatMessages.length === 0 && activeChatUser && (
            <div className="text-center text-gray-400 mt-8">
              <p>No messages yet with {activeChatUser}</p>
            </div>
          )}
        </div>

        {/* Input Form */}
        {activeChatUser ? (
          // Private Input
          <form onSubmit={handleSendPrivate} className="bg-gray-900 p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={privateInput}
                onChange={(e) => setPrivateInput(e.target.value)}
                placeholder={`Message ${activeChatUser}...`}
                className="flex-1 p-3 bg-gray-700 rounded-lg outline-none text-white placeholder-gray-400"
                disabled={!isConnected}
              />
              <button 
                type="submit" 
                disabled={!isConnected || !privateInput.trim()}
                className="p-3 bg-yellow-600 text-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        ) : (
          // Global Input
          <form onSubmit={handleSendGlobal} className="bg-gray-900 p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={globalInput}
                onChange={(e) => setGlobalInput(e.target.value)}
                placeholder="Type a message to everyone..."
                className="flex-1 p-3 bg-gray-700 rounded-lg outline-none text-white placeholder-gray-400"
                disabled={!isConnected}
              />
              <button 
                type="submit" 
                disabled={!isConnected || !globalInput.trim()}
                className="p-3 bg-yellow-600 text-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        )}

        {/* New Private Form (Only in Global View) */}
        {!activeChatUser && showNewPrivateForm && (
          <form onSubmit={handleSendPrivate} className="bg-gray-900 p-4 border-t border-gray-700 border-dashed">
            <p className="text-sm text-center text-gray-400 mb-2">Start private chat (session-only)</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Username..."
                className="w-1/3 p-3 bg-gray-700 rounded-lg outline-none text-white placeholder-gray-400"
                disabled={!isConnected}
              />
              <input
                type="text"
                value={privateInput}
                onChange={(e) => setPrivateInput(e.target.value)}
                placeholder="Message..."
                className="flex-1 p-3 bg-gray-700 rounded-lg outline-none text-white placeholder-gray-400"
                disabled={!isConnected}
              />
              <button 
                type="submit" 
                disabled={!isConnected || !privateInput.trim() || !recipient.trim()}
                className="p-3 bg-yellow-600 text-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChatPage;