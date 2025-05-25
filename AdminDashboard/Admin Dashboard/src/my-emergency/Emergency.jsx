// import { useEffect, useState } from "react";
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

// export default function Emergency() {
//     const [emergency, setEmergency] = useState([]);

//     useEffect(() => {
//         axios.get('http://localhost:3001/getEmergency') // Corrected URL
//             .then(response => setEmergency(response.data))
//             .catch(error => console.log(error));
//     }, []);

//     return (
//         <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
//             <div className="w-50">
//                 <table className="table">
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Phone Number</th>
//                             <th>Location</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {emergency.map(emergency => (
//                             <tr key={emergency._id}>
//                                 <td>{emergency.name}</td>
//                                 <td>{emergency.phone}</td>
//                                 <td>{emergency.location}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }


import React, { useEffect, useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Emergency.css';

export default function Emergency() {
    const [emergency, setEmergency] = useState([]);
    const [selectedEmergency, setSelectedEmergency] = useState(null);
    const [alertSent, setAlertSent] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3001/getEmergency')
            .then(response => setEmergency(response.data))
            .catch(error => console.log(error));
    }, []);

    const handleAlert = (selectedEmergency) => {
        setSelectedEmergency(selectedEmergency);
    };

    const closeModal = () => {
        setSelectedEmergency(null);
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckboxValues({
            ...checkboxValues,
            [name]: checked
        });
    };

    const handleSendAlert = () => {
            setAlertSent(true);
            setTimeout(() => {
                setAlertSent(false);
            }, 3000);
    };

    return (
        <div className={`w-100 vh-100 d-flex justify-content-center align-items-center ${selectedEmergency ? 'modal-blur' : ''}`}>
            <div className="w-60">
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Location</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {emergency.map(emergency => (
                                <tr key={emergency._id}>
                                    <td>{emergency.name}</td>
                                    <td>{emergency.phone}</td>
                                    <td>{emergency.location}</td>
                                    <td>
                                        <button
                                            className="a11"
                                            onClick={() => handleAlert(emergency)}
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
            {selectedEmergency && (
                <div className="modal-container">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>Information</h2>
                        <p><strong>Name:</strong> {selectedEmergency.name}</p>
                        <p><strong>Phone:</strong> {selectedEmergency.phone}</p>
                        <p><strong>Location:</strong> {selectedEmergency.location}</p>
                        <button className="btn btn-success btn" onClick={handleSendAlert}>
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
