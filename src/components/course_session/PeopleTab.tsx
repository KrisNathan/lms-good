import { useState } from 'react';
import PeopleCard from '../cards/PeopleCard';
import GroupCard from '../cards/GroupCard';
import TabSwitcher from '../TabSwitcher';

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
  { name: "Group Sigma", id: "GRP001", members: students.slice(0, 5).map(s => ({ ...s, profilePhoto: "/user-icon.png" })) },
  { name: "Group Beta", id: "GRP002", members: students.slice(5, 10).map(s => ({ ...s, profilePhoto: "/user-icon.png" })) },
  { name: "Group Charlie", id: "GRP003", members: students.slice(10, 15).map(s => ({ ...s, profilePhoto: "/user-icon.png" })) },
  { name: "Group Delta", id: "GRP004", members: students.slice(15, 20).map(s => ({ ...s, profilePhoto: "/user-icon.png" })) },
  { name: "Group Echo", id: "GRP005", members: students.slice(0, 5).map(s => ({ ...s, profilePhoto: "/user-icon.png" })) },
  { name: "Group Foxtrot", id: "GRP006", members: students.slice(5, 10).map(s => ({ ...s, profilePhoto: "/user-icon.png" })) },
  { name: "Group Golf", id: "GRP007", members: students.slice(10, 15).map(s => ({ ...s, profilePhoto: "/user-icon.png" })) },
  { name: "Group Hotel", id: "GRP008", members: students.slice(15, 20).map(s => ({ ...s, profilePhoto: "/user-icon.png" })) },
];


  const lecturers = [
    { name: "Dr. Danielson", nim: "LEC001" },
    { name: "Prof. Daniel", nim: "LEC002" }
  ];

  const tabs = [
    { label: 'Lecturers', count: lecturers.length },
    { label: 'Students', count: students.length },
    { label: 'Groups', count: groups.length },
  ];

  const renderCards = () => {
    if (activeTab === 'Groups') {
      return groups.map((group, index) => (
        <GroupCard key={index} name={group.name} id={group.id} members={group.members} />
      ));
    } else if (activeTab === 'Students') {
      return students.map((person, index) => (
        <PeopleCard key={index} name={person.name} nim={person.nim} />
      ));
    } else if (activeTab === 'Lecturers') {
      return lecturers.map((person, index) => (
        <PeopleCard key={index} name={person.name} nim={person.nim} />
      ));
    }
    return null;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">{activeTab}</h1>

      <TabSwitcher tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {renderCards()}
      </div>
    </div>
  );
}
