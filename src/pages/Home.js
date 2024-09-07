import React from 'react'
import { Link } from "react-router-dom";
const Home = () => {

  return (
   <>
    <h1>Welcome to Seamless-knitting learning module</h1>
    <Link to="/Login">
     <button className="bg-violet-600 hover:bg-violet-700 transition w-full lg:max-w-[150px] h-16 rounded-lg flex justify-center items-center text-white text-xl ">Login</button>
    </Link>
   </>
  )
}

export default Home