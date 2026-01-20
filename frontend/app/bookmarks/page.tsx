"use client";

import React, { useState } from 'react';
import { Bookmark, Search, Filter, Play, Trash2, Clock, BookOpen, Sparkles } from 'lucide-react';
import { INITIAL_COMPANIONS } from '@/constants/constants';
import CompanionCard from '@/components/cards/CompanionCard';

const BookmarksPage = () => {
    const [searchQuery, setSearchQuery] = useState("");

    // Mocking bookmarked companions from INITIAL_COMPANIONS
    const bookmarkedCompanions = INITIAL_COMPANIONS.slice(0, 4);

    const filteredBookmarks = bookmarkedCompanions.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="max-w-7xl mx-auto py-10 px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-[#FF5B37] rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                            <Bookmark size={20} fill="currentColor" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-0">My Bookmarks</h1>
                    </div>
                    <p className="text-gray-500 font-medium">Your curated list of favorite learning companions</p>
                </div>

                <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search bookmarks..."
                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF5B37]/10 transition-all font-medium text-sm shadow-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {filteredBookmarks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredBookmarks.map((companion) => (
                        <div key={companion.id} className="group relative">
                            <CompanionCard companion={companion} />
                            {/* Overlay for quick actions if needed */}
                        </div>
                    ))}

                    {/* Add New Bookmark Mock Button */}
                    <div className="border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-gray-50/30 hover:bg-gray-50 hover:border-[#FF5B37]/30 transition-all group cursor-pointer h-full min-h-[300px]">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                            <Sparkles className="text-[#FF5B37]" size={24} />
                        </div>
                        <p className="font-bold text-gray-900 mb-1">Discover More</p>
                        <p className="text-xs text-gray-400 font-medium max-w-[150px]">Explore new companions to add to your bookmarks</p>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-[3rem] border border-gray-100 p-16 text-center shadow-sm">
                    <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Bookmark size={32} className="text-[#FF5B37]" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">No bookmarks found</h2>
                    <p className="text-gray-500 font-medium max-w-sm mx-auto mb-8">
                        {searchQuery ? `No results for "${searchQuery}". Try a different search term.` : "You haven't bookmarked any companions yet. Start exploring and save your favorites!"}
                    </p>
                    <button className="bg-[#FF5B37] text-white font-bold px-8 py-4 rounded-2xl hover:bg-[#e64d2b] transition-all shadow-lg shadow-orange-500/10">
                        Explore Companions
                    </button>
                </div>
            )}
        </main>
    );
};

export default BookmarksPage;
