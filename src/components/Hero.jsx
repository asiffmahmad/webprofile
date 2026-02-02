import React from 'react';
import { profileData } from '../data';
import './Hero.css';

const Hero = () => {
    return (
        <section id="hero" className="hero">
            <div className="container hero-container">
                <div className="hero-content reveal">
                    <div className="status-badge">
                        <span className="pulse"></span> Available for new projects
                    </div>
                    <h1 className="name">
                        <span className="text-gradient">{profileData.name}</span>
                    </h1>
                    <h2 className="role">
                        {profileData.role}
                    </h2>
                    <p className="tagline">
                        I design and develop high-performance backend systems and scalable full-stack applications.
                        Expertise in <strong>Java</strong>, <strong>Spring Boot</strong>, and <strong>React</strong>.
                    </p>
                    <div className="cta-group">
                        <a href="#contact" className="btn btn-primary">Let's Talk</a>
                        <a href="#projects" className="btn btn-secondary">See My Work</a>
                    </div>
                </div>

                <div className="hero-visual reveal">
                    <div className="terminal-window">
                        <div className="terminal-header">
                            <div className="terminal-buttons">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div className="terminal-title">asiff@dev: ~/portfolio</div>
                        </div>
                        <div className="terminal-content">
                            <div className="code-line">
                                <span className="line-number">1</span>
                                <span className="token-keyword">class</span> <span className="token-class">FullStackDeveloper</span> {'{'}
                            </div>
                            <div className="code-line">
                                <span className="line-number">2</span>
                                &nbsp;&nbsp;<span className="token-keyword">constructor</span>() {'{'}
                            </div>
                            <div className="code-line">
                                <span className="line-number">3</span>
                                &nbsp;&nbsp;&nbsp;&nbsp;this.<span className="token-property">name</span> = <span className="token-string">"{profileData.name}"</span>;
                            </div>
                            <div className="code-line">
                                <span className="line-number">4</span>
                                &nbsp;&nbsp;&nbsp;&nbsp;this.<span className="token-property">experience</span> = <span className="token-string">"4+ years"</span>;
                            </div>
                            <div className="code-line">
                                <span className="line-number">5</span>
                                &nbsp;&nbsp;&nbsp;&nbsp;this.<span className="token-property">stack</span> = [<span className="token-string">"Java"</span>, <span className="token-string">"Spring Boot"</span>, <span className="token-string">"React"</span>];
                            </div>
                            <div className="code-line">
                                <span className="line-number">6</span>
                                &nbsp;&nbsp;{'}'}
                            </div>
                            <div className="code-line">
                                <span className="line-number">7</span>
                                {'}'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
