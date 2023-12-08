import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function KnowledgeCard({ knowledge, handleDelete }) {
    const { category, _id,  userId, title, knowledgeImage, timeOfActivity, location, description, contactMe } = knowledge;
    const { user } = useAuth();
    const handleDeleteKnowledge = () => {
        handleDelete(_id /*userId*/)
    };

    return (
        /*
        <div className="card">
            <h2>{title}</h2>
            <img src={knowledgeImage} alt={title} />
            <p>{description}</p>
            <ul>
                <li>Time: {timeOfActivity}h</li>
                <li>Location: {location}</li>
                <li>Knowledge: {category}</li>
                <li>Contact me: {contactMe}</li>
            </ul>
            {user._id === userId && <button className="btn" style={{ marginLeft: '10px' }} onClick={handleDeleteKnowledge}>Delete</button>}
            {user._id === userId && <button className="btn" style={{ marginLeft: '10px' }}><Link to={`/edit/${_id}`}>Edit</Link></button>}       
        </div>
        */
        <div className="card">
        <div className="card-header">
          <h2>{title}</h2>
        </div>
        <img src={knowledgeImage} alt={title} className="card-image" />
        <div className="card-content">
          <p>{description}</p>
          <ul className="card-metadata">
            <li>Time: {timeOfActivity}h</li>
            <li>Location: {location}</li>
            <li>{category}</li>
            <li>{contactMe}</li>
          </ul>
        </div>
        <div className="card-actions">
          {user._id === userId && (
            <button className="btn" onClick={handleDeleteKnowledge}>
              Delete
            </button>
          )}
          {user._id === userId && (
            <button className="btn">
              <Link to={`/edit/${_id}`}>Edit</Link>
            </button>
          )}
        </div>
      </div>
      
    )
};