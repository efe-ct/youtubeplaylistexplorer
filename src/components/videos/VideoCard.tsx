import React from 'react';
import { ExternalLink, Clock, ThumbsUp, MessageSquare } from 'lucide-react';
import { Video } from '../../services/youtube-api';
import { format, parseISO } from 'date-fns';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  // Format view count with commas
  const formatCount = (count: string) => {
    return parseInt(count).toLocaleString();
  };
  
  // Format duration from ISO 8601 format
  const formatDuration = (duration: string) => {
    // Simple formatting for common durations
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return duration;
    
    const [_, hours, minutes, seconds] = match;
    
    if (hours) {
      return `${hours}:${minutes?.padStart(2, '0') || '00'}:${seconds?.padStart(2, '0') || '00'}`;
    } else if (minutes) {
      return `${minutes}:${seconds?.padStart(2, '0') || '00'}`;
    } else {
      return `0:${seconds?.padStart(2, '0') || '00'}`;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden flex flex-col sm:flex-row shadow-card hover:shadow-card-hover transition-all">
      <div className="relative aspect-video sm:w-68">
        {video.thumbnail ? (
          <img 
            src={video.thumbnail} 
            alt={video.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary">
            <ExternalLink size={48} className="text-muted-foreground opacity-50" />
          </div>
        )}
        <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm text-foreground text-xs px-2 py-1 rounded">
          {formatDuration(video.duration)}
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div>
          <h3 className="font-medium text-foreground line-clamp-2">{video.title}</h3>
          
          <div className="mt-1 text-sm text-muted-foreground">
            {video.channelTitle}
          </div>
          
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {video.description}
          </p>
        </div>
        
        <div className="mt-auto pt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{format(parseISO(video.publishedAt), 'MMM d, yyyy')}</span>
          </div>
          
          <div className="flex items-center">
            <ThumbsUp size={14} className="mr-1" />
            <span>{formatCount(video.likeCount)}</span>
          </div>
          
          <div className="flex items-center">
            <MessageSquare size={14} className="mr-1" />
            <span>{formatCount(video.commentCount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;