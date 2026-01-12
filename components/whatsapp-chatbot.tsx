'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

// Helper function to parse and format markdown text
const formatMessage = (text: string) => {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];

  lines.forEach((line, index) => {
    // Handle bullet points
    if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
      const content = line.replace(/^[\s]*[*-]\s/, '');
      const formatted = formatInlineMarkdown(content);
      elements.push(
        <div
          key={index}
          className='flex gap-2 ml-2 my-1'>
          <span className='text-gray-600 select-none'>•</span>
          <span>{formatted}</span>
        </div>
      );
    }
    // Handle numbered lists
    else if (/^\d+\.\s/.test(line.trim())) {
      const content = line.replace(/^\s*\d+\.\s/, '');
      const formatted = formatInlineMarkdown(content);
      elements.push(
        <div
          key={index}
          className='flex gap-2 ml-2 my-1'>
          <span>{formatted}</span>
        </div>
      );
    }
    // Handle regular text
    else if (line.trim()) {
      const formatted = formatInlineMarkdown(line);
      elements.push(
        <div
          key={index}
          className='my-1'>
          {formatted}
        </div>
      );
    }
    // Handle empty lines (paragraph breaks)
    else if (elements.length > 0) {
      elements.push(
        <div
          key={index}
          className='h-2'
        />
      );
    }
  });

  return elements;
};

const formatInlineMarkdown = (text: string) => {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  const regex = /\*\*(.*?)\*\*/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    parts.push(
      <strong
        key={match.index}
        className='font-semibold'>
        {match[1]}
      </strong>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
};

export function WhatsAppChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content:
        "Hello! I'm your AI assistant for freight forwarding. How can I help you today?",
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const messagesContainer = messagesContainerRef.current;
    if (!messagesContainer) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      messagesContainer.scrollTop += e.deltaY;
    };

    messagesContainer.addEventListener('wheel', handleWheel, {
      passive: false,
    });
    return () => messagesContainer.removeEventListener('wheel', handleWheel);
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('[v0] Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className='fixed bottom-6 right-6 z-50 rounded-full bg-[#25D366] p-4 text-white shadow-lg'
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
        transition={{ duration: 0.2 }}>
        <MessageCircle className='h-6 w-6' />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className='fixed bottom-6 right-6 z-50 flex h-[600px] w-[380px] flex-col overflow-hidden rounded-lg bg-[#f0f2f5] shadow-2xl'>
            {/* Header */}
            <div className='flex items-center justify-between bg-[#075E54] px-4 py-3 text-white'>
              <div className='flex items-center gap-3'>
                <div className='relative'>
                  <div className='h-10 w-10 rounded-full bg-white/20' />
                  <div className='absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#075E54] bg-[#25D366]' />
                </div>
                <div>
                  <p className='text-sm font-medium'>Truvenix Limited</p>
                  <p className='text-xs opacity-90'>AI Assistant • Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className='rounded-full p-1 hover:bg-white/10'>
                <X className='h-5 w-5' />
              </button>
            </div>

            {/* Chat Background */}
            <div
              ref={messagesContainerRef}
              className='flex-1 overflow-y-auto bg-[#e5ddd5] p-4 scrollbar-hide'
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h300v300H0z' fill='%23e5ddd5'/%3E%3Cpath d='M150 150L75 225M150 150l75 75M150 150L75 75M150 150l75-75' stroke='%23d1ccc0' strokeWidth='0.5' opacity='.05'/%3E%3C/svg%3E\")",
              }}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'mb-2 flex',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}>
                  <div
                    className={cn(
                      'max-w-[75%] rounded-lg px-3 py-2 shadow-sm',
                      message.role === 'user' ? 'bg-[#dcf8c6]' : 'bg-white'
                    )}>
                    <div className='text-sm leading-relaxed text-gray-900'>
                      {formatMessage(message.content)}
                    </div>
                    <p className='mt-1 text-right text-[10px] text-gray-500'>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className='mb-2 flex justify-start'>
                  <div className='max-w-[75%] rounded-lg bg-white px-3 py-2 shadow-sm'>
                    <div className='flex gap-1'>
                      <div className='h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]' />
                      <div className='h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]' />
                      <div className='h-2 w-2 animate-bounce rounded-full bg-gray-400' />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className='flex items-center gap-2 bg-[#f0f2f5] p-3'>
              <input
                type='text'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                placeholder='Type a message...'
                className='flex-1 rounded-full border-none bg-white px-4 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#25D366] disabled:opacity-50'
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className='rounded-full bg-[#25D366] p-2 text-white transition-colors hover:bg-[#128C7E] disabled:opacity-50'>
                <Send className='h-5 w-5' />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
