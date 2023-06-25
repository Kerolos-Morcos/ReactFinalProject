import React from 'react'
import NurseFormComponent from '../../Components/NurseForm/NurseFormComponent'

function NurseForm({Socket}) {
  return (
        <NurseFormComponent Socket={Socket}/>
  )
}

export default NurseForm