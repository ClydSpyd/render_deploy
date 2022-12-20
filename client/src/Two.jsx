import React from 'react'
import { useSelector } from 'react-redux';

const Two = () => {
    const { isLoggedIn } = useSelector(state => state.auth) 
  return (
    <div>Two</div>
  )
}

export default Two