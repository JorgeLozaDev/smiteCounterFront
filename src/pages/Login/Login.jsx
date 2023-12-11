import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const navigate = useNavigate()
  return (
    <div>Login
        <Button onClick={()=>{navigate("/singin")}}>Crea cuenta</Button>
    </div>
  )
}
