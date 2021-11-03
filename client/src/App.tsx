import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './components/Form';
import Header from './components/Header';
import Footer from './components/Footer';
import AlertResult from './components/AlertResult';
import Member from './components/Member';
import { API_URL } from './config/config';

interface IMember {
    _id: string;
    name: string;
}

const App = () => {
    const [members, setMembers] = useState<IMember[]>([]); // all data
    const [alertSuccess, setAlertSuccess] = useState(''); // alert success message
    const [alertError, setAlertError] = useState(''); // alert error message
    const [name, setName] = useState(''); // input content
    const [timeoutID, setTimeoutID] = useState<NodeJS.Timeout | null>(null); // error timeout

    // Get all members
    useEffect(() => {
        axios
            .get(`${API_URL}/api/member`)
            .then((res) => setMembers(res.data))
            .catch((err) => console.log(err));
    }, []);

    // Submit member
    const handleSubmit = (e: HTMLFormElement) => {
        e.preventDefault();
        axios
            .put(`${API_URL}/api/member`, { name })
            .then((res) => {
                if (res.data.errors) {
                    setAlertError(res.data.errors);
                    setAlertSuccess('');
                } else {
                    setMembers((members) => [...members, res.data.member]);
                    setAlertSuccess(`${name} a été ajouté au voyage !`);
                    setAlertError('');
                }

                timeoutID && clearTimeout(timeoutID);

                setTimeoutID(
                    setTimeout(() => {
                        setAlertError('');
                        setAlertSuccess('');
                    }, 3000)
                );
            })
            .catch((err) => console.log(err));

        setName('');
    };

    // Delete member
    const handleDeleteMember = (id: string, name: string) => {
        axios
            .delete(`${API_URL}/api/member/${id}`, { data: { name } })
            .then((res) => {
                setAlertSuccess(`${res.data.name} a été supprimé du voyage !`);
                setAlertError('');
                setMembers((m) => m.filter((m) => m._id !== id));

                timeoutID && clearTimeout(timeoutID);

                setTimeout(() => {
                    setAlertSuccess('');
                }, 3000);
            })
            .catch((err) => console.log(err));
    };
    return (
        <>
            <Header />
            <main className="main">
                <div className="main__content">
                    <h1>Ajouter un(e) Argonaute</h1>

                    {/* FORM */}
                    <Form handleSubmit={handleSubmit} name={name} setName={setName} />

                    {/* ALERT MESSAGE */}
                    {alertSuccess || alertError ? (
                        <AlertResult alertSuccess={alertSuccess} alertError={alertError} />
                    ) : null}

                    {/* MEMBERS LIST */}
                    <ul className="main__content__members">
                        {Array.isArray(members) &&
                            members?.length > 0 &&
                            members.map((member) => {
                                return (
                                    <Member
                                        key={member._id}
                                        name={member.name}
                                        deleteMember={() =>
                                            handleDeleteMember(member._id, member.name)
                                        }
                                    />
                                );
                            })}
                    </ul>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default App;
