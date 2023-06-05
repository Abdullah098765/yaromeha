import React, { useState } from 'react'
import './slider.css'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
// import Modal from '../Modal/modal.js'

export default function Slider (params) {
  const [show, setShow] = useState(false)

  const auth = getAuth()
  const [user] = useAuthState(auth)

  const [group_Data, setGroupData] = useState({
    groupName: '',
    groupLanguage: '',
    comment: '',
    ownerName: '',
    ownerId: '',
    ownerPhoto: ''
  })

  function showModal () {
    const modal = document.getElementById('modal')

    if (show === false) {
      modal.classList.add('show')
      modal.classList.remove('hide')
      setShow(true)
    } else {
      modal.classList.add('hide')
      modal.classList.remove('show')
      setShow(false)
    }

    return
  }

  function handleData (e) {
    if (e.target.name === 'name') {
      group_Data.groupName = e.target.value
    } else if (e.target.name === 'lang') {
      group_Data.groupLanguage = e.target.value
    } else {
      group_Data.comment = e.target.value
    }
  }

  function create_Group () {
    group_Data.ownerName = auth.currentUser.displayName
    group_Data.ownerId = auth.currentUser.uid
    group_Data.ownerPhoto = auth.currentUser.photoURL

    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify(group_Data)

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }

    fetch('https://yaromeha-app.herokuapp.com/post_group', requestOptions)
      .then(response => response.text())
      .then(result => console.log(JSON.parse(result)))
      .catch(error => console.log('error', error))

    console.log(group_Data)
    showModal()
  }

  return (
    <div className='slider'>
      <div className='slid'>
        {user ? (
          <button onClick={() => window.open('https://yaromeha-app.web.app/create_room')}>Create your own Room</button>
        ) : (
          <button
            onClick={() => {
              window.location = 'https://yaromeha-app.web.app/signup'
            }}
          >
            SignUp to create your own Room
          </button>
        )}
      </div>

          </div>
  )
}
