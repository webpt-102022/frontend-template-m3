import React, { useState } from 'react'

export default function AddKnowledgeForm({ handleAddKnowledge }) {
    const initialState = {
        title: '',
        knowledgeImage: '',
        description: '',
        timeOfActivity: '',
        category: 'Music',
        location:'',
    };

    const [newKnowledge, setNewKnowledge] = useState(initialState);

    const handleChange = (e) => {
        setNewKnowledge(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddKnowledge(newKnowledge);
        setNewKnowledge(initialState);
    };

    return (
        <div className="form_container">
            <form onSubmit={handleSubmit}>
                <label>Knowledge title</label>
                <input type="text" name="title" value={newKnowledge.title} onChange={handleChange} required />
                <label>Knowledge image</label>
                <input type="text" name="knowledgeImage" required value={newKnowledge.knowledgeImage} onChange={handleChange} />
                <label>Knowledge description</label>
                <input type="text" name="description" required value={newKnowledge.description} onChange={handleChange} />
                <label>Knowledge time of activity in hours</label>
                <input type="number" name="timeOfActivity" required value={newKnowledge.timeOfActivity} onChange={handleChange} />
                <select name="category" value={newKnowledge.category} onChange={handleChange}>
                    <option value="Music">Music</option>
                    <option value="Cooking">Cooking</option>
                    <option value="Health">Health</option>
                    <option value="Sport">Sport</option>
                    <option value="Crafts">Crafts</option>
                    <option value="Circus">Circus</option>
                    <option value="Languages">Languages</option>
                    <option value="Animals">Animals</option>
                    <option value="Others">Others</option>
                </select>
                <label>Location</label>
                <input type="text" name="location" required value={newKnowledge.location} onChange={handleChange} />
                <button type="submit" className="btn">Create</button>
            </form>
        </div>
    )
};