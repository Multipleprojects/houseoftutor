import React from 'react'
import student_image from '../Images/STUDENTS.png'
import { useNavigate } from 'react-router-dom'
import { FaArrowCircleRight } from "react-icons/fa";
import { useSelector } from 'react-redux';
import axios from 'axios';
const Student_dashboard = () => {
  var rating;
const Loginid=useSelector((state)=>state.tutor.loginid)
console.log(Loginid);
  const Rating=async()=>{
const response=await axios.put(`${window.location.origin}/tutor/durationcomplete/${Loginid}`,{rating:4});
alert(response.data.message)
}
  const navigate=useNavigate();
  return (
    <div>
      <img src={student_image} alt='error' style={{width:'100%'}} className='img_height' />
      <div style={{float:'right'}}>
        <p className='txt-color fw-bold p-3 fs-5 cursor' onClick={()=>navigate('/tutor/dashboard')}>Switch tutor <span><FaArrowCircleRight className='fs-2' style={{marginLeft:'0.3rem'}} /></span></p>
      </div>
      <div className='w-100 d-flex flex-column gap-5 justify-content-center align-items-center ' style={{marginTop:'5rem'}}>
      <button  class="btn btn-primary btn-lg width" onClick={()=>navigate('/student/dashboard/courses')}
              style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}>Courses</button>
              
          <button  class="btn btn-primary btn-lg width" onClick={()=>navigate('/student/dashboard/todayclass')}
              style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}>Classes today</button>
          <button  class="btn btn-primary btn-lg width" onClick={()=>navigate('/student/dashboard/coursesinprogress')}
              style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}>Courses in progress</button>
            <button  class="btn btn-primary btn-lg width" onClick={()=>navigate('/login')}
              style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}>Logout</button>
            {/* <button  class="btn btn-primary btn-lg width" onClick={Rating}
              style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}>Rating</button> */}

      </div>
    </div>
  
  )
}

export default Student_dashboard
