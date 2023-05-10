import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Button, Modal, Input } from "react-bootstrap";

function Home() {
  const [show, setShow] = useState(false);

  const [student, setStudents] = useState([]);

  useEffect(() => {
    getStudents();
  }, []);
  function getStudents() {
    axios
      .get("http://localhost:8800/api/students")
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }

  const onDelete = (id) => {
    axios
      .delete(`http://localhost:8800/api/students/delete/${id}`)
      .then((res) => {
        alert("Delete Successfull");
        getStudents();
      });
  };

  return (
    <div class="container ">
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div class="row ">
          <div class="col-sm-3 mt-5 mb-4 text-gred">
            <div className="search">
              <form class="form-inline">
                <input
                  class="form-control mr-sm-2"
                  type="search"
                  placeholder="Search Student"
                  aria-label="Search"
                />
              </form>
            </div>
          </div>
          <div
            class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred"
            style={{ color: "green" }}
          >
            <h2>
              <b>Student Details</b>
            </h2>
          </div>
          <div
            class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred"
            style={{ textAlign: "end" }}
          >
            <Button variant="primary" href={"/addStudent"}>
              Add New Student
            </Button>
          </div>
        </div>
        <div class="row">
          <div class="table-responsive ">
            <table class="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name </th>
                  <th>Last Name </th>
                  <th>National Id</th>
                  <th>Subject</th>
                  <th>Email</th>

                  <th>Date of Birth </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {student.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.fname}</td>
                    <td>{item.lname}</td>
                    <td>{item.nationalId}</td>
                    <td>{item.subjects}</td>
                    <td>{item.email}</td>
                    <td>{new Date(item.dateOfBirth).toLocaleDateString()}</td>

                    <td>
                      <a
                        href={`/updateStudent/${item._id}`}
                        class="edit"
                        title="Edit"
                        data-toggle="tooltip"
                      >
                        <i class="material-icons">&#xE254;</i>
                      </a>
                      <a
                        class="delete"
                        title="Delete"
                        data-toggle="tooltip"
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => onDelete(item._id)}
                      >
                        <i class="material-icons">&#xE872;</i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
}

export default Home;
