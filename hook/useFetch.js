import { useState, useEffect } from 'react'
import axios from 'axios'

const rapidApiKey = process.env.RAPID_API_KEY

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
          'X-RapidAPI-Key': '', // add your API key here
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: {...query },
      };

      const fetchData = async () => {
        setIsLoading(true)
        try{
            const response = await axios.request(options)
            // console.log(response.data)
            setData(response.data.data)
            setIsLoading(false) 
        } catch (error) {
            console.log(error)
            setError(error)
            alert('There is an error')
        } finally {
            setIsLoading(false)
        }
      }

    useEffect(() => {
        fetchData()
    }, [])

    const refetch = async () => {
        setIsLoading(true)
        fetchData()
    }

    return { data, isLoading, error, refetch }
    // return { data, isLoading, error }
}

export default useFetch