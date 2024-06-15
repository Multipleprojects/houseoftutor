import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
const Tutor_schedule = () => {
  const Loginid = useSelector((state) => state.tutor.loginid);
  const [Schedule,setSchedule]=useState('');
  const navigate=useNavigate();
  const coursename=useSelector((state)=>state.tutor.coursename);
  const reg_number=useSelector((state)=>state.tutor.reg_number);
  const excelid=useSelector((state)=>state.tutor.loginid);
  const [Inputvalues,setInputvalues]=useState({
    course:coursename.course_title, 
    day:'select day',
     time:'select time', 
     reg_number:reg_number,
     rating:coursename.rating,
     grade:coursename.grade,
     studentId:excelid
    })
    useEffect(() => {
      const fetchData = async () => {
        try {
          
          const response = await axios.get(`${window.location.origin}/schedule`);
          setSchedule(response.data);
        } catch (error) {
          console.error('Error fetching schedule:', error);
        }
      };
      fetchData();
    }, []);
    const handleChange=(e)=>{
        const {name,value}=e.target;
    setInputvalues(()=>({...Inputvalues,[name]:value}))
    }
        const handleSubmit = async (e) => {
            e.preventDefault();
   
            try {
            // Check if day or time is not selected
        if (Inputvalues.day === 'select day') {
          alert("Please select a day");
          return; // Exit function if day is not selected
      }

      if (Inputvalues.time === 'select time') {
          alert("Please select a time");
          return; // Exit function if time is not selected
      }
              const response = await axios.post(`${window.location.origin}/schedule`, Inputvalues);
           if (response.data.message.includes('Schedule conflict')) {
                    alert(response.data.message);
                } else if (response.data.message.includes('required fields')) {
                    alert('Both day and time are required fields');
                } else if (response.data.message.includes('Day and time added') || response.data.message.includes('New schedule entry created')) {
                    navigate('/tutor/dashboard/course/detail');
                    alert(response.data.message); // Log response from the server  
                } else {
                    alert(response.data.message); // Log response from the server
                }
          
            } catch (error) {
                console.error("Error:", error);
            }
          }
        
      
    const sortDays = (a, b) => {
      const daysOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      return daysOrder.indexOf(a) - daysOrder.indexOf(b);
    };
    return (
    <div className='course_back p-3 scrollbar_tutorschedule'>
        <div className='schedule_center p-4' style={{backgroundColor:'white'}}>      
            <form className='d-flex flex-column gap-3' onSubmit={handleSubmit}>
               <div>
                <p className='txt-color fs-3 fw-bold'>Course name</p>
<p className='border border-primary p-2  rounded'>{coursename.course_title}</p>
</div>
<div>
<p className='txt-color fs-3 fw-bold'>Create schedule</p>
<select name='day' onChange={handleChange} required className='w-100 p-2 rounded border border-primary'>
    <option>Select day</option>
    <option value="monday">monday</option>
    <option value="tuesday">tuesday</option>
    <option value="wednesday">wednesday</option>
    <option value="thursday">thursday</option>
    <option value="friday">friday</option>
    <option value="saturday">saturday</option>
    <option value="sunday">sunday</option>
    </select>
  <select  className='w-100 mt-5 p-2 rounded border border-primary' required name='time' onChange={handleChange}>
    <option>Select time</option>
    <option value="9:00am to 10:00am">9:00am to 10:00am</option>
    <option value="10:00am to 11:00am">10:00am to 11:00am</option>
    <option value="11:00am to 12:00pm">11:00am to 12:00pm</option>
    <option value="12:00pm to 1:00pm">12:00pm to 1:00pm</option>
    <option value="1:00pm to 2:00pm">1:00pm to 2:00pm</option>
    <option value="2:00pm to 3:00pm">2:00pm to 3:00pm</option>
  </select>
  </div>
  <button 
                    type="submit"  
                    className="btn btn-primary  mt-4 text-center"
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', }}
                    
                >
                    Submit
                </button>
  </form> 
  <hr />
  <div >
                <p className='txt-color fs-3 fw-bold'>Already Created Schedule Here</p>
                <div className='rounded  ' style={{backgroundColor:'white'}}>
                <div className='scrollable-schedule'>
               
          <table className="table border-default table-hover ">
            <thead>
              <tr>
                <th>Course name</th>
                <th className='text-center'>Day</th>
                <th className='text-center'>Time</th>
              </tr>
            </thead>
            <tbody style={{ color: 'white' }} className='rounded p-2'>
            {Schedule && Schedule.map(val => (
   (
    val.studentId && val.studentId._id === Loginid &&
    <>
      {val.schedule
        .sort((a, b) => sortDays(a.day.toLowerCase(), b.day.toLowerCase())) // Sort days
        .map((day,index) => (
          <tr key={index}>
           <td>{val.course}</td>
            <td className='text-center'>{day.day}</td>
            <td className='text-center'>{day.time}</td>
          </tr>
        ))}
    </>
  )
))} 
</tbody>
          </table>
        </div>
            </div>
            </div>
           </div>
           <div style={{ float: 'right' }} className='d-flex gap-2'>
<button
          type="submit"
          className="btn btn-light mt-2" onClick={()=>navigate('/tutor/dashboard/course/detail')}
          style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
        >
          Back
        </button>
        <button
          type="submit"
          className="btn btn-light mt-2 " onClick={()=>navigate('/tutor/dashboard')}
          style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
        >
          Dashboard
        </button>
      </div>
    </div>
  )
}
export default Tutor_schedule