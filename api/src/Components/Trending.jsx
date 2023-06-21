import React, {Component, useState, useEffect} from 'react';
import axios from 'axios';

const Trending = () => {
    const [trending, setTrending] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)


    useEffect(() => {
            const fetchData = async () => {
                setLoading(true);
                 setError(false)
                try{
                    const result = await axios.get('api.giphy.com/v1/trending/searches',{
                        params: {
                            api_key: 'Fb5Lhkj3yaMQJvkawOQbBCd0dVvlkueo'
                            }
                        });
                    setTrending(result.data.data)
                    setLoading(false)
                } catch(error){
                    console.log(error)
                    alert("error")
                }
            };
            fetchData();
        }, [])

        return (
            <div>

            </div>
        )
}

export default Trending