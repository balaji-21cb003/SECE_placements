import React, { useState } from 'react';

function CertificationForm() {
  const [certifications, setCertifications] = useState([{ name: '', authority: '', year: '' }]);
  const [internships, setInternships] = useState([{ company: '', position: '', year: '' }]);

  const handleCertificationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCertifications = [...certifications];
    updatedCertifications[index][name] = value;
    setCertifications(updatedCertifications);
  };

  const handleInternshipChange = (index, e) => {
    const { name, value } = e.target;
    const updatedInternships = [...internships];
    updatedInternships[index][name] = value;
    setInternships(updatedInternships);
  };

  const addCertification = () => {
    setCertifications([...certifications, { name: '', authority: '', year: '' }]);
  };

  const addInternship = () => {
    setInternships([...internships, { company: '', position: '', year: '' }]);
  };

  return (
    <div>
      <h2>Certifications</h2>
      {certifications.map((certification, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Certification Name"
            name="name"
            value={certification.name}
            onChange={(e) => handleCertificationChange(index, e)}
          />
          <input
            type="text"
            placeholder="Authority"
            name="authority"
            value={certification.authority}
            onChange={(e) => handleCertificationChange(index, e)}
          />
          <input
            type="text"
            placeholder="Year"
            name="year"
            value={certification.year}
            onChange={(e) => handleCertificationChange(index, e)}
          />
        </div>
      ))}
      <button onClick={addCertification}>Add Certification</button>

      <h2>Internships</h2>
      {internships.map((internship, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={internship.company}
            onChange={(e) => handleInternshipChange(index, e)}
          />
          <input
            type="text"
            placeholder="Position"
            name="position"
            value={internship.position}
            onChange={(e) => handleInternshipChange(index, e)}
          />
          <input
            type="text"
            placeholder="Year"
            name="year"
            value={internship.year}
            onChange={(e) => handleInternshipChange(index, e)}
          />
        </div>
      ))}
      <button onClick={addInternship}>Add Internship</button>
    </div>
  );
}

export default CertificationForm;
