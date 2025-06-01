import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Play } from 'lucide-react';

interface Position {
  x: number;
  y: number;
}

interface ContextMenuProps {
  position: Position;
  onClose: () => void;
  videoId: string;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ position, onClose, videoId }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleOpenInNewTab = () => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleOpenEmbed = () => {
    const embedContainer = document.createElement('div');
    embedContainer.style.position = 'fixed';
    embedContainer.style.top = '50%';
    embedContainer.style.left = '50%';
    embedContainer.style.transform = 'translate(-50%, -50%)';
    embedContainer.style.zIndex = '1000';
    embedContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    embedContainer.style.padding = '20px';
    embedContainer.style.borderRadius = '8px';

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.width = '800';
    iframe.height = '450';
    iframe.style.border = 'none';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;

    const closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.style.position = 'absolute';
    closeButton.style.right = '10px';
    closeButton.style.top = '10px';
    closeButton.style.backgroundColor = 'transparent';
    closeButton.style.border = 'none';
    closeButton.style.color = 'white';
    closeButton.style.fontSize = '24px';
    closeButton.style.cursor = 'pointer';
    closeButton.onclick = () => {
      document.body.removeChild(embedContainer);
    };

    embedContainer.appendChild(closeButton);
    embedContainer.appendChild(iframe);
    document.body.appendChild(embedContainer);
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className="absolute bg-card border border-border rounded-lg shadow-lg py-1 z-50"
      style={{ top: position.y, left: position.x }}
    >
      <button
        onClick={handleOpenEmbed}
        className="w-full px-4 py-2 text-sm text-left hover:bg-secondary flex items-center gap-2"
      >
        <Play size={16} />
        Open in Embed
      </button>
      <button
        onClick={handleOpenInNewTab}
        className="w-full px-4 py-2 text-sm text-left hover:bg-secondary flex items-center gap-2"
      >
        <ExternalLink size={16} />
        Open in New Tab
      </button>
    </div>
  );
};

export default ContextMenu;