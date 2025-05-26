import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const PrivacyPage: React.FC = () => {
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
        <h1>Privacy Policy</h1>
        
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2>1. Information We Collect</h2>
        <p>When you use YouTube Playlist Manager, we access only the following information through your Google account:</p>
        <ul>
          <li>Your basic profile information (name, email, profile picture)</li>
          <li>Your YouTube playlists and video information (read-only access)</li>
        </ul>
        
        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Display your playlists and videos within the application</li>
          <li>Enable search functionality across your content</li>
          <li>Provide a personalized experience</li>
        </ul>
        
        <h2>3. Data Storage</h2>
        <p>We do not store any of your YouTube data on our servers. All data is fetched directly from YouTube's API services when you use the application.</p>
        
        <h2>4. Third-Party Services</h2>
        <p>We use the following third-party services:</p>
        <ul>
          <li>YouTube Data API v3</li>
          <li>Google OAuth 2.0</li>
        </ul>
        
        <h2>5. Data Security</h2>
        <p>We implement security measures to protect your information:</p>
        <ul>
          <li>Secure HTTPS connections</li>
          <li>OAuth 2.0 authentication</li>
          <li>Read-only access to YouTube data</li>
        </ul>
        
        <h2>6. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal information</li>
          <li>Revoke access to your YouTube account</li>
          <li>Request deletion of your account</li>
        </ul>
        
        <h2>7. Children's Privacy</h2>
        <p>Our service is not intended for users under the age of 13. We do not knowingly collect information from children under 13.</p>
        
        <h2>8. Changes to This Policy</h2>
        <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
        
        <h2>9. Contact Us</h2>
        <p>If you have questions about this privacy policy, please contact us.</p>
      </div>
    </div>
  );
};

export default PrivacyPage;