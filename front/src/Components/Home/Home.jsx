import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import ResourcePreview from '../ResourcePreview/ResourcePreview'
import './Home.css'

const Home = () => {
  const [availableResources, setAvailableResources] = useState([])

  // Se obtienen los recursos disponibles
  useEffect(() => {
    setResourcesInfo()
  }, [])

  // Fetch para obtener la informacion de los recursos [{title: '', resource: file}, ...]
  const setResourcesInfo = () => {
    setAvailableResources([{title: 'Prueba pdf', resource:'/tal.pdf'}, {title: 'Prueba doc', resource:'/tal.doc'},
    {title: 'Prueba ppt', resource:'/tal.ppt'}, {title: 'Prueba video', resource:'/tal.mp4'}])
  }

  return (
    <div>
      <NavBar />
      <ResourcePreview availableResources={availableResources} />
    </div>
  )
}
export default Home
