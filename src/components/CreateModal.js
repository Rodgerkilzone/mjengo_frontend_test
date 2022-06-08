import '../App.css';

import {  useSelector } from 'react-redux';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import config from '../config.json';
export default function CreateModal({getPosts}) {

    const {  handleSubmit } = useForm();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [modal, setModal] = useState(false);
    const [ success, setSuccess ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ message, setMessage ] = useState(false);

    const {  token,user } = useSelector(state => ({
        token: state.token,
        user: state.user
      }));

    const onSubmit = (data, e) => {
  
        setSuccess(false)
        setError(false)
        let requestOptions = {
 headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +token
      }
    };
    const url = config.url+'/api/posts'
        axios
        .post(url, {
          title:title,
          body: body,
          user_id:user.id
        },requestOptions)
        .then((response) => {
        //   console.log(response.data);
          setSuccess(true)
            setBody("")
            setTitle("")
            getPosts();

    
        }) 
        .catch(err => {
            if(typeof err.response!=="undefined" && err.response.status!==200){
                setMessage("Please check connection")
              setError(true)
              }
      });
    };
  
 const onError = (errors, e) => console.log(errors, e);
  return (
    <div> <button onClick={()=>{setModal(!modal)}} href="#"  type="button" data-modal-toggle="popup-modal" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Create Post
    </button>
  
      {modal &&<div style={{position:'fixed',display:'flex',justifyContent:'center',alignItems:'center',left:0,top:0,width:'100vw',height:'100vh',backgroundColor:'rgba(0,0,0,0.5)'}}>
  
      <div onClick={()=>{
           setTitle("");
           setBody("");
           setSuccess(false)
           setError(false)
           setModal(false)
           
           }}  style={{position:'fixed',display:'flex',justifyContent:'center',alignItems:'center',left:0,top:0,width:'100vw',height:'100vh',backgroundColor:'rgba(0,0,0,0)',zIndex:-2}}>
          </div>
  <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
  
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Create Post</h5>
   
 
    <form    
  onSubmit={handleSubmit(onSubmit, onError)}
        >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px" >
              <div>
            
                <label htmlFor="email-address" className="sr-only">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  onChange={(e)=>{
                    setTitle(e.target.value)
                  }}
                  value={title}
               className="appearance-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Title"
                  style={{minWidth:300}}
                />
              </div>
              <br/>
              
              <div>
                 
            
                <label htmlFor="email-address" className="sr-only">
                 Body
                </label>
                <textarea
                  id="body"
                  name="body"
               
                  required
                  onChange={(e)=>{
                    setBody(e.target.value)
                  }}
                  value={body}
               className="appearance-none  relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Body"
                  style={{minWidth:300}}
                ></textarea>
              </div>
              
            </div>

         

            <div>

              <br/>
              {success &&  <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
  <p className="font-bold"> Post Successful</p>
</div>}
{error &&<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
  <strong className="font-bold">{message}</strong>
  {/* <span className="block sm:inline">Please use another email address</span> */}

</div>}
         
<br/>
<div style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
       <button onClick={()=>{
           setTitle("");
           setBody("");
           setSuccess(false)
           setError(false)
           setModal(false)
           
           }} href="#" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
        Close
</button>  
 <button href="#"    type="submit"  data-modal-toggle="popup-modal" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Create
    </button>
  </div>
            </div>

          </form>


</div>
        </div>
}
     </div>
  )
}