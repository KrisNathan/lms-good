import ForumPostCard from "../cards/ForumPostCard";

interface Session {
  id: number;
  title: string;
  Posts: number;
  unreadPosts?: number;
  isActive?: boolean;
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

interface Props {
  activeSessions?: Session[];
}

function SessionHorizontalTab({ sessions }: {
  sessions: Session[];
}) {
  return (
    <div className="w-full overflow-hidden">
      <div
        className="flex flex-row rounded-2xl border border-slate-200 overflow-x-auto max-w-full scrollbar-thin scroll-smooth"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#cbd5e1 #f1f5f9'
        }}
        onWheel={(e) => {
          e.preventDefault();
          e.currentTarget.scrollLeft += e.deltaY;
        }}
      >
        {sessions.map((session) => {
          return (
            <div
              key={session.id}
              className="p-3 whitespace-nowrap flex-shrink-0 relative min-w-[140px] bg-slate-50"
            >
              {session.unreadPosts > 0 && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full"></div>
              )}
              
              <div className="flex flex-col items-start space-y-1">
                <div className="text-xs text-gray-600">
                  {session.Posts > 0 ? `${session.Posts} Posts` : 'No Posts'}
                </div>
                
                <div className="h-4">
                  {session.unreadPosts > 0 ? (
                    <div className="text-xs text-orange-500">
                      {session.unreadPosts} Unread Posts
                    </div>
                  ) : (
                    <div className="text-xs">&nbsp;</div>
                  )}
                </div>
                
                <div className="font-semibold text-sm text-gray-900">
                  {session.title}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ForumTab({ activeSessions = defaultSessions }: Props) {
  return (
    <div className="w-full">
      <div className=" mb-5">
        <SessionHorizontalTab sessions={activeSessions} />
      </div>
        <ForumPostCard
          courseCode="D1234"
          professorName="Prof. Amogusussi Cappuccino"
          professorTitle="Ph.D."
          postTitle="Interacting or whatever"
          postDate="3 May 2025"
          replyCount={3}
        />
    </div>
  );
}