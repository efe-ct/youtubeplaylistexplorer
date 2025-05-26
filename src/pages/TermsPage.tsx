import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const TermsPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <Link 
        to="/" 
        className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft size={20} />
        <span>Back to home</span>
      </Link>

      <div className="prose prose-sm dark:prose-invert">
        <h1>Terms of Service</h1>
        
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2>1. Terms</h2>
        <p>By accessing YouTube Playlist Manager, you agree to be bound by these terms of service and agree that you are responsible for compliance with any applicable local laws.</p>
        
        <h2>2. Use License</h2>
        <p>Permission is granted to temporarily access YouTube Playlist Manager for personal, non-commercial use only.</p>
        
        <h2>3. YouTube API Services</h2>
        <p>This application uses YouTube API Services and requires you to agree to the following:</p>
        <ul>
          <li>YouTube Terms of Service: <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer">https://www.youtube.com/t/terms</a></li>
          <li>Google Privacy Policy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a></li>
        </ul>
        
        <h2>4. Disclaimer</h2>
        <p>The materials on YouTube Playlist Manager are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
        
        <h2>5. Limitations</h2>
        <p>In no event shall YouTube Playlist Manager or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use YouTube Playlist Manager.</p>
        
        <h2>6. Data Usage</h2>
        <p>We only request and use read-only access to your YouTube data to display your playlists and videos. We do not store any of your YouTube data on our servers.</p>
        
        <h2>7. Revisions and Errata</h2>
        <p>The materials appearing on YouTube Playlist Manager could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete, or current.</p>
        
        <h2>8. Links</h2>
        <p>We have not reviewed all of the sites linked to YouTube Playlist Manager and are not responsible for the contents of any such linked site.</p>
        
        <h2>9. Modifications</h2>
        <p>We may revise these terms of service at any time without notice. By using YouTube Playlist Manager, you agree to be bound by the current version of these terms of service.</p>
      </div>
    </div>
  );
};

export default TermsPage;