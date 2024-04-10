import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../../types';

export function useAuthorization(userData: UserData) {
    const navigate = useNavigate();

    useEffect(() => {
        console.log('xd')
        if (userData.name === '' && userData.currentRoom !== '') {
            navigate('/');
        }
    }, [userData, navigate]);
}