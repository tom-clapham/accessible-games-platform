import React from 'react'
import axios from 'axios';

const Register_Publisher = () => {

  const handleFormSubmit = async () => {
      const fileInput = document.getElementById("fileInput");
      const file = fileInput.files[0];

      const formData = new FormData();
      formData.append("logo", file);

      const register_publisher = await  axios.post(`http://127.0.0.1:8000/app/publishers/register/`, formData, {withCredentials:true})
  }

  return (
    <div>
      <form>
        <label>Name</label>
        <input></input>

        <label>Upload Logo</label>
        <input type="file" id="fileInput"></input>

        <label>Website URL</label>
        <input></input>

        <button onClick={handleFormSubmit} type='submit'>Submit</button>
      </form>
      </div>
  )
}

export default Register_Publisher