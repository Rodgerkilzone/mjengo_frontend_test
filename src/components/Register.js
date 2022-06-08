import '../App.css';
import config from '../config.json';
import Navbar from './Navbar'
import { useForm } from "react-hook-form";
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_c, setPassword_c] = useState("");
  const { handleSubmit } = useForm();
  const [ success, setSuccess ] = useState(false);
  const [ error, setError ] = useState(false);
  const [ message, setMessage ] = useState(false);
  const navigate = useNavigate();
  const {  authStatus } = useSelector(state => ({
    authStatus: state.authStatus,
  }));

  useEffect(() => {
 
    if(authStatus===true){
      navigate("/home")
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  const onSubmit = (data, e) => {
  
    setSuccess(false)
    setError(false)
    if(password!==password_c){
      setMessage("Wrong password confirmation")

    setError(true)
    }else{
      const url = config.url+'/api/register'
    axios
    .post(url, {
      name:name,
      email:email,
      password: password
    })
    .then((response) => {
      // console.log(response.status);
      setSuccess(true)
      setName("");
      setEmail("");
      setPassword("");
      setPassword_c("");
    }) 
    .catch(err => {
      console.log(err.response.status)
      if (err.response.status===422){
        setMessage("Email address already exist")
      }else{
        setMessage("Please check connection")
      }
      setError(true)
      

  });;
}

  };
  const onError = (errors, e) => console.log(errors, e);
  return (
      <div>
  <Navbar/>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div style={{padding:20,boxShadow:'rgba(0, 0, 0, 0.35) 0px 5px 15px',borderRadius:10}}>
          <form    onSubmit={handleSubmit(onSubmit, onError)} >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px" >
              <div>
                  <h2><u>Register</u></h2><br/>
                <label  className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  minLength={4}
                  value={name}
                  onChange={(e)=>{
                    setName(e.target.value)
                  }}
                  required
                  className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                  style={{minWidth:350}}
                />
              </div>
              <div>
             
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={(e)=>{
                    setEmail(e.target.value)
                  }}
                  value={email}
                  className="appearance-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  style={{minWidth:350}}
                />
              </div>
               <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  minLength={8}
                  value={password}
                  className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={(e)=>{
                    setPassword(e.target.value)
                  }}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                 Confirm Password
                </label>
                <input
                  id="password2"
                  name="password2"
                  type="password"
           
                  minLength={8}
                  value={password_c}
                  autoComplete="current-password"
                  required
                  onChange={(e)=>{
                    setPassword_c(e.target.value)
                  }}
                  className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                />
              </div>
              
            </div>

         

            <div>

              <br/>
            {success &&  <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
  <p className="font-bold">Registration Successful</p>
  <p className="text-sm">Click on the Login Page to proceed</p>
</div>}
{error &&<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
  <strong className="font-bold">{message}</strong>
  {/* <span className="block sm:inline">Please use another email address</span> */}

</div>}
<br/>
              <button
                type="submit"
                className="group relative w-full flex justify-center
                py-2 px-4 border border-transparent text-sm font-medium
                rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              
                </span>
            Register
              </button>
            </div>

          </form>

          </div>

        </div>
        </div>
  )
}