'use client'

import { useState } from 'react'
import {
    MessageSquare,
    Send,
    Search,
    User,
    Clock,
    CheckCheck,
} from 'lucide-react'

// Mock data
const conversations = [
    {
        id: '1',
        teacher: 'M. Ibrahim',
        subject: 'Mathématiques',
        lastMessage: 'N\'oubliez pas le devoir pour lundi.',
        time: '10:30',
        unread: 2,
    },
    {
        id: '2',
        teacher: 'Mme Diallo',
        subject: 'Français',
        lastMessage: 'Le bulletin a été envoyé.',
        time: 'Hier',
        unread: 0,
    },
    {
        id: '3',
        teacher: 'Administration',
        subject: 'École',
        lastMessage: 'Rappel: Paiement du 2ème trimestre.',
        time: 'Lun',
        unread: 1,
    },
]

const messages = [
    { id: '1', sender: 'teacher', text: 'Bonjour, comment se porte votre enfant ?', time: '09:00' },
    { id: '2', sender: 'parent', text: 'Bonjour M. Ibrahim, il va bien merci!', time: '09:15' },
    { id: '3', sender: 'teacher', text: 'Parfait. Je voulais vous informer qu\'il a obtenu 16/20 au dernier devoir.', time: '09:16' },
    { id: '4', sender: 'parent', text: 'C\'est une excellente nouvelle! Merci de nous tenir informés.', time: '09:20' },
    { id: '5', sender: 'teacher', text: 'N\'oubliez pas le devoir pour lundi.', time: '10:30' },
]

export default function ParentMessagesPage() {
    const [selectedConv, setSelectedConv] = useState(conversations[0])
    const [newMessage, setNewMessage] = useState('')
    const [search, setSearch] = useState('')

    const handleSend = () => {
        if (newMessage.trim()) {
            // Send message logic
            setNewMessage('')
        }
    }

    return (
        <div className="h-[calc(100vh-8rem)]">
            {/* Header */}
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
                <p className="text-gray-600">Communiquez avec l'école et les enseignants</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-[calc(100%-4rem)] flex overflow-hidden">
                {/* Conversations List */}
                <div className="w-80 border-r border-gray-100 flex flex-col">
                    <div className="p-4 border-b border-gray-100">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {conversations.map((conv) => (
                            <button
                                key={conv.id}
                                onClick={() => setSelectedConv(conv)}
                                className={`w-full p-4 text-left border-b border-gray-50 transition-colors ${selectedConv.id === conv.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                                        {conv.teacher.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-gray-900 truncate">{conv.teacher}</span>
                                            <span className="text-xs text-gray-500">{conv.time}</span>
                                        </div>
                                        <p className="text-sm text-gray-500 truncate">{conv.subject}</p>
                                        <p className="text-sm text-gray-600 truncate mt-1">{conv.lastMessage}</p>
                                    </div>
                                    {conv.unread > 0 && (
                                        <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                                            {conv.unread}
                                        </span>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col">
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                            {selectedConv.teacher.charAt(0)}
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">{selectedConv.teacher}</h3>
                            <p className="text-sm text-gray-500">{selectedConv.subject}</p>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'parent' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${msg.sender === 'parent'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-900'
                                    }`}>
                                    <p>{msg.text}</p>
                                    <div className={`flex items-center gap-1 mt-1 text-xs ${msg.sender === 'parent' ? 'text-blue-200' : 'text-gray-400'
                                        }`}>
                                        <Clock className="h-3 w-3" />
                                        {msg.time}
                                        {msg.sender === 'parent' && <CheckCheck className="h-3 w-3 ml-1" />}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-gray-100">
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Tapez votre message..."
                                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <button
                                onClick={handleSend}
                                className="px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                            >
                                <Send className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
