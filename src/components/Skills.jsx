import React from 'react';
import { profileData } from '../data';
import './Skills.css';

const Skills = () => {
    return (
        <section id="skills" className="skills-section">
            <div className="container">
                <h2 className="section-title">Technical Expertise</h2>
                <div className="skills-grid reveal">
                    {profileData.skills.map((skillGroup, index) => (
                        <div key={index} className="skill-card reveal">
                            <h3 className="skill-category">{skillGroup.category}</h3>
                            <div className="skill-tags">
                                {skillGroup.items.map((item, idx) => (
                                    <span key={idx} className="skill-tag">{item}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
