import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, PlayCircle, Folder, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { searchContent, SearchResult } from '../services/youtube-api';
import SearchBar from '../components/search/SearchBar';

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const { accessToken } = useAuth();
  
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  useEffect(() => {
    // Extract search query from URL
    const searchParams = new URLSearchParams(location.search);
    const q = searchParams.get('q');
    
    if (q) {
      setQuery(q);
      performSearch(q);
    }
  }, [location.search, accessToken]);
  
  const performSearch = async (searchQuery: string) => {
    if (accessToken && searchQuery.trim()) {
      try {
        setIsLoading(true);
        const searchResults = await searchContent(accessToken, searchQuery);
        setResults(searchResults);
        setHasSearched(true);
      } catch (error) {
        console.error('Search failed', error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const handleSearch = (newQuery: string) => {
    if (newQuery.trim()) {
      // Update URL with new search query
      const searchParams = new URLSearchParams();
      searchParams.set('q', newQuery);
      window.history.pushState(
        null, 
        '', 
        `${window.location.pathname}?${searchParams.toString()}`
      );
      
      setQuery(newQuery);
      performSearch(newQuery);
    }
  };
  
  // Generate skeleton loaders for loading state
  const ResultSkeleton = () => (
    <div className="animate-pulse bg-card border border-border rounded-lg overflow-hidden flex p-4">
      <div className="mr-4 h-16 w-16 bg-secondary rounded"></div>
      <div className="flex-1">
        <div className="h-5 bg-secondary rounded w-2/3 mb-2"></div>
        <div className="h-4 bg-secondary rounded w-full mb-1"></div>
        <div className="h-4 bg-secondary rounded w-1/2"></div>
      </div>
    </div>
  );
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Search</h1>
        <SearchBar 
          onSearch={handleSearch}
          placeholder="Search your playlists and videos..."
          initialQuery={query}
        />
      </div>
      
      {isLoading ? (
        <div className="space-y-4">
          <div className="h-6 bg-secondary rounded w-40 mb-4"></div>
          {[...Array(5)].map((_, i) => (
            <ResultSkeleton key={i} />
          ))}
        </div>
      ) : hasSearched ? (
        results.length > 0 ? (
          <div>
            <h2 className="text-lg font-medium mb-4">
              Search results for "{query}"
            </h2>
            
            <div className="space-y-4">
              {results.map(result => (
                <div 
                  key={result.id}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors"
                >
                  {result.type === 'playlist' ? (
                    <Link to={`/playlist/${result.id}`} className="flex p-4">
                      <div className="mr-4 flex-shrink-0 w-16 h-16 bg-secondary rounded overflow-hidden flex items-center justify-center">
                        {result.thumbnail ? (
                          <img 
                            src={result.thumbnail} 
                            alt={result.title} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Folder size={24} className="text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">
                          {result.title}
                        </h3>
                        <div className="flex items-center text-sm text-accent">
                          <Folder size={16} className="mr-1" />
                          <span>Playlist</span>
                        </div>
                        {result.description && (
                          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                            {result.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  ) : (
                    <a 
                      href={`https://www.youtube.com/watch?v=${result.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex p-4"
                    >
                      <div className="mr-4 flex-shrink-0 w-16 h-16 bg-secondary rounded overflow-hidden flex items-center justify-center">
                        {result.thumbnail ? (
                          <img 
                            src={result.thumbnail} 
                            alt={result.title} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <PlayCircle size={24} className="text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">
                          {result.title}
                        </h3>
                        <div className="flex items-center text-sm text-accent">
                          <PlayCircle size={16} className="mr-1" />
                          <span>Video</span>
                        </div>
                        {result.description && (
                          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                            {result.description}
                          </p>
                        )}
                      </div>
                      <div className="ml-auto flex items-start">
                        <ExternalLink size={16} className="text-muted-foreground" />
                      </div>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Search size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No results found</h3>
            <p className="text-muted-foreground">
              No playlists or videos match your search
            </p>
            <button
              onClick={() => handleSearch('')}
              className="mt-4 btn btn-secondary px-4 py-2"
            >
              Clear Search
            </button>
          </div>
        )
      ) : (
        <div className="text-center py-12">
          <Search size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Search your content</h3>
          <p className="text-muted-foreground">
            Enter a search term to find playlists and videos in your library
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;