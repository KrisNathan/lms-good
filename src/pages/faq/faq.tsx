import FAQCard from '../../components/cards/FaqCard';

const faqData = [
  {
    title: "How to attend class?",
    details: "You can access attendance through homepage or coursepage"
  },
  {
    title: "What does All, CL, LAB, LEC mean in course list page?",
    details: "It is filters for types of classes. All = display all, CL = classes, LAB = lab classes, LEC = lecture classes"
  },
  {
    title: "Where do I view course details?",
    details: "You can head to the course list page and then press on the class you need to view more of. In there will be details of that specific class such as sessions, forum, etc"
  }
];
const handleBackClick = () => {
  window.location.href = '/home';
};
export default function FAQ() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <button
          onClick={handleBackClick}
          className="mb-4 ml-20 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
          Back to Home
        </button>
      <h2 className="text-2xl font-bold text-center mb-8 text-black">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <FAQCard
            key={index}
            title={faq.title}
            details={faq.details}
          />
        ))}
      </div>
    </div>
  );
}