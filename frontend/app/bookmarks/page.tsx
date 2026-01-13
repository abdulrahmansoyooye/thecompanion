import React from 'react';

const Bookmarks: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-8 py-10">
            <h1 className="text-3xl font-bold mb-8">Bookmarks</h1>
            <div className="bg-gray-50 rounded-[2.5rem] p-10 text-center border border-dashed border-gray-300">
                <p className="text-gray-500 font-medium">You haven't bookmarked any lessons yet.</p>
            </div>
        </div>
    );
};

export default Bookmarks;
