import React from 'react'
import Modal from '../components/Modal'
import Navbar from '../components/Navbar'


export default function Forum() {
    // const [open, setOpen] = React.useState(false);
    // const [opendos, setOpendos] = React.useState(false);
  
    return (
        <div>
        <Navbar />
        startsida
        <Modal openState={false} btnLabel="Registera" btnClass="navRegisterButton" />
        <Modal openState={false} btnLabel="Logga in" btnClass="navRegisterButton" />
    </div>
  )
}
