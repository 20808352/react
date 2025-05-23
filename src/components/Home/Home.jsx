// src/components/Home/Home.jsx
import React, { useState, useEffect } from 'react';
import { isWordPressAPIAvailable, defaultHomeDesign } from '../../services/wordpressApi';

const Home = () => {
  const [apiAvailable, setApiAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [wordPressData, setWordPressData] = useState(null);

  useEffect(() => {
    const checkAPI = async () => {
      const available = await isWordPressAPIAvailable();
      setApiAvailable(available);
      setIsLoading(false);
      
      if (available) {
        // If API is available, fetch WordPress content
        try {
          const response = await fetch(`${API_BASE_URL}/wp/v2/pages?slug=home`);
          const data = await response.json();
          setWordPressData(data[0]);
        } catch (error) {
          console.error("Failed to fetch WordPress content:", error);
          setApiAvailable(false);
        }
      }
    };

    checkAPI();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  // Show default design if API is not available
  if (!apiAvailable) {
    return (
      <div className="home-page">
        <h1>{defaultHomeDesign.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: defaultHomeDesign.content }} />
        
        <section className="features">
          <h2>Key Features</h2>
          <ul>
            {defaultHomeDesign.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </section>
      </div>
    );
  }

  // Show WordPress content if API is available
  return (
    <div className="home-page">
      {wordPressData && (
        <>
          <h1 dangerouslySetInnerHTML={{ __html: wordPressData.title.rendered }} />
          <div dangerouslySetInnerHTML={{ __html: wordPressData.content.rendered }} />
        </>
      )}
    </div>
  );
};

export default Home;