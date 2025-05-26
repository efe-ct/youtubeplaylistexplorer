import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, Clock, Eye, ExternalLink } from 'lucide-react';
import { Playlist } from '../../services/youtube-api';
import { format, parseISO } from 'date-fns';

interface PlaylistCardProps {
  playlist: Playlist;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
  return (
    <div className="group bg-card hover:bg-card/95 transition-all rounded-lg overflow-hidden shadow-card hover:shadow-card-hover border border-border hover:border-primary/50">
      <Link 
        to={`/playlist/${playlist.id}`}
        className="block relative aspect-video bg-secondary overflow-hidden"
      >
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
      </Link>
      
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/playlist/${playlist.id}`}>
            <h3 className="font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {playlist.title}
            </h3>
          </Link>
          <a
            href={`https://www.youtube.com/playlist?list=${playlist.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="Open in YouTube"
          >
            <ExternalLink size={16} />
          </a>
        </div>
        
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
    </div>
  );
};

export default PlaylistCard;