/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react'
import Button from '../Button/Button'
import Top from './Top'
import Audience from './Audience'
import 'reactjs-popup/dist/index.css'

import './Stats.css'

const Stats = () => {
  const [statSelected, setStatSelected] = useState(0)

  return (
    <>
      <div className="statsPage">
        <div className="statsSquare">
          <h2 className="statsTitle">Estadísticas de recursos</h2>
          <div className="manageOptions">
            <Button id={statSelected === 0 ? 'ManageClicked' : 'Manage'} onClick={() => setStatSelected(0)} name="Top 10" />
            <Button id={statSelected === 1 ? 'ManageClicked' : 'Manage'} onClick={() => setStatSelected(1)} name="Audiencia" />
          </div>
          { statSelected === 0 ? <Top /> : ''}
          { statSelected === 1 ? <Audience /> : ''}
        </div>
      </div>
    </>
  )
}

export default Stats
