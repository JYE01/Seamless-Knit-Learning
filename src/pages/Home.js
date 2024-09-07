import React from 'react';
import { Link } from "react-router-dom";
import './Home.css';

const Home = () => {

  return (
    <div className="landing-page">
      {/* Introduction Section */}
      <section className="intro-section">
        <h1>Welcome to the world of knitting</h1>
        <p>This is the learning platform for UTS student and alumni.</p>
        <p>  
           From this platform you are expected to dive into the world of knitting.
        </p>
        <div className="cta-buttons">
          <Link to="/Login">
            <button className="btn-primary">Get Started</button>
          </Link>
        </div>
      </section>

      {/* Video Section */}
      <section className="video-section">
        <h2>Introduction to Knitting</h2>
        <p>Learn the basics of knitting with this comprehensive video guide.</p>
        <div className="youtube-video">
          <iframe 
            src="https://www.youtube.com/embed/BI7O6W_DGd0"
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
