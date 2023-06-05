import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../Context/context'
import './room.css'
import {
  BsFillMicFill,
  BsCameraVideo,
  BsFillBarChartFill,
  BsBoxArrowRight
} from 'react-icons/bs'
import { io } from 'socket.io-client'

export default function Room () {
  const url = window.location.href
  const strs = url.split(':')
  const id = strs.at(-1)

  const [roomData, setRoomData] = useState({})
  // let { setUser, user } = useContext(AppContext)
  const [user, setUser] = useState({})

  useEffect(() => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify({ id: id })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }

    fetch('http://localhost:5000/get_group', requestOptions)
      .then(response => response.text())
      .then(result => {
        setRoomData(JSON.parse(result))
      })
      .catch(error => console.log('error', error))
  }, [])

  useEffect(() => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify({ uid: localStorage.getItem('uid') })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }

    fetch('http://localhost:5000/get_user', requestOptions)
      .then(response => response.text())
      .then(result => {
        setUser(JSON.parse(result))

        // var myHeaders = new Headers()
        // myHeaders.append('Content-Type', 'application/json')
        // var raw = JSON.stringify({
        //   groupID: roomData._id,
        //   member: JSON.parse(result)
        // })
        // console.log(roomData)

        // var requestOptions = {
        //   method: 'POST',
        //   headers: myHeaders,
        //   body: raw,
        //   redirect: 'follow'
        // }

        // fetch('https://yaromeha-app.herokuapp.com/add_member', requestOptions)
        //   .then(response => response.text())
        //   .then(result => {
        //     console.log(JSON.parse(result))
        //   })
        //   .catch(error => console.log('error', error))
      })
      .catch(error => console.log('error', error))
  })

  useEffect(() => {
    var socket = io('http://localhost:5000/', {
      query: 'roomId=' + id + '&userId=' + localStorage.getItem('uid')
    })

    // socket.on('sending', data => {
    //   console.log(data, 'recieved')
    //   socket.emit('recieving', 'Hi Server')
    // })
  }, [])

  function removeMember (params) {
    console.log('clicked')
    // var myHeaders = new Headers()
    // myHeaders.append('Content-Type', 'application/json')

    // var raw = JSON.stringify({ id, user })

    // var requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: 'follow'
    // }

    // fetch('http://localhost:5000/delete_member', requestOptions)
    //   .then(response => response.text())
    //   .then(result => {
    //     console.log(JSON.parse(result))
    //   })
    //   .catch(error => console.log('error', error))
  }

  // window.addEventListener('beforeunload', ev => {
  //   console.log('Are you sure you want to close?');

  //   // ev.preventDefault();
  //   // return ev.returnValue = 'Are you sure you want to close?';
  // })
  return (
    <div className='room'>
      {/* <div className='room-nav'></div> */}
      <div className='room-contant'>
        <div className='room-contant-nav row'>
          <div className='control-buttons col-1 text-light'>
            <BsFillMicFill size={25} />
          </div>
          <div className='control-buttons col-1 text-primary'>
            <BsCameraVideo size={25} />
          </div>
          <div className='control-buttons col-1'>
            <BsFillBarChartFill size={25} />
          </div>
          <div
            className='control-buttons col-1 text-danger'
            onClick={() => removeMember()}
          >
            <BsBoxArrowRight size={25} />
          </div>
        </div>
      </div>
      <div className='chat-items'></div>
      <div className='room-footer text-light '>
        <div className='row member-row text-light'>
          {roomData.members &&
            roomData.members.map(member => (
              <div className='col-1 text-light room-member'>
                <img
                  className='rounded-circle room-memberImage ml-2'
                  src={member.photoURL}
                ></img>
                <p className='room-memberName'>{member.displayName}</p>

                {/* <p className='text-gray'>ssmmhazz@gmail.com</p>  */}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
