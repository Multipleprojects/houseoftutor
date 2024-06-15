import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { Studentreqdetail } from '../Redux Toolkit/Slice';
const Search_tutor = () => {
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const loginid = useSelector((state) => state.tutor.loginid);
    const Searchtutor_schedule = useSelector((state) => state.tutor.searchtutor);
    const coursename = useSelector((state) => state.tutor.coursename.course_title);
    const [show, setShow] = useState(false);
   const [Tutorschedule,setTutorschedule]=useState('')
   const [Tutor,getTutor]=useState([]);
   const handleClose = () => setShow(false);
    //Get method schedule data
    const fetchdata = async () => {
        try {
            const responseschedule = await axios.get(`${window.location.origin}/schedule`);
            const responsetutor = await axios.get(`${window.location.origin}/tutor`);
            const tutor=responsetutor.data;
            const schedule=responseschedule.data;
            const filteredSchedule = schedule.filter(sch => sch.course === coursename);
            if (tutor.length === 0) {
                // If tutor array is empty, update Tutor state with filtered schedule data
                getTutor(filteredSchedule);
              } else {
            filteredSchedule.map((sch)=>{
    tutor.map((tut)=>{
        if(sch._id===tut.tutordetail._id){
            if(tut.status==='2' && tut.tutordetail.course===coursename)
                {
                    getTutor((prevTutors) => [...prevTutors, sch]);
                }
        }
        else{
                    getTutor((prevTutors) => [...prevTutors, sch]);
                
             }
    })
})
              }
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };
    useEffect(() => {
        fetchdata();
    }, []);
    const Navigate = async (val) => {
        dispatch(Studentreqdetail({tutordetail:val,studentloginid:loginid}));
        navigate('/student/dashboard/course/duration')       
    };
    const Tutor_schedule=(val)=>{
        setShow(true);
        setTutorschedule(val);
    }
    console.log(Tutor)
let noScheduleFound = true;
    // Set to keep track of displayed tutor IDs
    const displayedTutors = new Set();
    return (
        <div className='course_back p-4'>
            <div className='d-flex justify-content-between rounded mb-2' style={{ backgroundColor: 'white' }}>
                <p className='fw-bold fs-5' style={{ paddingLeft: '1rem', marginTop: '0.5rem' }}>Course name</p>
                <p className='fw-bold' style={{ paddingRight: '1rem', marginTop: '0.5rem' }}>{coursename}</p>
            </div>
            <div className='scrollable_search_tutor'>
                {Tutor && Tutor.map((val) => {
                    if (val.studentId && val.studentId._id !== loginid) {
                        // Filter the schedules that match the search criteria and sort them
                        const matchingAndSortedSchedules = val.schedule
                            .filter(schedule =>
                                (Searchtutor_schedule.day === schedule.day && Searchtutor_schedule.time === schedule.time) ||
                                (Searchtutor_schedule.day === '' && Searchtutor_schedule.time === '')
                            )
                            .sort((a, b) => a.grade - b.grade); // Change this line to sort by grade or rating as needed
                        if (matchingAndSortedSchedules.length > 0 && !displayedTutors.has(val.studentId._id)) {
                            displayedTutors.add(val.studentId._id);
                            noScheduleFound = false; // Matching schedule found for at least one tutor
                            return (
                                <div key={val.studentId._id} className='rounded p-4 mb-2' style={{ backgroundColor: 'white' }}>
                                    <div className='d-flex justify-content-between'>
                                        <p>Name</p>
                                        <p>{val.studentId.name}</p>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <p>Grade</p>
                                        <p>{val.grade}</p>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <p>Rating</p>
                                        <p>{val.rating}</p>
                                    </div>
                                    <div className='d-flex gap-2 justify-content-center align-content-center'>
                                    <button
                                            type='button'
                                            className='btn btn-primary mt-4 text-center'
                                            style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                                            onClick={() => Tutor_schedule(val.schedule)}
                                        >
                                            Course schedule
                                        </button>
                                        <button
                                            type='button'
                                            className='btn btn-primary mt-4 text-center'
                                            style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                                            onClick={() => Navigate(val)}
                                        >
                                            Send request
                                        </button>
                                       
                                    </div>
                                </div>
                            );
                        } 
                    }
                  // If no matching schedules found, render a message for this tutor
                  return null; // Skip rendering if conditions are not met
        })}
  {noScheduleFound && <p className='fs-4 fw-bold text-center'>No schedule found</p>}
            </div>
            <div style={{ float: 'right' }} className='d-flex gap-2'>
                <button
                    type='button'
                    className='btn btn-light mt-2'
                    onClick={() => navigate('/student/dashboard/learncourse')}
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
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
{
    Tutorschedule && Tutorschedule.map((val)=>{
        return (
        <div className='d-flex justify-content-between'>
        <p>{val.day}</p>
        <p>{val.time}</p>
        </div>
        )
    })
}
            </Modal.Body>
        
      </Modal>
        </div>
    );
};
export default Search_tutor;