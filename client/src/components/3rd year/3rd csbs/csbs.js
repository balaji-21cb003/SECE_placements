import React, { useState, useEffect } from "react";
import Navbar from "../../navbar/navbar";
import axios from "axios";

export default function Csbs() {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");
  const [rollno, setRollno] = useState("");
  const [grade, setGrade] = useState("");
  const [communicationLevel, setCommunicationLevel] = useState("");
  const [mockInterviewLevel, setMockInterviewLevel] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [students, setStudents] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    validateForm();
  }, [
    name,
    year,
    department,
    rollno,
    grade,
    communicationLevel,
    mockInterviewLevel,
  ]);

  useEffect(() => {
    fetchStudentDetails();
  }, [searchQuery]);

  const fetchStudentDetails = async () => {
    try {
      let url = "http://localhost:3001/thirdyear/CSBS";
      if (searchQuery) {
        url += `?search=${searchQuery}`;
      }
      const response = await axios.get(url);
      console.log("data got successfully");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  const validateForm = () => {
    let errors = {};

    // Validation logic here...

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setEditMode(false);
    setEditingStudent(null);
    clearForm(); // Clear form fields when toggling form
  };

  const clearForm = () => {
    setName("");
    setYear("");
    setDepartment("");
    setRollno("");
    setGrade("");
    setCommunicationLevel("");
    setMockInterviewLevel("");
  };

  const handleEdit = (student) => {
    setName(student.name);
    setYear(student.year);
    setDepartment(student.department);
    setRollno(student.rollno);
    setGrade(student.grade);
    setCommunicationLevel(student.communicationLevel);
    setMockInterviewLevel(student.mockInterviewLevel);
    setEditMode(true);
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        name,
        year,
        department,
        rollno,
        grade,
        communicationLevel,
        mockInterviewLevel,
      };

      let response;
      if (editMode && editingStudent) {
        response = await axios.put(
          `http://localhost:3001/thirdyear/CSBS/${editingStudent._id}`,
          formData
        );
      } else {
        // Add new student
        response = await axios.post(
          "http://localhost:3001/thirdyear/CSBS",
          formData
        );
      }

      console.log("Response:", response);
      alert("Student details saved successfully");
      toggleForm();
      fetchStudentDetails();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save student details");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter students based on search term
  const filteredStudents = students.filter(student =>
    (student.name && student.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (student.rollno && student.rollno.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
    (student.year && student.year.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
    (student.department && student.department.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-[#1f2937] w-full h-full">
      <Navbar />
      <div className="bg-[#1f2937]">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <p className="mx-auto max-w-2xl text-3xl flex mt-10 justify-center items-center font-bold tracking-tight text-white sm:text-4xl">
            Search for the student name here!
          </p>
          {/* Search form */}
          <div className="relative isolate overflow-hidden bg-[#1f2937] px-6 py-2 text-center sm:px-16 sm:shadow-sm">
            <label
              className="mx-auto mt-8 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
              htmlFor="search-bar"
            >
              <input
                id="search-bar"
                placeholder="your keyword here"
                name="q"
                value={searchQuery}
                onChange={handleSearchChange}
                className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
                required=""
              />
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 bg-[#225fa7] border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all"
              >
                <div className="flex items-center transition-all opacity-1">
                  <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                    Search
                  </span>
                </div>
              </button>
            </label>
          </div>
        </div>
      </div>
      {/* Add student button and form */}
      <div className="fixed bottom-10 right-10 z-10">
        <button
          onClick={toggleForm}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Student
        </button>
        {showForm && (
          <div className="fixed top-0 left-0 w-screen h-screen bg-gray-700 bg-opacity-75 flex justify-center items-center z-20">
            <div className="bg-white p-4 rounded shadow-lg">
              <h2 className="text-2xl font-bold mb-4">
                {editMode ? "Edit Student" : "Add Student"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Form fields */}
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="text-gray-700 font-bold mb-2"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter name"
                  />
                  {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="year"
                    className="text-gray-700 font-bold mb-2"
                  >
                    Year:
                  </label>
                  <input
                    type="text"
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter year"
                  />
                  {errors.year && <p className="text-red-500">{errors.year}</p>}
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="department"
                    className="text-gray-700 font-bold mb-2"
                  >
                    Department:
                  </label>
                  <input
                    type="text"
                    id="department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter department"
                  />
                  {errors.department && (
                    <p className="text-red-500">{errors.department}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="rollno"
                    className="text-gray-700 font-bold mb-2"
                  >
                    Roll No:
                  </label>
                  <input
                    type="text"
                    id="rollno"
                    value={rollno}
                    onChange={(e) => setRollno(e.target.value)}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter roll number"
                  />
                  {errors.rollno && (
                    <p className="text-red-500">{errors.rollno}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="grade"
                    className="text-gray-700 font-bold mb-2"
                  >
                    Grade:
                  </label>
                  <input
                    type="text"
                    id="grade"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter grade"
                  />
                  {errors.grade && (
                    <p className="text-red-500">{errors.grade}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="communicationLevel"
                    className="text-gray-700 font-bold mb-2"
                  >
                    Communication Level:
                  </label>
                  <input
                    type="text"
                    id="communicationLevel"
                    value={communicationLevel}
                    onChange={(e) => setCommunicationLevel(e.target.value)}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter communication level"
                  />
                  {errors.communicationLevel && (
                    <p className="text-red-500">{errors.communicationLevel}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="mockInterviewLevel"
                    className="text-gray-700 font-bold mb-2"
                  >
                    Mock Interview Level:
                  </label>
                  <input
                    type="text"
                    id="mockInterviewLevel"
                    value={mockInterviewLevel}
                    onChange={(e) => setMockInterviewLevel(e.target.value)}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter mock interview level"
                  />
                  {errors.mockInterviewLevel && (
                    <p className="text-red-500">{errors.mockInterviewLevel}</p>
                  )}
                </div>
                {/* Form buttons */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 ${
                      isFormValid ? "" : "opacity-50 cursor-not-allowed"
                    }`}
                    disabled={!isFormValid}
                  >
                    Save
                  </button>
                  <button
                    onClick={toggleForm}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      {/* Student cards */}
      <div className="flex flex-wrap justify-center p-7">
        {filteredStudents.map((student, index) => (
          <div
            key={student._id}
            className="w-[300px] mb-8 ml-4 mr-4"
            style={{ flex: "0 0 calc(33.333% - 1rem)" }} // Ensure three cards per row
          >
            <div className="bg-white shadow-xl rounded-lg p-6">
              <h3 className="text-center text-2xl text-gray-900 font-medium mb-4">
                {student.name}
              </h3>
              <p className="text-center text-gray-400 text-lg font-semibold mb-4">
                Rollno: {student.rollno}
              </p>
              <div className="border-t border-gray-300 my-4"></div>
              <div className="mb-4">
                <p className="text-gray-600 font-semibold">Department:</p>
                <p>{student.department}</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600 font-semibold">Year:</p>
                <p>{student.year}</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600 font-semibold">Grade:</p>
                <p>{student.grade}</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600 font-semibold">
                  Communication Review:
                </p>
                <p className="overflow-hidden overflow-ellipsis h-20">
                  {student.communicationLevel}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600 font-semibold">
                  Mock Interview Review:
                </p>
                <p>{student.mockInterviewLevel}</p>
              </div>
              <div className="text-center">
                <button
                  onClick={() => handleEdit(student)}
                  className="text-lg text-white bg-blue-500 hover:bg-blue-800 w-[100px] rounded-sm font-semibold focus:outline-none"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
