import React, {useState} from "react";
import {useHistory} from 'react-router-dom'
import {axiosWithAuth} from '../utils/axiosWithAuth'
const initialCred ={
  username:'',
  password:''
}
const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState(initialCred)
  const history = useHistory()
  const [error, setError] = useState("")

const handleChange = (e) =>{
  setCredentials({
    ...credentials,
    [e.target.name]: e.target.value
  })
}

const login = (e) =>{
  e.preventDefault();
  axiosWithAuth()
  .post('/api/login', credentials)
  .then((res) =>{
    localStorage.setItem("token", res.data.payload);
    history.push('/protected')
  })
  .catch((err) =>{
    console.log(err)
    setError(err.response.data.error)
  })
}

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={login}>
        <input 
        type="text"
        onChange={handleChange}
        name="username"
        value={credentials.username} />
        <input 
        type="text"
        onChange={handleChange}
        name="password"
        value={credentials.password} />
        <button>Log In</button>
      </form>
      <p style={{color:"red"}}>{error}</p>
    </>
  );
};

export default Login;
