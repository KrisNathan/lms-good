import { useState } from 'react';
import PeopleCard from '../cards/PeopleCard';

export default function PeopleTab() {
  const [activeTab, setActiveTab] = useState('Students');

  const students = [
    { name: "Andi", nim: "2812345678" },
    { name: "Afung", nim: "2823456789" },
    { name: "Asep", nim: "2834567890" },
    { name: "Budi", nim: "2845678901" },
    { name: "Aryan", nim: "2856789012" },
    { name: "Clara", nim: "2867890123" },
    { name: "Edward", nim: "2878901234" },
    { name: "Daniel", nim: "2889012345" },
    { name: "Kevin", nim: "2890123456" },
    { name: "Rachel", nim: "2801234567" },
    { name: "Tyler", nim: "2802345678" },
    { name: "Megan", nim: "2803456789" },
    { name: "Brandon", nim: "2804567890" },
    { name: "Samantha", nim: "2805678901" },
    { name: "Jason", nim: "2806789012" },
    { name: "Jackson", nim: "2807890123" },
    { name: "Chris", nim: "2808901234" },
    { name: "Amanda", nim: "2809012345" },
    { name: "Lewis", nim: "2810123456" },
    { name: "Stephanie", nim: "2811234567" }
  ];

  const groups = [
    { name: "Group Sigma", nim: "GRP001" },
    { name: "Group Beta", nim: "GRP002" }
  ];

  const lecturers = [
    { name: "Dr. Danielson", nim: "LEC001" },
    { name: "Prof. Daniel", nim: "LEC002" }
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case 'Students':
        return students;
      case 'Groups':
        return groups;
      case 'Lecturers':
        return lecturers;
      default:
        return students;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        {activeTab}
      </h1>
      <div className="flex justify-center mb-8">
        <div className="flex bg-white rounded-lg shadow-md p-1">
          {['Students', 'Groups', 'Lecturers'].map((tab) => {
            let count = 0;
            switch (tab) {
              case 'Students':
                count = students.length;
                break;
              case 'Groups':
                count = groups.length;
                break;
              case 'Lecturers':
                count = lecturers.length;
                break;
            }
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 flex flex-col items-center ${
                  activeTab === tab
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="text-lg font-bold">{count}</span>
                <span className="text-sm">{tab}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {getCurrentData().map((person, index) => (
          <PeopleCard 
            key={index}
            name={person.name}
            nim={person.nim}
          />
        ))}
      </div>
    </div>
  );
}