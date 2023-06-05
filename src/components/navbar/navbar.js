import React, { useEffect } from 'react'
import './navbar.css'
import { getAuth, signOut } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function Navbar (params) {
  const auth = getAuth()
  const [user] = useAuthState(auth)



  function signOutFunc () {
    signOut(auth)
      .then(e => {
        console.log(e)
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        var raw = JSON.stringify({ uid: localStorage.getItem('uid') })

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        }

        fetch('https://yaromeha-app.herokuapp.com/remove_user', requestOptions)
          .then(response => response.text())
          .then(result => {
            console.log(result)
            localStorage.removeItem('uid')
          })
          .catch(error => console.log('error', error))
      })
      .catch(err => {
        console.log(err)
      })
  }

  

  return (
    <div >
      <nav>
        <h2>Yaromeha Studio</h2>
        <ul>
          {user ? (
            <li onClick={() => signOutFunc()}>
              <a href='#' className='text-light'>
                logout
              </a>
            </li>
          ) : (
            <li>
              <a href='https://yaromeha-app.web.app/signup'>Sign Up</a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  )
}
