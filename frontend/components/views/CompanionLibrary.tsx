
import React, { useState } from 'react';
import { INITIAL_COMPANIONS } from '../constants';
import CompanionCard from '../components/CompanionCard';

const CompanionLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');

  const filteredCompanions = INITIAL_COMPANIONS.filter(comp => {
    const matchesSearch = comp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         comp.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || comp.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const subjects = ['All', 'Science', 'Maths', 'Language', 'Coding', 'History', 'Business', 'Economics', 'Geography', 'Finance'];

  return (
    <div className="max-w-7xl mx-auto px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <h1 className="text-3xl font-bold">Companion Library</h1>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <input 
              type="text" 
              placeholder="Search your companions..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5B37]/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg className="absolute left-3 top-2.5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          
          <select 
            className="w-full sm:w-48 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5B37]/20"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            {subjects.map(s => <option key={s} value={s}>{s === 'All' ? 'Select subject' : s}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCompanions.map((comp) => (
          <CompanionCard key={comp.id} companion={comp} />
        ))}
      </div>
      
      {filteredCompanions.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-[2.5rem] border border-dashed border-gray-300">
          <p className="text-gray-500 font-medium">No companions found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default CompanionLibrary;
