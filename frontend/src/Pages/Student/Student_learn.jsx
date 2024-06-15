import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import Search_tutor from './Search_tutor';
import { Searchtutor } from '../Redux Toolkit/Slice';
const Student_learn = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const coursename = useSelector((state) => state.tutor.coursename);
  const [inputValues, setInputValues] = useState({
    day: '',
    time: ''
  });
  const Navigate=()=>{
dispatch(Searchtutor(inputValues));
    navigate('/student/dashboard/searchtutor');
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  return (
    <div className='course_back p-3'>
      <div className='rounded p-4' style={{ backgroundColor: 'white' }}>
        <div style={{ marginLeft: '6rem', marginRight: '6rem' }}>
          <p className='txt-color fs-3 fw-bold'>Course name</p>
          <p className='border border-primary p-2 rounded'>{coursename.course_title}</p>
          <p className='txt-color fs-2 fw-bold'>Optional:</p>
          <p className='txt-color fs-3 fw-bold'>Select Schedule</p>
          <select name='day' onChange={handleChange} required className='w-100 p-2 rounded border border-primary'>
            <option>Select day</option>
            <option value='monday'>Monday</option>
            <option value='tuesday'>Tuesday</option>
            <option value='wednesday'>Wednesday</option>
            <option value='thursday'>Thursday</option>
            <option value='friday'>Friday</option>
            <option value='saturday'>Saturday</option>
            <option value='sunday'>Sunday</option>
          </select>
          <select
            className='w-100 mt-5 p-2 rounded border border-primary'
            required
            name='time'
            onChange={handleChange}
          >
            <option>Select time</option>
            <option value='9:00am to 10:00am'>9:00am to 10:00am</option>
            <option value='10:00am to 11:00am'>10:00am to 11:00am</option>
            <option value='11:00am to 12:00pm'>11:00am to 12:00pm</option>
            <option value='12:00pm to 1:00pm'>12:00pm to 1:00pm</option>
            <option value='1:00pm to 2:00pm'>1:00pm to 2:00pm</option>
            <option value='2:00pm to 3:00pm'>2:00pm to 3:00pm</option>
          </select>
          <div className='mt-3 text-center'>
            <button
              type='button'
              className='btn btn-primary mt-4 text-center width'
              style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
              onClick={Navigate}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div style={{ float: 'right' }} className='d-flex gap-2'>
        <button
          type='button'
          className='btn btn-light mt-2'
          onClick={() => navigate('/student/dashboard/course/detail')}
          style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
        >
          Back
        </button>
        <button
          type='button'
          className='btn btn-light mt-2'
          onClick={() => navigate('/student/dashboard')}
          style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
        >
          Dashboard
        </button>
      </div>
    </div>
  );
};
export default Student_learn;
