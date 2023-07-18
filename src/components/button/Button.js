import React from 'react'
import "./button.css"


function Button({ onClick }) {
  return (
    <button className="buton" onClick={onClick}>Create Account</button>
  )
}

function LoginButton({ onClick }) {
  return (
    <button className="buton" onClick={onClick}>Login</button>
  )
}

function BackButton({ onClick }) {
  return (
    <button className="buton" onClick={onClick}>Go Back</button>
  )
}


export { Button, LoginButton, BackButton }
