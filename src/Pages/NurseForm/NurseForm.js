import React from 'react'
import NurseFormComponent from '../../Components/NurseForm/NurseFormComponent'
import Fade from 'react-reveal/Fade'

function NurseForm({Socket}) {
  return (
    <Fade top distance="10%" duration={1500}>
        <NurseFormComponent Socket={Socket}/>
    </Fade>
  )
}

export default NurseForm