import React from 'react';
import { profileData } from '../data';
import './Contact.css';

const Contact = () => {
    return (
        <section id="contact" className="contact-section">
            <div className="container contact-container">
                <div className="contact-content">
                    <h2 className="section-title">Let's Connect</h2>
                    <p className="contact-text">
                        I'm currently exploring new opportunities in System Architecture and scalable backend development.
                        Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>
                    <div className="contact-links">
                        <a href={`mailto:${profileData.email}`} className="btn btn-primary btn-lg">Email Me</a>
                        <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">
                            LinkedIn
                        </a>
                        <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg">
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
