import React from 'react'
import "./button.css"



  
function Button({onClick}) {
  return (
        <button className="buton" onClick={onClick}>Create Account</button>
  )
}

export default Button
