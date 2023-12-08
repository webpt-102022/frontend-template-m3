import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import KnowledgeCard from '../../components/KnowledgeCard';
//import { knowledge } from '../../data';  
import knowledgeService from '../../services/knowledgeService';

export default function KnowledgeDetail() {
    const { knowledgesId } = useParams();
    const [knowledge, setKnowledge] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    const getKnowledge = async () => {
        try {
            const response = await knowledgeService.getKnowledge(knowledgesId);
            setLoading(false);
            setKnowledge(response);
            setError(false);
            console.log(response);
        } catch (error) {
            console.error(error)
            setLoading(false);
        }
    }

    useEffect(() => {
        getKnowledge();
        // eslint-disable-next-line
    }, [knowledgesId])

    return (
        <div>
            {loading && <p>Loading...</p>}
            {!loading && knowledge && <KnowledgeCard knowledge={knowledge} />}
            {error && <p>Something went wrong. Couldn't find your knowledge</p>}
        </div>
    )
}