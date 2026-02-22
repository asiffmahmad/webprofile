import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            padding: '2rem 0',
            textAlign: 'center',
            color: 'var(--text-secondary)',
            borderTop: '1px solid var(--border)',
            background: 'var(--bg-primary)'
        }}>
            <div className="container">
                <p>&copy; 2026 Asiff Mahmad. All rights reserved.</p>
                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Built with React & Vanilla CSS</p>
            </div>
        </footer>
    );
};

export default Footer;
