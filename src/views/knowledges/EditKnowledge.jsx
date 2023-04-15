import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
/*import authService from '../../services/authService'; */
import knowledgeService from '../../services/knowledgeService';
import axios from 'axios';

export default function EditKnowledge() {
    const { knowledgeId } = useParams();
    const [ knowledge, setKnowledge ] = useState({});
    const [ error, setError ] = useState(false);
    const navigate = useNavigate();

    const getKnowledge = async () => {
        try {
            const response = await knowledgeService.getKnowledge(knowledgeId); 
            setKnowledge(response);
            setError(false);
            console.log(response);
        } catch (error) {
            console.error(error)
            setError(true)
        }
    };

    useEffect(() => {
        getKnowledge();
        // eslint-disable-next-line
    }, [knowledgeId]);

    const handleChange = (e) => {
        setKnowledge(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await knowledgeService.editKnowledge(knowledgeId, knowledge); 
            //await axios.put(`http://localhost:8080/courses/${courseId}`, course) Ale
            await axios.put(`http://localhost:8080/knowledges/${knowledgeId}`, knowledge)  
            navigate(`/knowledges/${knowledgeId}`)
            // toast 
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div className="form_container">
            <form onSubmit={handleSubmit}>
                {error && <p>Something went wrong. Couldn't find your knowledge</p>}
                <label>Knowledge title</label>
                <input type="text" name="title" value={knowledge.title} onChange={handleChange} required />
                <label>Knowledge image</label>
                <input type="text" name="knowledgeImage" required value={knowledge.knowledgeImage} onChange={handleChange} />
                <label>Knowledge description</label>
                <input type="text" name="description" required value={knowledge.description} onChange={handleChange} />
                <label>Knowledge time of activity in hours</label>
                <input type="number" name="timeOfActivity" required value={knowledge.timeOfActivity} onChange={handleChange} />
                <select name="category" value={knowledge.category} onChange={handleChange}>
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
                <input type="text" name="location" required value={knowledge.location} onChange={handleChange} />
                <label>Contact me:</label>
                <input type="text" name="contactMe" required value={knowledge.contactMe} onChange={handleChange} />
                <button type="submit" className="btn">Save changes</button> 
            </form>
        </div>
    )
}