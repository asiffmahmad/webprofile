import React from 'react';
import { profileData } from '../data';
import './About.css';

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="container">
                <h2 className="section-title">About Me</h2>
                <div className="about-content reveal">
                    <div className="about-text">
                        <p className="lead">{profileData.about}</p>
                        <p>{profileData.collaboration}</p>
                        <div className="goals-box">
                            <h3>Future Milestone</h3>
                            <p>{profileData.goals}</p>
                        </div>
                    </div>
                    <div className="stats-grid">
                        <div className="stat-card reveal reveal-delay-1">
                            <span className="stat-number">4+</span>
                            <span className="stat-label">Years of Dev Ops / Backend</span>
                        </div>
                        <div className="stat-card reveal reveal-delay-2">
                            <span className="stat-number">15+</span>
                            <span className="stat-label">Repositories Managed</span>
                        </div>
                        <div className="stat-card reveal reveal-delay-3">
                            <span className="stat-number">100%</span>
                            <span className="stat-label">Uptime Architecture</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
