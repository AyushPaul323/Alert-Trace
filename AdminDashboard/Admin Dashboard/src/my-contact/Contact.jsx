import { useEffect, useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Contact() {
    const [contact, setContact] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/getContact') // Corrected URL
            .then(response => setContact(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
            <div className="w-50">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contact.map(contact => (
                            <tr key={contact._id}>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
