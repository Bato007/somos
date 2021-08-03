import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import Searchbar from '../Searchbar/Searchbar'
import './Home.css'

const Home = () => {
  const location = useLocation()
  const [availableResources, setAvailableResources] = useState()
  const username = location.state.detail

  // Fetch para obtener la informacion de los recursos [{id: '', title: '', resource: file}, ...]
  const setResourcesInfo = async () => {
    const json = await fetch(`http://localhost:3001/resources/files/${username}`, {
      method: 'GET',
    }).then((res) => res.json())

    setAvailableResources(json)
  }

  // Se obtienen los recursos disponibles
  useEffect(() => {
    setResourcesInfo()
  }, [])

  return (
    <div>
      <NavBar />
      { availableResources ? <Searchbar availableResources={availableResources} /> : '' }
    </div>
  )
}
export default Home
