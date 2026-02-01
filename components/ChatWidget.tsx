import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Terminal, Minimize2, Maximize2, Sparkles } from 'lucide-react';
import { streamChatResponse } from '../services/geminiService';
import { ChatMessage, ChatSender } from '../types';

interface ChatWidgetProps {
  theme: 'dark' | 'light';
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      text: "System initialized. I am Abby v2.0. How can I assist with your engineering needs?",
      sender: ChatSender.BOT,
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hasApiKey, setHasApiKey] = useState(!!process.env.API_KEY);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || !hasApiKey) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: ChatSender.USER,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const history = messages.filter(m => m.id !== 'welcome').map(m => ({
        role: m.sender === ChatSender.USER ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const stream = await streamChatResponse(userMsg.text, history);
      
      const botMsgId = (Date.now() + 1).toString();
      let fullResponse = "";
      
      setMessages(prev => [...prev, {
        id: botMsgId,
        text: "",
        sender: ChatSender.BOT,
        timestamp: new Date(),
        isStreaming: true
      }]);

      for await (const chunk of stream) {
        const text = chunk.text || "";
        fullResponse += text;
        setMessages(prev => prev.map(m => 
          m.id === botMsgId ? { ...m, text: fullResponse } : m
        ));
      }
      
      setMessages(prev => prev.map(m => 
        m.id === botMsgId ? { ...m, isStreaming: false } : m
      ));

    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: "Connection interrupted. Realigning neural pathways... Try again later.",
        sender: ChatSender.BOT,
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 font-sans flex flex-col items-end">
      {/* Trigger Button - Stable, sleek */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          group relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 shadow-2xl
          ${isOpen ? 'rotate-90 scale-0 opacity-0 absolute' : 'scale-100 opacity-100'}
          ${theme === 'dark' 
            ? 'bg-brand-gray border border-white/20 hover:border-brand-accent shadow-brand-accent/20' 
            : 'bg-white border border-black/10 hover:border-black/30 shadow-xl'}
        `}
      >
        <div className={`absolute inset-0 rounded-full animate-ping opacity-10 ${theme === 'dark' ? 'bg-brand-accent' : 'bg-black'}`}></div>
        <Bot className={`w-6 h-6 transition-colors ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
        <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
      </button>

      {/* Main Chat Interface - Fixed, Structural, Glass */}
      <div 
        className={`
          origin-bottom-right transition-all duration-300 ease-out overflow-hidden flex flex-col
          rounded-2xl border backdrop-blur-xl shadow-2xl
          ${isOpen 
            ? 'w-[380px] h-[600px] opacity-100 scale-100 translate-y-0' 
            : 'w-0 h-0 opacity-0 scale-95 translate-y-10 pointer-events-none'}
          ${theme === 'dark'
            ? 'bg-brand-gray/90 border-white/10 shadow-black/50'
            : 'bg-white/95 border-black/5 shadow-2xl'}
        `}
      >
        {/* Header - Technical/Terminal Look */}
        <div className={`
          p-4 border-b flex justify-between items-center select-none
          ${theme === 'dark' ? 'bg-black/40 border-white/5' : 'bg-white border-black/5'}
        `}>
          <div className="flex items-center gap-3">
             <div className={`
               w-2 h-2 rounded-full animate-pulse
               ${theme === 'dark' ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]' : 'bg-green-600'}
             `}></div>
             <span className={`font-mono text-xs tracking-widest uppercase ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
               AB_INTEL_V2
             </span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsOpen(false)}
              className={`p-1.5 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-black/5 text-gray-600'}`}
            >
              <Minimize2 size={16} />
            </button>
          </div>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar relative">
          {!hasApiKey && (
             <div className="text-center font-mono text-[10px] text-red-400 opacity-70">
               [SYSTEM_WARNING]: API_KEY_MISSING // DEMO_MODE
             </div>
          )}
          
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === ChatSender.USER ? 'items-end' : 'items-start'}`}
            >
              <div className={`
                flex items-center gap-2 mb-1 text-[10px] font-mono tracking-wider opacity-50
                ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}
              `}>
                {msg.sender === ChatSender.BOT ? 'AB_AI' : 'YOU'}
              </div>
              <div
                className={`
                  max-w-[85%] p-4 text-sm leading-relaxed relative group shadow-sm
                  ${msg.sender === ChatSender.USER
                    ? (theme === 'dark' 
                        ? 'bg-brand-accent text-white rounded-2xl rounded-tr-sm' 
                        : 'bg-black text-white rounded-2xl rounded-tr-sm')
                    : (theme === 'dark' 
                        ? 'bg-white/5 text-gray-100 border border-white/5 rounded-2xl rounded-tl-sm' 
                        : 'bg-white text-slate-800 border border-slate-100 rounded-2xl rounded-tl-sm')
                  }
                `}
              >
                {msg.sender === ChatSender.BOT && (
                   <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                )}
                {msg.text}
                {msg.isStreaming && <span className="inline-block w-2 h-4 ml-1 align-middle bg-current animate-pulse"/>}
              </div>
            </div>
          ))}

          {isTyping && !messages.some(m => m.isStreaming) && (
            <div className="flex items-start gap-2">
               <div className={`p-3 rounded-2xl rounded-tl-sm ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'}`}>
                 <div className="flex gap-1 h-4 items-center">
                   <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                   <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                   <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                 </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className={`p-4 ${theme === 'dark' ? 'bg-black/20' : 'bg-slate-50 border-t border-black/5'}`}>
          <div className={`
            relative flex items-center gap-2 rounded-xl border p-1 transition-colors
            ${theme === 'dark' ? 'bg-black/40 border-white/10 focus-within:border-brand-accent/50' : 'bg-white border-slate-200 focus-within:border-black/20 shadow-sm'}
          `}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Execute command or ask query..."
              className={`
                w-full bg-transparent py-3 px-4 text-sm focus:outline-none font-mono
                ${theme === 'dark' ? 'text-white placeholder-gray-600' : 'text-slate-900 placeholder-slate-400'}
              `}
              disabled={!hasApiKey}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || !hasApiKey}
              className={`
                p-2 rounded-lg transition-all
                ${!input.trim() 
                  ? 'opacity-30 grayscale cursor-not-allowed' 
                  : (theme === 'dark' ? 'bg-brand-accent hover:bg-brand-neon text-white' : 'bg-black hover:bg-gray-800 text-white')}
              `}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;