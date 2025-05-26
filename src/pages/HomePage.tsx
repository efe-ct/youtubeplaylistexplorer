import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchPlaylists, Playlist } from '../services/youtube-api';
import PlaylistCard from '../components/playlists/PlaylistCard';
import { PlayCircle } from 'lucide-react';

const HomePage: React.FC = () => {
  const { accessToken, user } = useAuth();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(undefined);
  
  useEffect(() => {
    const loadPlaylists = async () => {
      if (accessToken) {
        try {
          setIsLoading(true);
          const response = await fetchPlaylists(accessToken);
          setPlaylists(response.items);
          setNextPageToken(response.nextPageToken);
        } catch (error) {
          console.error('Failed to load playlists', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    loadPlaylists();
  }, [accessToken]);
  
  const loadMorePlaylists = async () => {
    if (accessToken && nextPageToken) {
      try {
        const response = await fetchPlaylists(accessToken, nextPageToken);
        setPlaylists([...playlists, ...response.items]);
        setNextPageToken(response.nextPageToken);
      } catch (error) {
        console.error('Failed to load more playlists', error);
      }
    }
  };
  
  // Generate skeleton loaders for loading state
  const PlaylistSkeleton = () => (
    <div className="animate-pulse bg-card border border-border rounded-lg overflow-hidden">
      <div className="aspect-video bg-secondary"></div>
      <div className="p-4">
        <div className="h-4 bg-secondary rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-secondary rounded w-1/2"></div>
        <div className="mt-3 flex items-center">
          <div className="h-3 bg-secondary rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">
          {user ? `${user.name}'s Playlists` : 'Your Playlists'}
        </h1>
        <p className="text-muted-foreground">
          View and manage all your YouTube playlists in one place
        </p>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <PlaylistSkeleton key={i} />
          ))}
        </div>
      ) : playlists.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
          
          {nextPageToken && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={loadMorePlaylists}
                className="btn btn-secondary px-6 py-2"
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <PlayCircle size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No playlists found</h3>
          <p className="text-muted-foreground">
            You don't have any playlists on your YouTube account yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;