import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Calendar } from "react-calendar";
import { useNavigate } from "react-router-dom";
import "./addStudent.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

export const AddStudent = () => {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [contactnumber, setContactnumber] = useState("");
  const [subjects, setSubjects] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);

  const navigate = useNavigate();
  function sendData(e) {
    e.preventDefault();

    const newStudent = {
      fname,
      lname,
      contactnumber,
      subjects,
      nationalId,
      email,
      dateOfBirth,
    };
    console.log(newStudent);
    axios
      .post("http://localhost:8800/api/students/add", newStudent)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err);
      });
  }
  //   function onChange (calDate) {
  //     // change results based on calendar date click
  //     setCalDate(calDate)
  // }
  const CustomInput = ({ value, onClick }) => (
    <div className="input-group">
      <input type="text" className="" value={value} onClick={onClick} />
      <div className="input-group-append">
        <span className="input-group-text">
          <FaCalendarAlt />
        </span>
      </div>
    </div>
  );
  const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return (
    <div className="containerdiv">
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div>
          <h5 style={{ textAlign: "center" }}>Add New Student here...</h5>
        </div>

        <div className="homediv">
          <form onSubmit={sendData} className="formcontainer">
            <div class="mb-3">
              <label for="name">Student First Name</label>
              <input
                type="text"
                class="form-control"
                id="fullname"
                placeholder="Enter Student First Name"
                onChange={(e) => {
                  setFName(e.target.value);
                }}
              />
            </div>
            <div class="mb-3">
              <label for="name">Student Last Name</label>
              <input
                type="text"
                class="form-control"
                id="fullname"
                placeholder="Enter Student Last Name"
                onChange={(e) => {
                  setLName(e.target.value);
                }}
              />
            </div>
            <div class="mb-3">
              <label for="address">Contact Number</label>
              <input
                type="text"
                class="form-control"
                id="address"
                placeholder="Enter Contact Number"
                onChange={(e) => {
                  setContactnumber(e.target.value);
                }}
                pattern="[0-9]{10}"
                title="Contact number must be 10 digits long"
              />
            </div>
            <div class="mb-3">
              <label for="address">National Id</label>
              <input
                type="text"
                class="form-control"
                id="address"
                placeholder="Enter National Id"
                pattern="^[0-9]{9}[vVxX]$"
                onChange={(e) => {
                  setNationalId(e.target.value);
                }}
              />
            </div>
            <div class="mb-3">
              <label for="address">Email</label>
              <input
                type="text"
                class="form-control"
                id="address"
                placeholder="Enter Email"
                onChange={(e) => {
                  if (emailPattern.test(e.target.value)) {
                    setEmail(e.target.value);
                  } else {
                    alert("Invalid email address");
                  }
                }}
              />
            </div>
            <div class="mb-3">
              <label for="gender">Select Subject</label>
              <select
                onChange={(e) => {
                  setSubjects(e.target.value);
                }}
                class="form-control"
              >
                <option value="none" selected disabled hidden>
                  Select an Option
                </option>
                <option value="Mathamatics" class="form-control">
                  Mathamatics
                </option>
                <option value="Science" class="form-control">
                  Science
                </option>
                <option value="Sinhala" class="form-control">
                  Sinhala
                </option>
              </select>
            </div>

            <div class="mb-3">
              <label for="dob">Date of Birth</label>
              <div class="">
                <DatePicker
                  id="date-of-birth"
                  selected={dateOfBirth}
                  onChange={(date) => {
                    setDateOfBirth(date);
                  }}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  customInput={<CustomInput />}
                />
              </div>
            </div>

            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
