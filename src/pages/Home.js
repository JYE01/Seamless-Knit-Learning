import React from 'react';
import { Link } from "react-router-dom";
import './Home.css';

const Home = () => {

  return (
    <div className="landing-page">
      {/* Introduction Section */}
      <section className="intro-section">
        <h1>Landing template for startups</h1>
        <p>
          Our landing page template works on all devices, so you only have to set it up once,
          and get beautiful results forever.
        </p>
        <div className="cta-buttons">
          <button className="btn-primary">Start free trial</button>
          <button className="btn-secondary">Learn more</button>
        </div>
      </section>

      {/* Video Section */}
      <section className="video-section">
        <h2>Introduction to Knitting</h2>
        <p>Learn the basics of knitting with this comprehensive video guide.</p>
        <div className="youtube-video">
          <iframe 
            src="https://www.youtube.com/embed/cCQK6odf9b0?list=PL2xysx6ZqtD-7jZz3R_DpH_yhyKJwIwVV" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </div>
  );
}

export default Home;
