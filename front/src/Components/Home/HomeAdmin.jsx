import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import Searchbar from '../Searchbar/Searchbar'
import './Home.css'

const HomeAdmin = () => {
  const [availableResources, setAvailableResources] = useState()
  const username = localStorage.getItem('username')

  // Fetch para obtener la informacion de los recursos [{id: '', title: '', resource: file}, ...]
  const setResourcesInfo = async () => {
    await fetch(`http://localhost:3001/resources/files/${username}`, {
      method: 'GET',
    }).then((res) => {
      res.json().then((data) => {
        // eslint-disable-next-line no-unused-expressions
        data.message ? setAvailableResources([data]) : setAvailableResources(data)
      })
    })
  }

  // Se obtienen los recursos disponibles
  useEffect(() => {
    setResourcesInfo()
  }, [])

  return (
    <div>
      <NavBar isAdmin />
      { availableResources ? <Searchbar availableResources={availableResources} /> : '' }
    </div>
  )
}

export default HomeAdmin
