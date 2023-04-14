import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserCard from '../../components/UserCard';
//import { knowledge } from '../../data';  
import userService from '../../services/userService';

export default function UserDetail() {
    const { usersId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    const getUser = async () => {
        try {
            const response = await userService.getUser(usersId);
            setLoading(false);
            setUser(response);
            setError(false);
            console.log(response);
        } catch (error) {
            console.error(error)
            setLoading(false);
        }
    }

    useEffect(() => {
        getUser();
        // eslint-disable-next-line
    }, [knowledgesId])

    return (
        <div>
            {loading && <p>Loading...</p>}
            {!loading && user && <UserCard user={user} />}
            {error && <p>Something went wrong. Couldn't find your user</p>}
        </div>
    )
}