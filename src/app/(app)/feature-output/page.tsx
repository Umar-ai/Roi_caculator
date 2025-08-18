'use client'
import React, { useEffect, useState } from 'react';

export default function ResultsPage() {
  const [htmlContent, setHtmlContent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use a useEffect hook to access window.location.search on the client side
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const html = urlParams.get('html');
        if (html) {
          setHtmlContent(decodeURIComponent(html));
        }
      }
    } catch (error) {
      console.error("Failed to parse URL parameters:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <div className="text-center p-8">
          <p className="text-xl">Loading results...</p>
        </div>
      </div>
    );
  }

  if (!htmlContent) {
    // If no HTML content is found, show a message.
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold">No Results Found</h1>
          <p className="mt-2 text-gray-400">Please go back to the form and submit it again.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex justify-center items-center min-h-screen  bg-white text-white">
      <div>
        {/* <h1 className="text-3xl font-bold text-center text-white">Your Results</h1> */}
        <div 
          className="p-4  rounded-lg overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: htmlContent }} 
        />
      </div>
    </div>
  );
}
