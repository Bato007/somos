import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import Searchbar from '../Searchbar/Searchbar'
import './Home.css'

const Home = () => {
  const [availableResources, setAvailableResources] = useState()

  // Fetch para obtener la informacion de los recursos [{title: '', resource: file}, ...]
  const setResourcesInfo = async () => {
    setAvailableResources([{ title: 'Prueba pdf', resource: '/tal.pdf' }, { title: 'Prueba doc', resource: '/tal.doc' },
      { title: 'Prueba ppt', resource: '/tal.ppt' }, { title: 'Prueba video', resource: '/tal.mp4' },
      { title: 'Prueba video 2', resource: '/tal2.mp4' }, { title: 'Prueba video 3', resource: '/tal3.mp4' }])
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
