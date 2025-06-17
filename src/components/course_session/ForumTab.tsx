import { useRef, useEffect, useState } from "react";
import ForumPostCard from "../cards/ForumPostCard";
import ForumDialog from "../dialogs/ForumDialog";

interface Session {
  id: number;
  title: string;
  Posts: number;
  unreadPosts: number;
  isActive?: boolean;
}

interface ForumPost {
  id: number;
  courseCode: string;
  professorName: string;
  professorTitle: string;
  postTitle: string;
  postContent: string;
  postDate: string;
  replyCount: number;
  authorStatus: string;
}

const generateSessions = (): Session[] => {
  const sessions: Session[] = [];
  
  for (let i = 1; i <= 24; i++) {
    const Posts = Math.floor(Math.random() * 15); 
    const unreadPosts = Posts > 0 ? Math.floor(Math.random() * Math.min(Posts, 5)) : 0;
    
    sessions.push({
      id: i,
      title: `Session ${i}`,
      Posts,
      unreadPosts,
      isActive: i === 1 
    });
  }
  
  return sessions;
};

const defaultSessions: Session[] = generateSessions();

// Sample forum posts data
const sampleForumPosts: ForumPost[] = [
  {
    id: 1,
    courseCode: "D1234",
    professorName: "Amogusussi Cappuccino",
    professorTitle: "Ph.D.",
    postTitle: "Introduction to Computer Science",
    postContent: "how are you guys doing on comsputer science are you guys okay",
    postDate: "3 May 2025",
    replyCount: 3,
    authorStatus: "Lecturer"
  },
  {
    id: 2,
    courseCode: "D1235",
    professorName: "John Doe",
    professorTitle: "M.Sc.",
    postTitle: "Assignment 1 Discussion",
    postContent: "Let's discuss the first assignment requirements and any questions you might have.",
    postDate: "5 May 2025",
    replyCount: 7,
    authorStatus: "Teaching Assistant"
  },
  {
    id: 3,
    courseCode: "D1236",
    professorName: "Jane Smith",
    professorTitle: "M.E.",
    postTitle: "Midterm Preparation",
    postContent: "Here are some tips for preparing for the upcoming midterm examination.",
    postDate: "8 May 2025",
    replyCount: 12,
    authorStatus: "Professor"
  }
];

function SessionHorizontalTab({ sessions, onSessionClick }: {
  sessions: Session[];
  onSessionClick: (sessionId: number) => void;
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);

  const updateScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const hasOverflow = container.scrollWidth > container.clientWidth;
      setIsScrollable(hasOverflow);
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleWheel = (e: WheelEvent) => {
      if (scrollContainer) {
        e.preventDefault();
        scrollContainer.scrollLeft += e.deltaY;
        updateScrollButtons();
      }
    };

    const handleScroll = () => {
      updateScrollButtons();
    };

    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
      scrollContainer.addEventListener("scroll", handleScroll);
      updateScrollButtons();
      
      const resizeObserver = new ResizeObserver(updateScrollButtons);
      resizeObserver.observe(scrollContainer);
      
      return () => {
        scrollContainer.removeEventListener("wheel", handleWheel);
        scrollContainer.removeEventListener("scroll", handleScroll);
        resizeObserver.disconnect();
      };
    }
  }, []);

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full relative">
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-white border border-gray-300 rounded-full p-1 shadow-md hover:bg-gray-50 group"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <div className="absolute top-full left-0 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-30">
            Scroll left (or use mouse wheel)
          </div>
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-white border border-gray-300 rounded-full p-1 shadow-md hover:bg-gray-50 group"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <div className="absolute top-full right-0 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-30">
            Scroll right (or use mouse wheel)
          </div>
        </button>
      )}

      {isScrollable && canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10 rounded-l-2xl"></div>
      )}
      
      {isScrollable && canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 rounded-r-2xl"></div>
      )}

      <div
        ref={scrollContainerRef}
        className="flex flex-row rounded-2xl border border-slate-200 overflow-x-auto scrollbar-thin relative"
        style={{
          scrollbarWidth: "none",
          scrollbarColor: "#cbd5e1 #f1f5f9",
        }}
      >
        {sessions.map((session) => {
          return (
            <button
              key={session.id}
              onClick={() => onSessionClick(session.id)}
              className={`p-3 whitespace-nowrap flex-shrink-0 relative min-w-[140px] transition-colors cursor-pointer ${
                session.isActive 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white hover:bg-gray-100 text-gray-900'
              }`}
            >
              {session.unreadPosts > 0 && (
                <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
                  session.isActive ? 'bg-orange-300' : 'bg-orange-400'
                }`}></div>
              )}
              
              <div className="flex flex-col items-start space-y-1">
                <div className={`text-xs font-semibold ${
                  session.isActive ? 'text-blue-100' : 'text-gray-600'
                }`}>
                  {session.Posts > 0 ? `${session.Posts} Posts` : 'No Posts'}
                </div>
                
                <div className="h-4">
                  {session.unreadPosts > 0 ? (
                    <div className={`text-xs font-semibold ${
                      session.isActive ? 'text-orange-200' : 'text-orange-500'
                    }`}>
                      {session.unreadPosts} Unread Posts
                    </div>
                  ) : (
                    <div className="text-xs">&nbsp;</div>
                  )}
                </div>
                
                <div className={`font-semibold text-sm ${
                  session.isActive ? 'text-white' : 'text-gray-900'
                }`}>
                  {session.title}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface Props {
  activeSessions?: Session[];
}

export default function ForumTab({ activeSessions = defaultSessions }: Props) {
  const [sessions, setSessions] = useState<Session[]>(activeSessions);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(sampleForumPosts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);

  const handleSessionClick = (sessionId: number) => {
    setSessions(prevSessions => 
      prevSessions.map(session => ({
        ...session,
        isActive: session.id === sessionId
      }))
    );
  };

  const handlePostCardClick = (post: ForumPost) => {
    setSelectedPost(post);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedPost(null);
  };

  const handlePostDeleted = () => {
    if (selectedPost) {
      setForumPosts(prevPosts => prevPosts.filter(post => post.id !== selectedPost.id));
      setSessions(prevSessions => 
        prevSessions.map(session => {
          if (session.isActive) {
            return {
              ...session,
              Posts: Math.max(0, session.Posts - 1),
              unreadPosts: Math.max(0, session.unreadPosts - 1)
            };
          }
          return session;
        })
      );
    }
    handleCloseDialog();
  };

  return (
    <div className="w-full">
      <div className="mb-5">
        <SessionHorizontalTab sessions={sessions} onSessionClick={handleSessionClick} />
      </div>
      
      {forumPosts.length > 0 ? (
        <div className="space-y-4">
          {forumPosts.map((post) => (
            <ForumPostCard
              key={post.id}
              courseCode={post.courseCode}
              professorName={post.professorName}
              professorTitle={post.professorTitle}
              postTitle={post.postTitle}
              postDate={post.postDate}
              replyCount={post.replyCount}
              onClick={() => handlePostCardClick(post)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No posts available</p>
          <p className="text-sm">Posts will appear here when they are created.</p>
        </div>
      )}
      
      {selectedPost && (
        <ForumDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          onPostDeleted={handlePostDeleted}
          title={selectedPost.postTitle}
          content={selectedPost.postContent}
          authorName={selectedPost.professorName}
          authorDate={selectedPost.postDate}
          authorStatus={selectedPost.authorStatus}
        />
      )}
    </div>
  );
}