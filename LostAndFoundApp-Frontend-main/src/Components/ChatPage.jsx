import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWebSocket } from '../Context/WebSocketContext';
// Import ThemeContext (path might need adjustment)
import { ThemeContext } from '../Context/ThemeContext';
import { 
  Send, 
  Users, 
  User, 
  MessageSquarePlus, 
  ArrowLeft, // For return button
  Sun,       // For theme button
  Moon       // For theme button
} from 'lucide-react';

// A simple theme toggle button component
const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full ${
        theme === 'light' 
          ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
          : 'bg-gray-700 text-white hover:bg-gray-600'
      }`}
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};


const ChatPage = () => {
  const { 
    isConnected, 
    globalMessages, 
    privateMessages, 
    currentUser, 
    sendGlobalMessage, 
    sendPrivateMessage 
  } = useWebSocket();
  
  // Get theme context
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

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

  // Theme-based dynamic classes
  const themeClasses = {
    // Backgrounds
    bgPrimary: theme === 'light' ? 'bg-white' : 'bg-gray-800',
    bgSecondary: theme === 'light' ? 'bg-gray-50' : 'bg-gray-900',
    bgTertiary: theme === 'light' ? 'bg-gray-100' : 'bg-gray-700',
    bgTertiaryHover: theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-gray-600',
    
    // Text
    textPrimary: theme === 'light' ? 'text-gray-900' : 'text-white',
    textSecondary: theme === 'light' ? 'text-gray-500' : 'text-gray-400',
    
    // Borders
    borderPrimary: theme === 'light' ? 'border-gray-200' : 'border-gray-700',
    
    // Placeholders
    placeholder: theme === 'light' ? 'placeholder-gray-500' : 'placeholder-gray-400',

    // My Message Bubble
    msgMeBg: 'bg-yellow-600',
    msgMeText: 'text-black',
    
    // Other Message Bubble
    msgOtherBg: theme === 'light' ? 'bg-gray-200' : 'bg-gray-700',
    msgOtherText: theme === 'light' ? 'text-gray-900' : 'text-white',

    // Active Chat Button
    activeChatBg: 'bg-yellow-600',
    activeChatText: 'text-black',
  };


  if (!isConnected || !currentUser) {
    return (
      <div className={`flex items-center justify-center h-screen ${themeClasses.bgSecondary} ${themeClasses.textPrimary}`}>
        <div className="text-center">
          <p>Connecting to chat...</p>
          <p className={`text-sm ${themeClasses.textSecondary} mt-2`}>
            Messages are session-only and clear on disconnect.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex h-screen ${themeClasses.bgPrimary} ${themeClasses.textPrimary}`}>
      {/* Sidebar: Profile & Chat List */}
      <div className={`w-1/4 ${themeClasses.bgSecondary} p-4 border-r ${themeClasses.borderPrimary} flex flex-col overflow-y-auto`}>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <User size={20} /> My Profile
        </h2>
        <div className={`p-3 ${themeClasses.bgTertiary} rounded-lg mb-6`}>
          <p className="font-semibold">{currentUser.username}</p>
          <p className={`text-sm ${themeClasses.textSecondary} capitalize`}>{currentUser.role}</p>
        </div>
        
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Users size={20} /> Chats
        </h2>
        
        {/* Global Chat Button */}
        <button
          onClick={() => setActiveChatUser(null)}
          className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
            !activeChatUser 
              ? `${themeClasses.activeChatBg} ${themeClasses.activeChatText}` 
              : `${themeClasses.bgTertiary} ${themeClasses.bgTertiaryHover}`
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
                  activeChatUser === user 
                    ? `${themeClasses.activeChatBg} ${themeClasses.activeChatText}` 
                    : `${themeClasses.bgTertiary} ${themeClasses.bgTertiaryHover}`
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
            className={`w-full flex items-center gap-2 p-3 rounded-lg mt-auto ${themeClasses.bgTertiary} ${themeClasses.bgTertiaryHover} transition-colors`}
          >
            <MessageSquarePlus size={16} />
            {showNewPrivateForm ? 'Cancel New Chat' : 'Start New Private Chat'}
          </button>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="w-3/4 flex flex-col">
        {/* Header */}
        <div className={`${themeClasses.bgSecondary} p-4 border-b ${themeClasses.borderPrimary} flex items-center justify-between`}>
          <div className="flex items-center gap-4">
            {/* Return Button */}
            <button
              onClick={() => navigate(-1)} // Or navigate('/dashboard')
              className={`p-2 rounded-full ${themeClasses.bgTertiary} ${themeClasses.bgTertiaryHover}`}
            >
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-2xl font-bold">
              {activeChatUser ? `Chat with ${activeChatUser}` : 'Global Chat'}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
              isConnected ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </div>
            {/* Theme Toggle Button */}
            <ThemeToggleButton />
          </div>
        </div>

        {/* Messages */}
        <div className={`flex-1 p-4 overflow-y-auto space-y-4 ${themeClasses.bgPrimary}`}>
          {(activeChatUser ? activeChatMessages : globalMessages).map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === currentUser.username ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`p-3 rounded-lg max-w-lg ${
                  msg.sender === currentUser.username
                    ? `${themeClasses.msgMeBg} ${themeClasses.msgMeText}`
                    : `${themeClasses.msgOtherBg} ${themeClasses.msgOtherText}`
                }`}
              >
                <div className="flex justify-between items-start mb-1 gap-4">
                  <p className="font-bold text-sm">{msg.sender}</p>
                  <p className={`text-xs ${msg.sender === currentUser.username ? 'text-gray-700' : themeClasses.textSecondary}`}>
                    {new Date().toLocaleTimeString()}
                  </p>
                </div>
                <p className="text-base break-words">{msg.content}</p>
              </div>
            </div>
          ))}
          {globalMessages.length === 0 && !activeChatUser && (
            <div className={`text-center ${themeClasses.textSecondary} mt-8`}>
              <p>Start the conversation in the global chat!</p>
              <p className="text-sm mt-1">(Messages clear when you disconnect)</p>
            </div>
          )}
          {activeChatMessages.length === 0 && activeChatUser && (
            <div className={`text-center ${themeClasses.textSecondary} mt-8`}>
              <p>No messages yet with {activeChatUser}</p>
            </div>
          )}
        </div>

        {/* Input Form */}
        {activeChatUser ? (
          // Private Input
          <form onSubmit={handleSendPrivate} className={`${themeClasses.bgSecondary} p-4 border-t ${themeClasses.borderPrimary}`}>
            <div className="flex gap-2">
              <input
                type="text"
                value={privateInput}
                onChange={(e) => setPrivateInput(e.target.value)}
                placeholder={`Message ${activeChatUser}...`}
                className={`flex-1 p-3 ${themeClasses.bgTertiary} rounded-lg outline-none ${themeClasses.textPrimary} ${themeClasses.placeholder}`}
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
          <form onSubmit={handleSendGlobal} className={`${themeClasses.bgSecondary} p-4 border-t ${themeClasses.borderPrimary}`}>
            <div className="flex gap-2">
              <input
                type="text"
                value={globalInput}
                onChange={(e) => setGlobalInput(e.target.value)}
                placeholder="Type a message to everyone..."
                className={`flex-1 p-3 ${themeClasses.bgTertiary} rounded-lg outline-none ${themeClasses.textPrimary} ${themeClasses.placeholder}`}
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
          <form onSubmit={handleSendPrivate} className={`${themeClasses.bgSecondary} p-4 border-t ${themeClasses.borderPrimary} border-dashed`}>
            <p className={`text-sm text-center ${themeClasses.textSecondary} mb-2`}>Start private chat (session-only)</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Username..."
                className={`w-1/3 p-3 ${themeClasses.bgTertiary} rounded-lg outline-none ${themeClasses.textPrimary} ${themeClasses.placeholder}`}
                disabled={!isConnected}
              />
              <input
                type="text"
                value={privateInput}
                onChange={(e) => setPrivateInput(e.target.value)}
                placeholder="Message..."
                className={`flex-1 p-3 ${themeClasses.bgTertiary} rounded-lg outline-none ${themeClasses.textPrimary} ${themeClasses.placeholder}`}
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