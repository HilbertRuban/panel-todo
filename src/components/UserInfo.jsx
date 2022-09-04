import React, { useState } from 'react'
import Logout from '../utilitiesComponent/Logout'
import SignIn from '../utilitiesComponent/SignIn'
import SignUp from '../utilitiesComponent/SignUp'

const UserInfo = ({signedIn}) => {

  return (
    <>
    {!signedIn ? 
        <div className="ml-auto mr-8 pt-1">
        <SignUp />
        <SignIn  />
      </div>
      :
      <div className="ml-auto mr-4 pt-2">
        <SignUp />
        <Logout />
      </div>
        
    }
    </>
  )
}

export default UserInfo