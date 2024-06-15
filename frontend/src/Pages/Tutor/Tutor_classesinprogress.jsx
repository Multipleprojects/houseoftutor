import axios from 'axios'; // Importing axios for making HTTP requests
import React, { useEffect, useState } from 'react'; // Importing React hooks
import { useSelector } from 'react-redux'; // Importing useSelector hook from react-redux
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook from react-router-dom
const Tutor_classesinprogress = () => {
  const loginId=useSelector((state)=>state.tutor.loginid);
  const navigate = useNavigate(); // Initializing the navigate function using useNavigate
  const regNumber = useSelector((state) => state.tutor.reg_number); // Accessing reg_number from Redux store
  
  const [schedule, setSchedule] = useState([]); // Initializing schedule state variable using useState
  const weekdayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  // useEffect hook to fetch data when component mounts

    const fetchData = async () => {
      try {
        const response = await axios.get(`${window.location.origin}/schedule`);
        const responsetutor=await axios.get(`${window.location.origin}/tutor`)
        const filteredValues = [];
        response.data.forEach((val) => {
          responsetutor.data.forEach((tutor) => {
               if (tutor.tutordetail.studentId === loginId && val.studentId._id===loginId) {
                   if (tutor.status === '0' && tutor.tutordetail.course===val.course) {
          filteredValues.push(val);          
         
        }
               }
           });
       });
       setSchedule(filteredValues); // Update state with filtered values
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };
  
  
    useEffect(() => {
      fetchData();
    }, []);  

  return (
    <div className='course_back p-3'>
      <div className='rounded border border-light p-4 ' style={{backgroundColor:'white'}}>     
        <div className='scrollable-course'>
          <table className='table border-default table-hover'>
            <thead>
              <tr>
                <th scope="col" className='text-center'>Course</th>
                <th scope="col" className='text-center'>Day</th>
                <th scope="col" className='text-center'>Time</th>
              </tr>
            </thead>
            <tbody>
  {schedule && schedule.map((entry, index) => (
    entry.schedule
      // Sort classItem array by day using weekdayOrder
      .sort((a, b) => weekdayOrder.indexOf(a.day) - weekdayOrder.indexOf(b.day))
      .map((classItem, innerIndex) => (
        <tr key={index + innerIndex}>
          {innerIndex === 0 && ( // Display course only once
            <td className='text-center' rowSpan={entry.schedule.length}>
              {entry.course}
            </td>
          )}
          <td className='text-center'>{classItem.day}</td>
          <td className='text-center'>{classItem.time}</td>
        </tr>
      ))
  ))}
</tbody>
          </table>
          </div>
      </div>
      <div style={{ float: 'right' }} className='d-flex gap-2 mt-2'>
        <button
          type="submit"
          className="btn btn-light text-center"
          onClick={() => navigate('/tutor/dashboard')}
          style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
        >
          Dashboard
        </button>
      </div>
    </div>
  );
};
export default Tutor_classesinprogress;
