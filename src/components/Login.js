import '../App.css';

import Navbar from './Navbar'
import { useForm } from "react-hook-form";
// import { LockClosedIcon } from '@heroicons/react/solid'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { addToken } from '../redux/action/addToken';
import { authUpdate } from '../redux/action/authUpdate';
import { addUser } from '../redux/action/addUser';
import { useDispatch,useSelector} from 'react-redux'
import config from '../config.json';
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {  handleSubmit } = useForm();
  const [ success, setSuccess ] = useState(false);
  const [ error, setError ] = useState(false);
  const [ message, setMessage ] = useState(false);
  const {  authStatus } = useSelector(state => ({
    authStatus: state.authStatus,
  }));

  useEffect(() => {
 
    if(authStatus===true){
      navigate("/home")
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const onSubmit = (data, e) => {
  
    setSuccess(false)
    setError(false)
  
    const url = config.url+'/api/login'
    axios
    .post(url, {
      email:email,
      password: password
    })
    .then((response) => {
      // console.log(response.data);
      setSuccess(true)
      setEmail("");
      setPassword("");

       dispatch(addToken(response.data.token))
       dispatch(addUser(response.data.user))
       dispatch(authUpdate(true))
      navigate("/home")
    

    }) 
    .catch(err => {
      // console.log(err.response)
      if (typeof err.response!=="undefined" && err.response.status===401){
        setMessage("Wrong username or password")
  setError(true)
      }else{
        if(typeof err.response!=="undefined" && err.response.status!==200){
          setMessage("Please check connection")
        setError(true)
        }
        
      }
    
      

  });


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
                  <h2><u>Login</u></h2><br/>
            
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
                <label htmlFor="password" className="sr-only">
                 Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
           
                  minLength={8}
                  value={password}
                  autoComplete="current-password"
                  required
                  onChange={(e)=>{
                    setPassword(e.target.value)
                  }}
                  className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              
            </div>

         

            <div>

              <br/>
            {success &&  <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
  <p className="font-bold">Login Successful</p>
  <p className="text-sm"></p>
</div>}
{error &&<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
  <strong className="font-bold">{message}</strong>
 

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
            Login
              </button>
            </div>

          </form>

          </div>

        </div>
        </div>
  )
}