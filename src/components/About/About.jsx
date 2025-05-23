// src/components/About/About.jsx
import React, { useState, useEffect } from 'react';


const About = () => {
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPageBySlug('about');
        setPageContent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!pageContent) return <div className="error">Page not found</div>;

  return (
    <div className="about-page">
      <h1 dangerouslySetInnerHTML={{ __html: pageContent.title.rendered }} />
      <div dangerouslySetInnerHTML={{ __html: pageContent.content.rendered }} />
      
      {/* Optional: Add team members or other dynamic content */}
      {pageContent._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
        <img 
          src={pageContent._embedded['wp:featuredmedia'][0].source_url} 
          alt={pageContent._embedded['wp:featuredmedia'][0].alt_text || 'About Us'}
          className="about-image"
        />
      )}
    </div>
  );
};

export default About;