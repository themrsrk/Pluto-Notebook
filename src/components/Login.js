import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

const Login = () => {

    const [credentials, setCredentials] = useState({email: "", password:""})
    const history = useHistory();
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            //   "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3Njk2ZTNiZGE4M2IwZmQwNjg5OGIxIn0sImlhdCI6MTYzNTE2NzQ4MH0.KMS4F0OjWglMZ2Rhhkgz6VwOv6f148REAzIUolPxBZ0"
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        
          });
          const json = await response.json();
          console.log(json);
          if (json.success){
              localStorage.setItem("token", json.Token)
            history.push("/");

          }else {
                alert("Invalid credentials")
          }
    
    }
    return (
        <div>
            <div className="container my-5" >
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email" value={credentials.email} onChange={handleChange} aria-describedby="emailHelp" placeholder="Enter email"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credentials.password} onChange={handleChange} placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </div>
        </div>
    )
}

export default Login
