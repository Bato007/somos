import React, { useState, useEffect } from 'react'
import ErrorScreen from '../Error/ErrorScreen'
import Searchbar from '../Searchbar/Searchbar'
import apiURL from '../fetch'
import './Home.css'

const Home = () => {
  const [availableResources, setAvailableResources] = useState()
  const [loading, setLoading] = useState(true)
  const username = localStorage.getItem('username')

  // Fetch para obtener la informacion de los recursos [{id: '', title: '', resource: file}, ...]
  const setResourcesInfo = async () => {
    await fetch(`${apiURL}/resources/files/${username}`, {
      method: 'GET',
      headers: {
        somoskey: `${localStorage.getItem('somoskey')}`,
      },
    }).then((res) => {
      res.json().then((data) => {
        // eslint-disable-next-line no-unused-expressions
        data.message ? setAvailableResources([data]) : setAvailableResources(data)
        setLoading(false)
      })
    })
  }

  // Se obtienen los recursos disponibles
  useEffect(() => {
    setResourcesInfo()
  }, [])

  return (
    <>
      {
      loading
        ? (
          <div className="loadingScreen">
            <div className="loader" />
          </div>
        )
        : (
          <div>
            { availableResources.length > 0
              ? <Searchbar availableResources={availableResources} />
              : <ErrorScreen /> }
          </div>
        )
    }
    </>
  )
}
export default Home
