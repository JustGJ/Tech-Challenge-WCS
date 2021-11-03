import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './components/Form';
import Header from './components/Header';
import Footer from './components/Footer';
import { isEmpty } from './components/utils';
import AlertResult from './components/AlertResult';
import Member from './components/Member';
import { API_URL } from './config/config';

const App = () => {
    const [members, setMembers] = useState<any[]>([]); // all data
    const [alertSuccess, setAlertSuccess] = useState(''); // alert success message
    const [alertError, setAlertError] = useState(''); // alert error message
    const [name, setName] = useState(''); // input content

    // Fetch all members
    useEffect(() => {
        const fetchMembers = async () => {
            await axios
                .get(`${API_URL}/api/member`)
                .then((res) => {
                    console.log(res.data);

                    setMembers(res.data);
                })
                .catch((err) => console.log(err));
        };
        fetchMembers();
    }, []);

    // Submit member
    const handleSubmit = (e: HTMLFormElement) => {
        e.preventDefault();
        const newMember = async () => {
            await axios
                .put(`${API_URL}/api/member`, { name })
                .then((res) => {
                    if (res.data.errors) {
                        setAlertError(res.data.errors);
                        setAlertSuccess('');
                    } else {
                        setMembers((old) => [...old, res.data.member]);
                        setAlertSuccess(`${name} a été ajouté`);
                        setAlertError('');
                    }
                    setTimeout(() => {
                        setAlertError('');
                        setAlertSuccess('');
                    }, 3000);
                })
                .catch((err) => console.log(err));
        };
        newMember();
        setName('');
    };

    // Delete member
    const handleDeleteMember = (id: string, name: string) => {
        const deleteMember = async () => {
            await axios.delete(`${API_URL}/api/member/${id}`, { data: { name } }).then((res) => {
                if (res.data.message) {
                    setAlertSuccess(res.data.message);
                    setAlertError('');
                    setMembers((old) => old.filter((m) => m._id !== id));

                    setTimeout(() => {
                        setAlertSuccess('');
                    }, 3000);
                }
            });
        };
        deleteMember();
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
