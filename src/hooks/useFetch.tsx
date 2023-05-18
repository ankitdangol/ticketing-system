import { useEffect, useState } from 'react'

const useFetch = (url: string) => {
    const [data, setData] = useState<any>();
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(url);
                const json = await res.json();
                setData(json);
                setLoading(false);
            } catch (error: any) {
                setError(error);
                setLoading(false);
            }

        }
        fetchData();
    }, [url])
    return { loading, error, data };
}

export default useFetch;
