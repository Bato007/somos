/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react'
import Button from '../Button/Button'
import 'reactjs-popup/dist/index.css'

import './Stats.css'

const Top = () => {
  const [statSelected, setStatSelected] = useState(0)

  return (
    <>
      <div className="statsContainer">
        <div className="statsGraph">
          GRAFICA
        </div>
        <div className="statsTable">
          TABLA
        </div>
      </div>
    </>
  )
}

export default Top
