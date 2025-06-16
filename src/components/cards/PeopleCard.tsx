export default function PeopleCard({ 
  profilePhoto = "/user-icon.png", 
  name = "Dummy Name", 
  nim = "28xxxxxxxx", 
  field = "Computer Science" 
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-8 w-auto text-center">
      <img 
        src={profilePhoto} 
        alt="Profile Photo" 
        className="w-30 h-30 rounded-full object-cover mx-auto mb-5 block"
      />
      <h2 className="text-lg font-bold text-gray-800 mb-2">
        {name}
      </h2>
      <p className="text-base text-gray-600 mb-2">
        {nim}
      </p>
      <p className="text-sm text-gray-500 m-0">
        {field}
      </p>
    </div>
  );
}