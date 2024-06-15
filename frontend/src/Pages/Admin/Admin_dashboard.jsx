import React from 'react'
import Admin_image from '../Images/adminn.jpg'
import { useNavigate } from 'react-router-dom'
const Admin_dashboard = () => {
  const navigate=useNavigate();
  return (
    <div>
      <img src={Admin_image} alt='error' className='w-100 img_height' />
      <div className='w-100 d-flex flex-column gap-5 justify-content-center align-items-center p-4' style={{marginTop:'5rem'}}>
      <button  class="btn btn-primary btn-lg width" onClick={()=>navigate('/admin/dashboard/uploadfile')}
              style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}>Upload File</button>
            <button  class="btn btn-primary btn-lg width" onClick={()=>navigate('/login')}
              style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}>Logout</button>
      </div>
    </div>
  )
}

export default Admin_dashboard
