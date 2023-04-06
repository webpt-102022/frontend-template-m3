import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import authService from '../../services/authService';
import axios from 'axios';

export default function EditKnowledge() {
    const { knowledgeId } = useParams();
    const [ knowledge, setKnowledge ] = useState({});
    const [ error, setError ] = useState(false);
    const navigate = useNavigate();

    const getKnowledge = async () => {
        try {
            const response = await authService.getKnowledge(knowledgeId);
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
            await authService.editCourse(knowledgeId, knowledge);
            //await axios.put(`http://localhost:8080/courses/${courseId}`, course)
            navigate(`/knowledges/${knowledgeId}`)
        } catch (error) {
            console.error(error)
        }
    }



    return (
        <div>
            <form onSubmit={handleSubmit}>
                {error && <p>Something went wrong. Couldn't find your course</p>}
                <label>Knowledge title</label>
                <input type="text" name="title" value={knowledge.title} onChange={handleChange} required />
                <label>Knowledge image</label>
                <input type="text" name="image" required value={knowledge.knowledgeImage} onChange={handleChange} />
                <label>Knowledge description</label>
                <input type="text" name="description" required value={knowledge.description} onChange={handleChange} />
                <label>Knowledge time of activity</label>
                <input type="number" name="time" required value={knowledge.timeOfActivity} onChange={handleChange} />
                <select name="type" value={knowledge.type} onChange={handleChange}>
                    <option value="remote">Remote</option>
                    <option value="in person">In person</option>
                </select>
                <button type="submit" className="btn">Save changes</button>
            </form>
        </div>
    )
}