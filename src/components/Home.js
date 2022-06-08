import '../App.css';

import Navbar from './Navbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import CreateModal from './CreateModal'
import UpdateModal from './UpdateModal'
import {  useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import config from '../config.json';
export default function Home() {
  const {  authStatus,user,token } = useSelector(state => ({
    authStatus: state.authStatus,
    user:state.user,
    token:state.token
  }));
  const [posts,setPosts]=useState([]);
  const [ message, setMessage ] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
 
    if(authStatus===false){
      navigate("/")
    }
    getPosts();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  const getPosts = (data, e) => {
  
    let requestOptions = {
headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' +token
  }
};
    const url = config.url+'/api/posts'
    axios
    .get(url,requestOptions)
    .then((response) => {
      // console.log(response.data);
            setPosts(response.data.data)
    
            setMessage("")
    }) 
    .catch(err => {
        if(typeof err.response!=="undefined" && err.response.status!==200){
            setMessage("Please check connection")
          console.log(err)
          }
  });
};
const deletePost = (id) => {
  let requestOptions = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +token
      }
    };
    const url = config.url+'/api/posts/'+id
  axios
  .delete(url,requestOptions)
  .then((response) => {
    setMessage("")
    getPosts();

  }) 
  .catch(err => {
      if(typeof err.response!=="undefined" && err.response.status!==200){
          // setMessage("Please check connection")
        console.log(err)
        }
});
};
  return (
    <div>
      <Navbar/>
  
    <div style={{padding:10}}><div><strong>Name: </strong> {user.name}</div>
      <div><strong>Email: </strong>  {user.email}</div></div> 
      <div style={{width:'100%',display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
    <div style={{margin:10,minWidth:350,display:'flex',justifyContent:'space-between',alignItems:'flex-end'}}><strong>Posts</strong> <CreateModal getPosts={getPosts}/></div> 
    
 {posts.map((post,id)=>{

   return(
      <div key={id} style={{margin:5,minWidth:400}} className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
 
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
 
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{post.body}</p>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400" style={{fontSize:11}}>Date Created: {post.created_at.slice(0,10)}</p>
    <div style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
     
<UpdateModal post={post} getPosts={getPosts}/>

    <button onClick={()=>{
      deletePost(post.id);
 
      
      }} href="#" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
        Delete
</button></div>

</div>
   )
 }).reverse()}
 {message}
</div>
        </div>
  )
}