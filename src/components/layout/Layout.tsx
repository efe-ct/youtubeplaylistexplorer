import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoginScreen from '../auth/LoginScreen';

interface LayoutProps {
  children: React.ReactNode;
}

// Define public routes as exact matches (not prefixes!)
const PUBLIC_ROUTES = ['/privacy', '/terms', '/'];

/**
 * Checks if a route is public.
 * Only exact matches are considered public.
 */
function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.includes(pathname);
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const publicRoute = isPublicRoute(location.pathname);

  // Debug logging to help trace auth and routing issues
  // Remove or comment out in production
  // console.log({
  //   pathname: location.pathname,
  //   isAuthenticated,
  //   isLoading,
  //   publicRoute,
  // });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-primary mb-4"></div>
          <div className="h-4 w-32 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  // Only require auth for non-public routes
  if (!isAuthenticated && !publicRoute) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="container-app">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;