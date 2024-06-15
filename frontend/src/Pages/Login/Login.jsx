import React, { useState } from 'react'
import '../CSS/CSS.css'
import '../CSS/Responsive.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { LoginId, Parentcnic } from '../Redux Toolkit/Slice'
const Login = () => {
var dispatch=useDispatch();
  var navigate=useNavigate();
//state used to store input values
const [Inputvalues,setInputvalues]=useState({
    name:'',
    cnic:''
})
//module used to get input values
const handleChange=(e)=>{
    const {name,value}=e.target;
    setInputvalues(()=>({...Inputvalues,[name]:value}));
}
//module use store input values in backend
const handleSubmit=async(e)=>{
e.preventDefault();
const response=await axios.post(`${window.location.origin}/login`,Inputvalues);
if(Inputvalues.cnic.length>13)
  {
    alert(`password must contain 13 digits only ,${response.data}`)
  }

else if(response.data.message==='student dashboard')
    {
        navigate('/student/dashboard');
        dispatch(LoginId(response.data.studentId));
      }
    else if(response.data.message==='parent dashboard')
        {
          navigate('/parent/dashboard')
dispatch(Parentcnic(Inputvalues.cnic));
        }
        else if(response.data.message==='admin dashboard')
            {
              navigate('/admin/dashboard')
            }
    else if(response.data.message==='invalid cnic or username'){
        alert("invalid cnic or username")
    }
}
    return (
    <div>
        <section class=" login_center">
  <div class="container-fluid h-custom">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          class="img-fluid" alt="Sample image" />
      </div>
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form className='mt-lg-5 mt-md-2 mt-sm-0' onSubmit={handleSubmit}>
        <div data-mdb-input-init class="form-outline mb-4 txt-color">
        <label className='fw-bold fs-2'>Login</label><br />
<label>login your account in seconds</label>
</div>
          <div data-mdb-input-init class="form-outline mb-4">
            <input type="text"  class="form-control form-control-lg" onChange={handleChange}
              placeholder="Username" autoComplete='on' name='name'  />
            </div>
          <div data-mdb-input-init class="form-outline ">
            <input type="password" class="form-control form-control-lg" autoComplete='on'
              placeholder="Enter CNIC" name='cnic' onChange={handleChange} />
          </div>
          <div class="text-center text-lg-start mt-4 pt-2">
            <button  type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg w-100"
              style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}>Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}
export default Login
