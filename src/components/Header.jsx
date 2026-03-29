import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [visitCount, setVisitCount] = useState(null);
    const hasFetched = React.useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            
            const hasVisited = sessionStorage.getItem("hasVisited");
            const url = hasVisited 
                ? `https://api.counterapi.dev/v1/asiffwebprofile/visits/` 
                : `https://api.counterapi.dev/v1/asiffwebprofile/visits/up`;

            fetch(url)
                .then(res => res.json())
                .then(data => {
                    setVisitCount(data.count);
                    
                    if (!hasVisited) {
                        sessionStorage.setItem("hasVisited", "true");
                        
                        // New visitor: Log details to root JSON via backend
                        fetch('https://ipwho.is/')
                            .then(res => res.json())
                            .then(ipData => {
                                const visitorData = {
                                    visit_count: data.count,
                                    ip: ipData.ip,
                                    city: ipData.city,
                                    region: ipData.region,
                                    country: ipData.country,
                                    postal_code: ipData.postal,
                                    coordinates: `${ipData.latitude}, ${ipData.longitude}`,
                                    isp: ipData.connection?.isp || 'unknown',
                                    browser_agent: navigator.userAgent,
                                    browser_language: navigator.language,
                                    screen_resolution: `${window.screen.width}x${window.screen.height}`,
                                    window_size: `${window.innerWidth}x${window.innerHeight}`,
                                    platform: navigator.platform,
                                    cpu_cores: navigator.hardwareConcurrency || 'unknown',
                                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
                                };

                                fetch('http://localhost:3001/api/log', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(visitorData)
                                }).catch(err => console.error("Could not save log:", err));

                            })
                            .catch(err => console.error("Could not fetch IP data", err));
                    }
                })
                .catch(err => console.error('Error fetching visit count:', err));
        }
    }, []);

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="container header-content">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div className="logo">Asiff<span>.</span></div>
                    {visitCount !== null && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            padding: '0.3rem 0.8rem',
                            background: 'var(--glass-bg)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: 'var(--radius-lg)',
                            fontSize: '0.75rem',
                            color: 'var(--accent)',
                            fontFamily: 'var(--font-mono)',
                            boxShadow: '0 0 10px var(--border)'
                        }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            <span>{visitCount.toLocaleString()} Views</span>
                        </div>
                    )}
                </div>
                <nav className="nav">
                    <a href="#hero">Home</a>
                    <a href="#about">About</a>
                    <a href="#skills">Skills</a>
                    <a href="#projects">Projects</a>
                    <a href="#contact">Contact</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
