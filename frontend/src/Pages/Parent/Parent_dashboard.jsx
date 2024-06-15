import React from 'react'
import student_image from '../Images/STUDENTS.png'
import { useNavigate } from 'react-router-dom'
import { FaArrowCircleRight } from "react-icons/fa";
import parent from '../Images/parent.jpg'
const Parent_dashoard = () => {
 const navigate=useNavigate();
  return (
    <div>
      <img src={parent} alt='error' style={{width:'100%'}} />
      <div style={{float:'right'}}>
        <p className='txt-color fw-bold p-3 fs-5 cursor' onClick={()=>navigate('/tutor/dashboard')}>Switch tutor <span><FaArrowCircleRight className='fs-2' style={{marginLeft:'0.3rem'}} /></span></p>
      </div>
      <div className='w-100 d-flex flex-column gap-5 justify-content-center align-items-center ' style={{marginTop:'5rem'}}>
      <button  class="btn btn-primary btn-lg width" onClick={()=>navigate('/parent/dashboard/childname')}
              style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}>Child Detail</button>
            <button  class="btn btn-primary btn-lg width" onClick={()=>navigate('/login')}
              style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}>Logout</button>
      </div>
    </div>
  
  )
}

export default Parent_dashoard
