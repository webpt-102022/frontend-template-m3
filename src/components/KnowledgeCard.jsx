import React from 'react';
import { Link } from 'react-router-dom';

export default function KnowledgeCard({ knowledge, handleDelete }) {
    const { category, _id,  userId,  title, knowledgeImage, timeOfActivity, location, description  } = knowledge;
console.log(knowledge._id)
    const handleDeleteKnowledge = () => {
        handleDelete(/*_id*/userId)
    };

    return (
        <div className="card">
            <h3>{title}</h3>
            <img src={knowledgeImage} alt={title} />
            <p>{description}</p>
            <ul>
                <li>Time: {timeOfActivity}$</li>
                <li>Location {location}</li>
                <li>Category of Knowledge: {category}</li>
            </ul>
            <button className="btn"><Link to={`/knowledges/${_id}`}>See more</Link></button>
            <button className="btn" style={{ marginLeft: '10px' }} onClick={handleDeleteKnowledge}>Delete</button>
            <button className="btn" style={{ marginLeft: '10px' }}><Link to={`/edit/${_id}`}>Edit</Link></button>
        </div>
    )
};