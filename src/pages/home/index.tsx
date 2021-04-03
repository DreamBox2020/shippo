import React from 'react'
import { useDispatch } from 'react-redux'
import { exampleAction } from '~/modules/example'

export const Home = () => {
  const dispatch = useDispatch()
  return <h1 onClick={() => dispatch(exampleAction.add(2))}>Home</h1>
}

export default Home
