import {useState} from 'react'
import axios from 'axios';

const Register_Publisher = () => {

  const [name, setName] = useState("")
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [cPassword, setConfirmPassword] = useState("")
  const [email, setEmail] = useState("")

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

      const register_publisher = await  axios.post(`http://127.0.0.1:8000/app/publishers/register/`, formData, {withCredentials:true})

  }

  return (
    <div>
      <form>
        <label>Name</label>
        <input placeholder='Enter publisher name' value={name} onChange={(e) => setName(e.target.value)}></input>

        <label>Upload Logo</label>
        <input type="file" id="fileInput"></input>

        <label>Website URL</label>
        <input placeholder='Enter the URL to your website' value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)}></input>

        <label>username</label>
        <input placeholder='Enter a username' value={username} onChange={(e) => setUsername(e.target.value)}></input>

        <label>password</label>
        <input placeholder='Enter a password' value={password} onChange={(e) => setPassword(e.target.value)}></input>

        <label>confirm password</label>
        <input placeholder='Re-enter your password' value={cPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>

        <label>email</label>
        <input placeholder='Enter an email address' value={email} onChange={(e) => setEmail(e.target.value)}></input>

        <button onClick={handleFormSubmit} type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Register_Publisher