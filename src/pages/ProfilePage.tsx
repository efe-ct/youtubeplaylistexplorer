import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, PlayCircle, Calendar, Mail, User, Clock, ListVideo, Film } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { fetchUserStats, UserStats } from '../services/youtube-api';
import { format, parseISO } from 'date-fns';

const ProfilePage: React.FC = () => {
  const { user, logout, accessToken } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      if (accessToken) {
        try {
          const userStats = await fetchUserStats(accessToken);
          setStats(userStats);
        } catch (error) {
          console.error('Failed to load user stats:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadStats();
  }, [accessToken]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <Link 
        to="/" 
        className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft size={20} />
        <span>Back to playlists</span>
      </Link>

      <div className="max-w-2xl mx-auto">
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-6">
              <img 
                src={user.picture} 
                alt={user.name} 
                className="w-24 h-24 rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>User ID: {user.id}</span>
                  </div>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="mt-8 space-y-4">
                <div className="h-8 bg-secondary rounded animate-pulse"></div>
                <div className="h-8 bg-secondary rounded animate-pulse"></div>
                <div className="h-8 bg-secondary rounded animate-pulse"></div>
              </div>
            ) : stats && (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-sm font-medium mb-1">
                    <ListVideo size={16} />
                    <span>Total Playlists</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {stats.totalPlaylists}
                  </div>
                </div>

                <div className="bg-secondary/50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-sm font-medium mb-1">
                    <Film size={16} />
                    <span>Total Videos</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {stats.totalVideos}
                  </div>
                </div>

                <div className="bg-secondary/50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-sm font-medium mb-1">
                    <Calendar size={16} />
                    <span>Account Created</span>
                  </div>
                  <div className="text-sm">
                    {format(parseISO(stats.createdAt), 'MMMM d, yyyy')}
                  </div>
                </div>

                <div className="bg-secondary/50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-sm font-medium mb-1">
                    <Clock size={16} />
                    <span>Last Activity</span>
                  </div>
                  <div className="text-sm">
                    {format(parseISO(stats.lastActivity), 'MMM d, yyyy h:mm a')}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8">
              <button
                onClick={logout}
                className="btn btn-secondary px-4 py-2"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;