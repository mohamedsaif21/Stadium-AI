'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from '@/lib/types';

interface ChatbotProps {
  role: 'fan' | 'volunteer' | 'admin';
  apiEndpoint?: string;
  placeholder?: string;
  title?: string;
}

export function Chatbot({ role, apiEndpoint = '/api/ai/chat', placeholder = 'Ask me anything...', title = 'AI Assistant' }: ChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: role === 'fan'
        ? 'Hello! I\'m your StadiumAI assistant. I can help you with navigation, accessibility, transport, translations, and more. How can I help you today?'
        : role === 'volunteer'
        ? 'Hello! I\'m your StadiumAI volunteer assistant. I can help with SOPs, incident responses, and fan guidance. What do you need?'
        : 'Hello! I\'m your StadiumAI operations assistant. I can help with operational decisions, crowd management, and resource allocation.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const quickSuggestions = {
    fan: ['Fastest route to Gate B', 'Accessible restroom nearby', 'Metro after match'],
    volunteer: ['Lost child SOP', 'Crowd reroute steps', 'Medical escalation'],
    admin: ['Summarize active risk', 'Recommend staffing', 'Post-match exit plan'],
  }[role];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-User-Role': role },
        body: JSON.stringify({ message: userMessage.content, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now()}-resp`,
        role: 'assistant',
        content: data.response || data.mock_response || 'I apologize, I could not process that request.',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const submitSuggestion = (suggestion: string) => {
    if (loading) return;
    setInput(suggestion);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  };

  const renderInlineStyles = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-extrabold text-white">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('- ')) {
        return <li key={i} className="text-blue-200 ml-4 list-disc list-inside mt-0.5">{renderInlineStyles(line.substring(2))}</li>;
      }
      if (line.startsWith('\u2022 ')) {
        return <li key={i} className="text-blue-200 ml-4 list-disc list-inside mt-0.5">{renderInlineStyles(line.substring(2))}</li>;
      }
      if (line.match(/^\d+\./)) {
        const dotIndex = line.indexOf('.');
        const num = line.substring(0, dotIndex + 1);
        const text = line.substring(dotIndex + 1).trim();
        return (
          <li key={i} className="text-blue-200 ml-4 list-decimal list-inside mt-0.5">
            <span className="font-semibold text-white mr-1">{num}</span>
            {renderInlineStyles(text)}
          </li>
        );
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-bold text-white mt-2 mb-1">{renderInlineStyles(line.slice(2, -2))}</p>;
      }
      return <p key={i} className="text-blue-100/90 leading-relaxed min-h-[1rem]">{renderInlineStyles(line)}</p>;
    });
  };

  return (
    <div className="flex flex-col h-full bg-navy-950/80 rounded-2xl overflow-hidden border border-navy-700/60 glass-panel shadow-2xl">
      <div className="bg-navy-900/90 px-4 py-3.5 border-b border-navy-800/80 flex items-center justify-between">
        <h3 className="text-white font-semibold text-sm flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-blue-600 ai-pulse flex items-center justify-center shadow-md shadow-blue-600/25" aria-hidden="true">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.25} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c.251.023.501.05.75.082m-.75-.082a24.301 24.301 0 00-4.5 0m4.5 0v.004M14.25 3.104v5.714c0 .597.237 1.17.659 1.591L19 14.5m-4.75-11.396c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m-4.5 0v.004M5 14.5h14m-14 0l1.5 5.25h11L19 14.5" />
            </svg>
          </span>
          {title}
        </h3>
        <span className="text-xs text-blue-300/60 font-medium px-2 py-0.5 bg-white/5 rounded-full border border-white/5 uppercase tracking-wider">{role}</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-navy-950/40" role="log" aria-label="Chat messages" aria-live="polite">
        <AnimatePresence initial={false}>
        {messages.map(msg => (
          <motion.div
            key={msg.id}
            className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18 }}
          >
            {msg.role === 'assistant' && (
              <div className="mt-1 w-7 h-7 rounded-lg bg-blue-600/90 flex items-center justify-center flex-shrink-0 border border-blue-300/20" aria-hidden="true">
                <span className="text-[10px] font-black text-white">AI</span>
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-md ${
                msg.role === 'user'
                  ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-tr-none'
                  : 'bg-navy-800/90 text-blue-100/95 rounded-tl-none border border-white/5'
              }`}
            >
              {msg.role === 'assistant' ? (
                <div className="text-sm space-y-2 leading-relaxed">{formatContent(msg.content)}</div>
              ) : (
                <p className="text-sm leading-relaxed">{msg.content}</p>
              )}
              <span className="text-[10px] opacity-50 mt-1.5 block text-right font-mono">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </motion.div>
        ))}
        </AnimatePresence>
        {loading && (
          <div className="flex justify-start gap-2">
            <div className="mt-1 w-7 h-7 rounded-lg bg-blue-600/90 flex items-center justify-center flex-shrink-0 border border-blue-300/20" aria-hidden="true">
              <span className="text-[10px] font-black text-white">AI</span>
            </div>
            <div className="bg-navy-800/90 border border-white/5 rounded-2xl rounded-tl-none px-4 py-3.5 shadow-sm">
              <div className="flex gap-1.5 items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="bg-red-950/40 text-red-200 text-xs p-3.5 rounded-xl border border-red-900/50 shadow-md animate-shake" role="alert">
            <div className="flex items-center gap-1.5 font-semibold text-red-400 mb-0.5">
              <span className="font-bold">!</span> Connection Error
            </div>
            {error}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-navy-800/80 bg-navy-900/50 backdrop-blur-sm">
        <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-3" aria-label="Quick chat suggestions">
          {quickSuggestions.map(suggestion => (
            <button
              key={suggestion}
              type="button"
              onClick={() => submitSuggestion(suggestion)}
              className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-blue-100 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={loading}
            >
              {suggestion}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={placeholder}
            disabled={loading}
            className="flex-1 bg-navy-900 text-white rounded-xl px-4 py-3 text-sm placeholder-blue-300/40 border border-navy-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
            aria-label="Chat input"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md shadow-blue-600/20 flex items-center justify-center"
            aria-label="Send message"
          >
            <svg className="w-5 h-5 transform rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
