import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, Clock, Eye } from 'lucide-react';
import { Playlist } from '../../services/youtube-api';
import { format, parseISO } from 'date-fns';

interface PlaylistCardProps {
  playlist: Playlist;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
  return (
    <Link 
      to={`/playlist/${playlist.id}`}
      className="block bg-card hover:bg-card/95 transition-all rounded-lg overflow-hidden shadow-card hover:shadow-card-hover border border-border hover:border-primary/50"
    >
      <div className="relative aspect-video bg-secondary overflow-hidden">
        {playlist.thumbnail ? (
          <img 
            src={playlist.thumbnail} 
            alt={playlist.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary">
            <PlayCircle size={48} className="text-muted-foreground opacity-50" />
          </div>
        )}
        <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm text-foreground text-xs px-2 py-1 rounded">
          {playlist.itemCount} {playlist.itemCount === 1 ? 'video' : 'videos'}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-foreground line-clamp-1">{playlist.title}</h3>
        
        {playlist.description && (
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {playlist.description}
          </p>
        )}
        
        <div className="mt-3 flex items-center text-xs text-muted-foreground">
          <Clock size={14} className="mr-1" />
          <span>
            Created {format(parseISO(playlist.publishedAt), 'MMM d, yyyy')}
          </span>
          
          <span className="mx-2">•</span>
          
          <span className="capitalize">
            {playlist.privacyStatus.toLowerCase()}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PlaylistCard;