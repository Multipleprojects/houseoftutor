import axios from 'axios'; // Importing axios for making HTTP requests
import React, { useEffect, useState } from 'react'; // Importing React hooks
import { useSelector } from 'react-redux'; // Importing useSelector hook from react-redux
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook from react-router-dom
const Student_todayclass = () => {
  const navigate = useNavigate(); // Initializing the navigate function using useNavigate
  const regNumber = useSelector((state) => state.tutor.reg_number); // Accessing reg_number from Redux store
  const Loginid = useSelector((state) => state.tutor.loginid);
  const [schedule, setSchedule] = useState([]); // Initializing schedule state variable using useState
  const currentDate = new Date();
  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentDay = daysOfWeek[currentDate.getDay()];
  const timeValidate = [
    '9:00am to 10:00am', '10:00am to 11:00am', '11:00am to 12:00pm',
    '12:00pm to 1:00pm', '1:00pm to 2:00pm', '2:00pm to 3:00pm', '3:00pm to 4:00pm'
  ];
  // useEffect hook to fetch data when component mounts
  const fetchData = async () => {
    try {
      const responsetutor = await axios.get(`${window.location.origin}/tutor`);
      const filteredValues = [];

      responsetutor.data.forEach((tutor) => {
        if (tutor.studentdetail._id === Loginid) {
          if (tutor.status === '0') {
            const todayClasses = tutor.tutordetail.schedule.filter(classItem => classItem.day === currentDay);
            filteredValues.push({ ...tutor, todayClasses });
          }
        }
      });

      setSchedule(filteredValues); // Update state with filtered values
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sortScheduleByTime = (a, b) => {
    return timeValidate.indexOf(a.time) - timeValidate.indexOf(b.time);
  };

  return (
    <div className='course_back p-3'>
      <div className='rounded border border-light p-4 ' style={{ backgroundColor: 'white' }}>
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
                entry.todayClasses && entry.todayClasses.length > 0 && entry.todayClasses
                  .sort(sortScheduleByTime)
                  .map((classItem, innerIndex) => (
                    <tr key={index + innerIndex}>
                      {innerIndex === 0 && ( // Display course only once
                        <td className='text-center' rowSpan={entry.todayClasses.length}>
                          {entry.tutordetail.course}
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
          onClick={() => navigate('/student/dashboard')}
          style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
        >
          Dashboard
        </button>
      </div>
    </div>
  );
};
export default Student_todayclass;
