import React, { useState } from 'react'
import Button from '../Button/Button'
import Management from '../UserManagement/UserMgt'
import ManageAccount from './ManageAccount'
import Request from '../Requests/Request'
import './ManageAccount.css'

const ManageAccountAdmin = () => {
  const [selectedOption, setSelectedOption] = useState(1)
  return (
    <>
      <div className="manageOptions">
        <Button id={selectedOption === 1 ? 'ManageClicked' : 'Manage'} onClick={() => setSelectedOption(1)} name="Actualizar Cuenta" />
        <Button id={selectedOption === 2 ? 'ManageClicked' : 'Manage'} onClick={() => setSelectedOption(2)} name="Peticiones de Usuarios" />
        <Button id={selectedOption === 3 ? 'ManageClicked' : 'Manage'} onClick={() => setSelectedOption(3)} name="Manejo de Usuarios" />
      </div>
      { selectedOption === 1
        ? <ManageAccount /> : ''}
      { selectedOption === 2
        ? <Request /> : ''}
      { selectedOption === 3
        ? <Management display={1} /> : <Management display={0} /> }
    </>
  )
}

export default ManageAccountAdmin
