import PeopleCard from '../cards/PeopleCard';

export default function PeopleTab() {
  const people = [
    { name: "Alex Johnson", nim: "2812345678" },
    { name: "Sarah Chen", nim: "2823456789" },
    { name: "Michael Rodriguez", nim: "2834567890" },
    { name: "Emma Wilson", nim: "2845678901" },
    { name: "David Kim", nim: "2856789012" },
    { name: "Jessica Thompson", nim: "2867890123" },
    { name: "Ryan Martinez", nim: "2878901234" },
    { name: "Ashley Davis", nim: "2889012345" },
    { name: "Kevin Brown", nim: "2890123456" },
    { name: "Rachel Garcia", nim: "2801234567" },
    { name: "Tyler Anderson", nim: "2802345678" },
    { name: "Megan Taylor", nim: "2803456789" },
    { name: "Brandon Lee", nim: "2804567890" },
    { name: "Samantha White", nim: "2805678901" },
    { name: "Jason Miller", nim: "2806789012" },
    { name: "Nicole Jackson", nim: "2807890123" },
    { name: "Chris Moore", nim: "2808901234" },
    { name: "Amanda Clark", nim: "2809012345" },
    { name: "Daniel Lewis", nim: "2810123456" },
    { name: "Stephanie Walker", nim: "2811234567" }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Students
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {people.map((person) => (
          <PeopleCard 
            name={person.name}
            nim={person.nim}
          />
        ))}
      </div>
    </div>
  );
}