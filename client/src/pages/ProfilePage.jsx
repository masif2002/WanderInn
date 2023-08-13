import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    const { data } = await axios.post('/logout')
    setUser(null)
    alert(data.message)
    navigate('/')
  }

  return (
    <section className='flex flex-col items-center mx-auto max-w-lg mt-12 '>
      
      <h3>Logged in as {user.name} ({user.email})</h3>
      <button onClick={handleLogout} className="primary rounded-3xl max-w-sm mt-2">Logout</button>
     
    </section>
  )
}

export default ProfilePage