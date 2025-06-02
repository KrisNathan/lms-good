const handleBackClick = () => {
  window.location.href = '/course/course123';
};
export default function ForumPage() {
  return <>
    <button
      onClick={handleBackClick}
      className="mb-4  flex items-center text-gray-600 hover:text-gray-900 transition-colors"
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
      Back to Course
    </button>
    Coming Soon.
  </>
}