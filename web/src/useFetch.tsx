import {useState, useEffect} from 'react';

//Function that makes an API call using the fetch function and handles the request status and error
export default function useFetch(url: string) : returnFetch{
    //Get the token from the local storage
    const token = localStorage.getItem('token');
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
       setLoading(true);
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, []);
    
    return {data, loading , error};
}

//Type of the return of the useFetch function
type returnFetch = {
    data: any[],
    loading: boolean,
    error: any
}