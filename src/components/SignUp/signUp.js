import React from 'react'
import './signUp.css'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider
} from 'firebase/auth'

export default function SignUp (params) {
  const auth = getAuth()

  function sign_In_With_Google (params) {
    const googleProvider = new GoogleAuthProvider()

    signInWithPopup(auth, googleProvider).then(user => {
      var myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')
      console.log(user)
      var raw = JSON.stringify({
        displayName: user.user.displayName,
        blocked: false,
        email: user.user.email,
        uid: user.user.uid,
        photoURL: user.user.photoURL,
        isOnline: false,
        activeRoomId:'none'
      })

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }

      fetch('https://yaromeha-app.herokuapp.com/add_user', requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(JSON.parse(result))
          localStorage.setItem('uid', user.user.email)
          window.location = 'https://yaromeha-app.web.app'
        })
        .catch(error => console.log('error', error))
        console.log('loged in');
    })
  }

  function sign_In_With_Facebook (params) {
    let facebookProvider = new FacebookAuthProvider()

    signInWithPopup(auth, facebookProvider).then(user => {})
  }

  return (
    <div>
      <div className='wrapper'>
        <form action='#'>
          <div className='h5 font-weight-bold text-center mb-3'>
            Registration
          </div>
          <div className='form-group d-flex align-items-center'>
            <div className='icon'>
              <span className='far fa-user'></span>
            </div>
            <input
              autoComplete='off'
              type='text'
              className='form-control'
              placeholder='Name'
            />
          </div>
          <div className='form-group d-flex align-items-center'>
            <div className='icon'>
              <span className='far fa-envelope'></span>
            </div>
            <input
              autoComplete='off'
              type='email'
              className='form-control'
              placeholder='Email'
            />
          </div>
          <div className='form-group d-flex align-items-center'>
            <div className='icon'>
              <span className='fas fa-phone'></span>
            </div>
            <input
              autoComplete='off'
              type='tel'
              className='form-control'
              placeholder='Phone'
            />
          </div>
          <div className='form-group d-flex align-items-center'>
            <div className='icon'>
              <span className='fas fa-map-marker-alt'></span>
            </div>
            <input
              autoComplete='off'
              type='text'
              className='form-control'
              placeholder='City'
            />
          </div>
          <div className='form-group d-flex align-items-center'>
            <div className='icon'>
              <span className='fas fa-key'></span>
            </div>
            <input
              autoComplete='off'
              type='password'
              className='form-control'
              placeholder='Password'
            />
            <div className='icon btn'>
              <span className='fas fa-eye-slash'></span>
            </div>
          </div>
          <div className='mb-2'>
            <label className='option'>
              Remember me
              <input type='checkbox' />
              <span className='checkmark'></span>
            </label>
          </div>
          <div className='btn btn-primary mb-3'>Signup</div>
          <div className='terms mb-2'>
            By clicking "Signup", you acknowledge that you have read the
            <a href='#'> Privacy Policy</a> and agree to the
            <a href='#'> Terms of Service</a>.
          </div>
          <div className='connect border-bottom mt-4 mb-4'></div>
          <ul className='p-0 social-links'>
            <li>
              <a href='#' onClick={() => sign_In_With_Facebook('true')}>
                <span className='fab fa-facebook-f'></span>
              </a>
            </li>
            <li>
              <a href='#' onClick={() => sign_In_With_Google('true')}>
                <span className='fab fa-google'></span>
              </a>
            </li>
            <li>
              <a href='#'>
                <span className='fab fa-github'></span>
              </a>
            </li>
          </ul>
        </form>
      </div>
    </div>
  )
}
