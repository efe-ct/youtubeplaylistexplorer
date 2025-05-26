import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  Calendar, 
  Clock, 
  ListVideo, 
  Eye, 
  PlayCircle 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  fetchPlaylistDetails, 
  fetchPlaylistVideos, 
  searchPlaylistVideos,
  Playlist, 
  Video 
} from '../services/youtube-api';
import VideoCard from '../components/videos/VideoCard';
import SearchBar from '../components/search/SearchBar';
import { format, parseISO } from 'date-fns';

const PlaylistPage: React.FC = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const { accessToken } = useAuth();
  
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  useEffect(() => {
    const loadPlaylistDetails = async () => {
      if (accessToken && playlistId) {
        try {
          setIsLoading(true);
          
          // Fetch playlist details
          const playlistDetails = await fetchPlaylistDetails(accessToken, playlistId);
          setPlaylist(playlistDetails);
          
          // Fetch videos in playlist
          const videosResponse = await fetchPlaylistVideos(accessToken, playlistId);
          setVideos(videosResponse.items);
          setNextPageToken(videosResponse.nextPageToken);
        } catch (error) {
          console.error('Failed to load playlist details', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    loadPlaylistDetails();
  }, [accessToken, playlistId]);
  
  const loadMoreVideos = async () => {
    if (accessToken && playlistId && nextPageToken) {
      try {
        const response = await fetchPlaylistVideos(accessToken, playlistId, nextPageToken);
        setVideos([...videos, ...response.items]);
        setNextPageToken(response.nextPageToken);
      } catch (error) {
        console.error('Failed to load more videos', error);
      }
    }
  };
  
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (accessToken && playlistId) {
      if (query.trim() === '') {
        // Reset to original list if search is cleared
        try {
          setIsSearching(false);
          const response = await fetchPlaylistVideos(accessToken, playlistId);
          setVideos(response.items);
          setNextPageToken(response.nextPageToken);
        } catch (error) {
          console.error('Failed to reset videos', error);
        }
      } else {
        // Perform search within playlist
        try {
          setIsSearching(true);
          const results = await searchPlaylistVideos(accessToken, playlistId, query);
          setVideos(results);
          setNextPageToken(undefined); // No pagination for search results
        } catch (error) {
          console.error('Failed to search playlist videos', error);
        }
      }
    }
  };
  
  // Skeleton loaders
  const PlaylistHeaderSkeleton = () => (
    <div className="animate-pulse mb-8">
      <div className="h-8 bg-secondary rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-secondary rounded w-1/2 mb-3"></div>
      <div className="flex flex-wrap gap-4">
        <div className="h-6 bg-secondary rounded w-24"></div>
        <div className="h-6 bg-secondary rounded w-24"></div>
        <div className="h-6 bg-secondary rounded w-24"></div>
      </div>
    </div>
  );
  
  const VideoSkeleton = () => (
    <div className="animate-pulse bg-card border border-border rounded-lg overflow-hidden flex flex-col sm:flex-row">
      <div className="aspect-video sm:w-68 bg-secondary"></div>
      <div className="p-4 flex-1">
        <div className="h-5 bg-secondary rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-secondary rounded w-1/2 mb-3"></div>
        <div className="h-4 bg-secondary rounded w-5/6 mb-2"></div>
        <div className="h-4 bg-secondary rounded w-4/6"></div>
        <div className="mt-4 flex gap-4">
          <div className="h-3 bg-secondary rounded w-16"></div>
          <div className="h-3 bg-secondary rounded w-16"></div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div>
      <Link 
        to="/" 
        className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft size={20} />
        <span>Back to playlists</span>
      </Link>
      
      {isLoading ? (
        <>
          <PlaylistHeaderSkeleton />
          <div className="mb-6">
            <div className="h-10 bg-secondary rounded w-full"></div>
          </div>
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <VideoSkeleton key={i} />
            ))}
          </div>
        </>
      ) : playlist ? (
        <>
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">{playlist.title}</h1>
            
            {playlist.description && (
              <p className="text-muted-foreground mb-4">
                {playlist.description}
              </p>
            )}
            
            <div className="flex flex-wrap gap-4 items-center text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                <span>Created {format(parseISO(playlist.publishedAt), 'MMMM d, yyyy')}</span>
              </div>
              
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>
                  {format(parseISO(playlist.publishedAt), 'h:mm a')}
                </span>
              </div>
              
              <div className="flex items-center">
                <ListVideo size={16} className="mr-1" />
                <span>
                  {playlist.itemCount} {playlist.itemCount === 1 ? 'video' : 'videos'}
                </span>
              </div>
              
              <div className="flex items-center capitalize">
                <Eye size={16} className="mr-1" />
                <span>{playlist.privacyStatus.toLowerCase()}</span>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search within this playlist..."
              initialQuery={searchQuery}
            />
          </div>
          
          {videos.length > 0 ? (
            <>
              <div className="space-y-6">
                {videos.map(video => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
              
              {!isSearching && nextPageToken && (
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={loadMoreVideos}
                    className="btn btn-secondary px-6 py-2"
                  >
                    Load More Videos
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <PlayCircle size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">
                {isSearching ? 'No videos match your search' : 'No videos in this playlist'}
              </h3>
              <p className="text-muted-foreground">
                {isSearching 
                  ? 'Try a different search term or clear the search' 
                  : 'Add videos to this playlist on YouTube'}
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">Playlist not found</h3>
          <p className="text-muted-foreground">
            The playlist you're looking for doesn't exist or you don't have access to it.
          </p>
          <Link to="/" className="mt-4 inline-block btn btn-primary px-4 py-2">
            Go Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default PlaylistPage;