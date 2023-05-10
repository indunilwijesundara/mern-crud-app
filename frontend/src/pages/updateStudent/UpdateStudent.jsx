import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Calendar } from "react-calendar";
import { useNavigate, useParams } from "react-router-dom";
import "./updateStudent.css";

export const UpdateStudent = () => {
  const [name, setName] = useState("");
  const [contactnumber, setContactnumber] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [calDate, setCalDate] = useState(new Date());
  const params = useParams();
  const navigate = useNavigate();
  const [student, setStudents] = useState("");
  useEffect(() => {
    getStudents();
  });
  function getStudents() {
    axios
      .get(`http://localhost:8800/api/students/get/${params.id}`)
      .then((res) => {
        setStudents({
          //   name: res.data.student.name,
          //   contactnumber: res.data.student.contactnumber,
          //   address: res.data.student.address,
          //   gender: res.data.student.gender,
          //   dob: res.data.student.dob,
        });
      })
      .catch((err) => {
        alert(err);
      });
  }

  function sendData(e) {
    e.preventDefault();

    const newStudent = {
      name,
      contactnumber,
      address,
      gender,
      dob,
    };
    console.log(newStudent);
    console.log(params.id);
    axios
      .put(`http://localhost:8800/api/students/update/${params.id}`, newStudent)
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

  return (
    <div className="containerdiv">
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div>
          <h5 style={{ textAlign: "center" }}>Update Student here...</h5>
        </div>

        <div className="homediv">
          <form onSubmit={sendData} className="formcontainer">
            <div class="mb-3">
              <label for="name">Student Name</label>
              <input
                type="text"
                class="form-control"
                id="fullname"
                placeholder="Enter Student Name"
                value={student.name}
                onChange={(e) => {
                  setName(e.target.value);
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
                value={student.contactnumber}
              />
            </div>
            <div class="mb-3">
              <label for="address">Address</label>
              <input
                type="text"
                class="form-control"
                id="address"
                placeholder="Enter Address"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                value={student.address}
              />
            </div>

            <div class="mb-3">
              <label for="gender">Select Student Gender</label>
              <select
                onChange={(e) => {
                  setGender(e.target.value);
                }}
                class="form-control"
                value={student.gender}
              >
                <option value="none" selected disabled hidden>
                  Select an Option
                </option>
                <option value="Male" class="form-control">
                  Male
                </option>
                <option value="Female" class="form-control">
                  Female
                </option>
              </select>
            </div>

            <div class="mb-3">
              <label for="dob">Age</label>
              <input
                type="text"
                class="form-control"
                id="dob"
                placeholder="Enter Age"
                onChange={(e) => {
                  setDob(e.target.value);
                }}
                value={student.dob}
              />
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
