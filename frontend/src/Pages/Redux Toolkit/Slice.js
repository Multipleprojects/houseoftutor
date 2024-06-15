// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';
// Retrieve the initial state data from local storage if available
const initialState = localStorage.getItem('tutorState')
  ? JSON.parse(localStorage.getItem('tutorState'))
  : {
      loginid: '',
      coursename:'',
      reg_number:'',
      parentcnic:'',
    searchtutor:'',
  studentreqdetail:'' ,
  childid:''
  };
const tutorSlice = createSlice({
  name: 'tutor',
  initialState,
  reducers: {
    LoginId(state, action) {
      state.loginid = action.payload;
      // Update the local storage whenever the state changes
      localStorage.setItem('tutorState', JSON.stringify(state));
    },
    Coursename(state, action) {
        state.coursename = action.payload;
        // Update the local storage whenever the state changes
        localStorage.setItem('tutorState', JSON.stringify(state));
      },
  
    Reg_number(state, action) {
      state.reg_number = action.payload;
      // Update the local storage whenever the state changes
      localStorage.setItem('tutorState', JSON.stringify(state));
    },
    Parentcnic(state, action) {
      state.parentcnic = action.payload;
      // Update the local storage whenever the state changes
      localStorage.setItem('tutorState', JSON.stringify(state));
    },
    Searchtutor(state,action){
      state.searchtutor=action.payload;
    },
    
    Studentreqdetail(state, action) {
      state.studentreqdetail = action.payload;
      // Update the local storage whenever the state changes
      localStorage.setItem('tutorState', JSON.stringify(state));
    },

    Childid(state, action) {
      state.childid = action.payload;
      // Update the local storage whenever the state changes
      localStorage.setItem('tutorState', JSON.stringify(state));
    },
  }
});
export const { LoginId, Coursename, Reg_number, Parentcnic, Searchtutor,Studentreqdetail, Childid } = tutorSlice.actions;
export default tutorSlice.reducer;
