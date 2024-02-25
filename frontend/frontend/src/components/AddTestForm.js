import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../assets/styles/style.css';

const AddTestForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');
    const [emails, setEmails] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const test = await axios.post('http://localhost:8000/api/tests/add-test', {
                title,
                description,
                time
            });

            const emailList = emails.split(',').map(email => email.trim());
            
            Promise.all(emailList.map(email => 
                axios.post('http://localhost:8000/api/auth/send-email', {
                    to: email,
                    subject: 'New Test Available',
                    text: `A new test "${title}" has been added: ${description}\n\nTest ID:${test.data._id}\n\nTime Interval: ${time/60} min`
                })
            ))
            .then(() => {
                Swal.fire('Success', 'Emails sent successfully!', 'success')
                .then(() => {
                    window.location = '/tests';
                });
            })
            .catch(error => {
                Swal.fire('Error', 'An error occurred while sending emails', 'error');
            });
        } catch (error) {
            Swal.fire('Error', 'An error occurred while adding the test', 'error');
        }
    };

    return (
        <div className='Add-Problem'>
            <div className="container">
                <div className="form">
                    <header>Add Test</header>
                    <form onSubmit={handleSubmit}>
                        <input
                            className="input"
                            type="text"
                            placeholder="Enter title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            className="input"
                            rows={3}
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <input
                            className="input"
                            type="text"
                            placeholder="Enter time interval"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                        <input
                            className="input"
                            type="text"
                            placeholder="Enter emails (separated by commas)"
                            value={emails}
                            onChange={(e) => setEmails(e.target.value)}
                        />
                        <button className="button" type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTestForm;
