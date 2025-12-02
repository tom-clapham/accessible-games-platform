import {useEffect, useState} from 'react'
import { IoIosWarning } from 'react-icons/io';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register_Publisher = () => {

  const [userExists, setUserExists] = useState(false)
  const [emailExists, setEmailExists] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const [success, setSuccess] = useState(false)

  const [name, setName] = useState("")
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [cPassword, setConfirmPassword] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const nav = useNavigate();

  const handleFormSubmit = async () => {
      const fileInput = document.getElementById("fileInput");
      const file = fileInput.files[0];

      const formData = new FormData();
      formData.append("logo", file);
      formData.append("name", name);
      formData.append("url", websiteUrl);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("cPassword", cPassword);
      formData.append("email", email);

      axios.post(`http://127.0.0.1:8000/app/publishers/register/`, formData, {withCredentials:true})
      .then(response => {
          setError(response.data.success)
      })
      .catch(error => {
          console.error(error);
      }, []);
  }

  useEffect(() => {
    if(error == 'email'){
        setEmailExists(true)
        setUserExists(false)
        setIsPassword(false)
    } else if(error == 'username'){
        setEmailExists(false)
        setUserExists(true)
        setIsPassword(false)
    } else if(error == 'password'){
        setEmailExists(false)
        setUserExists(false)
        setIsPassword(true)
    } else if(error){
        setEmailExists(false)
        setUserExists(false)
        setIsPassword(false)
        setSuccess(true)
        const timeout = setTimeout(() => {
          nav('/discover');
        }, 3000);
    }
  }, [error])
  

  return (
    <div className='rp-container'>
      <form className='rp-form'
      onSubmit={(e) => {
            e.preventDefault(); 
            handleFormSubmit();
      }}>
        <h1 className='rp-title'>Register Publisher</h1>
        <label className='rp-label'>Name</label>
        <input className='rp-input' required type='text' autoFocus placeholder='Enter your publisher name' value={name} onChange={(e) => setName(e.target.value)}></input>

        <label className='rp-label'>Email</label>
        <input className='rp-input' required type='email' placeholder='Enter publisher email address' value={email} onChange={(e) => setEmail(e.target.value)}></input>

        <label className='rp-label'>Website URL</label>
        <input className='rp-input' required type='url' placeholder='Enter the URL to your website' value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)}></input>

        <label className='rp-label'>Upload Logo</label>
        <input className='rp-input' required type="file" id="fileInput"></input>

        <label className='rp-label'>Username</label>
        <input className='rp-input' required type='text' placeholder='Enter a username' value={username} onChange={(e) => setUsername(e.target.value)}></input>

        <label className='rp-label'>Password</label>
        <input className='rp-input' required type='password' placeholder='Enter a password' value={password} onChange={(e) => setPassword(e.target.value)}></input>

        <label className='rp-label'>Confirm Password</label>
        <input className='rp-input' required type='password' placeholder='Re-enter your password' value={cPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>

        {userExists &&(<div className='rp-error'><IoIosWarning  className='rp-warning'/>
              This username is already in use.
          </div>
        )}
        {emailExists &&(<div  className='rp-error'><IoIosWarning className='rp-warning'/>
              This email address is already in use.
          </div>
        )}
        {isPassword &&(<div  className='rp-error'><IoIosWarning className='rp-warning'/>
            
            <ul>
              Your passwords must:
                <li>Match one another</li>
                <li>Contain at least 2 numbers</li>
                <li>Contain a minimum of 8 characters</li>
            </ul>
        </div>
        )}
        {success &&(<div  className='rp-success'>
            Thank you for registering with us, you will be redirected in <b>3 seconds.</b>
        </div>
        )}
        <button className='rp-submit-button' onClick={handleFormSubmit} type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Register_Publisher