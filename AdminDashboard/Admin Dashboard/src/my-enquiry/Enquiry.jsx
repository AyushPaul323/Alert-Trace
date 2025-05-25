import React, { useEffect, useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Enquiry.css';

export default function Enquiry() {
    const [enquiry, setEnquiry] = useState([]);
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);
    const [checkboxValues, setCheckboxValues] = useState({
        policeService: false,
        hospitalService: false,
        rescueTeamService: false
    });
    const [alertSent, setAlertSent] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3001/getEnquiry')
            .then(response => setEnquiry(response.data))
            .catch(error => console.log(error));
    }, []);

    const handleAlert = (selectedEnquiry) => {
        setSelectedEnquiry(selectedEnquiry);
    };

    const closeModal = () => {
        setSelectedEnquiry(null);
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckboxValues({
            ...checkboxValues,
            [name]: checked
        });
    };

    const handleSendAlert = () => {
        // Check if at least one checkbox is checked
        if (Object.values(checkboxValues).some(value => value)) {
            // Perform actions to send the alert
            setAlertSent(true);
            setTimeout(() => {
                setAlertSent(false);
            }, 3000); // Hide the alert message after 3 seconds
        } else {
            // Display an error message if no checkbox is checked
            alert('Please select at least one service.');
        }
    };

    return (
        <div className={`w-100 vh-100 d-flex justify-content-center align-items-center ${selectedEnquiry ? 'modal-blur' : ''}`}>
            <div className="w-60">
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Location</th>
                                <th>Problem Type</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enquiry.map(enquiry => (
                                <tr key={enquiry._id}>
                                    <td>{enquiry.name}</td>
                                    <td>{enquiry.phone}</td>
                                    <td>{enquiry.location}</td>
                                    <td>{enquiry.problemType}</td>
                                    <td>{enquiry.description}</td>
                                    <td>
                                        <button
                                            className="a11"
                                            onClick={() => handleAlert(enquiry)}
                                        >
                                            Alert
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {selectedEnquiry && (
                <div className="modal-container">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>Information</h2>
                        <p><strong>Name:</strong> {selectedEnquiry.name}</p>
                        <p><strong>Phone:</strong> {selectedEnquiry.phone}</p>
                        <p><strong>Problem Type:</strong> {selectedEnquiry.problemType}</p>
                        <div>
                            <input type="checkbox" id="policeService" name="policeService" onChange={handleCheckboxChange} />
                            <label htmlFor="policeService">Police Service</label>
                            <input type="checkbox" id="hospitalService" name="hospitalService" onChange={handleCheckboxChange} style={{ marginLeft: '10px' }} />
                            <label htmlFor="hospitalService">Hospital Service</label>
                            <input type="checkbox" id="rescueTeamService" name="rescueTeamService" onChange={handleCheckboxChange} style={{ marginLeft: '10px' }} />
                            <label htmlFor="rescueTeamService">Rescue Team Service</label>
                        </div>
                        <button className="btn btn-success btn" onClick={handleSendAlert} disabled={!Object.values(checkboxValues).some(value => value)}>
                            Send Alert
                        </button>
                        {alertSent && (
                            <div className=" alert-success mt-3" role="alert">
                                Your response has been generated and services are on high alert.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
