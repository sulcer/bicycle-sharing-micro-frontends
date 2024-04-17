import React, {FormEvent, useEffect} from 'react';
import 'tailwindcss/tailwind.css';
import axios from "axios";
import {User} from "./lib/models";

const defaultUser = {
    username: '',
    email: '',
    pin: 1010
}

const Users = () => {
    const [users, setUsers] = React.useState([]);
    const [user, setUser] = React.useState(defaultUser);
    const [search, setSearch] = React.useState('');
    const [requestedUser, setRequestedUser] = React.useState<User | null>(null);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3005/user-service/users');
            setUsers(response.data);
        }catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/users', user);
            setUser(defaultUser);
            fetchUsers();
        } catch (error) {
            console.error(error);
        }
    }

    const findUser = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3005/user-service/users/${search}`);
            setRequestedUser(response.data);
            setSearch('');
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const deleteUser = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3005/user-service/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <h1 style={{fontWeight: 'bold'}}>Users Service</h1>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
            }}>
                <div style={{width: '50%'}}>
                    <table style={{width: '100%', borderCollapse: 'collapse', border: '1px solid black'}}>
                        <thead>
                        <tr>
                            <th style={{border: '1px solid black', padding: '8px'}}>ID</th>
                            <th style={{border: '1px solid black', padding: '8px'}}>Username</th>
                            <th style={{border: '1px solid black', padding: '8px'}}>Email</th>
                            <th style={{border: '1px solid black', padding: '8px'}}>PIN</th>
                            <th style={{border: '1px solid black', padding: '8px'}}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user: User) => (
                            <tr key={user.id}>
                                <td style={{border: '1px solid black', padding: '8px'}}>{user.id}</td>
                                <td style={{border: '1px solid black', padding: '8px'}}>{user.username}</td>
                                <td style={{border: '1px solid black', padding: '8px'}}>{user.email}</td>
                                <td style={{border: '1px solid black', padding: '8px'}}>{user.pin}</td>
                                <td style={{border: '1px solid black', padding: '8px'}}>
                                    <button
                                        style={{
                                            border: '1px solid black',
                                            borderRadius: '3px',
                                            padding: '5px 10px',
                                            width: '100%',
                                            backgroundColor: 'transparent',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => deleteUser(user.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div style={{
                    width: '20%',
                    marginTop: '10px'
                }}>
                    <form style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        maxWidth: '300px',
                        margin: '0 auto'
                    }}
                          onSubmit={handleSubmit}
                    >
                        <input
                            name='username'
                            type='text'
                            placeholder='Username'
                            style={{
                                border: '1px solid black',
                                borderRadius: '3px',
                                padding: '8px',
                                width: '100%'
                            }}
                            value={user.username}
                            onChange={handleChange}
                        />
                        <input
                            name='email'
                            type='email'
                            placeholder='Email'
                            style={{
                                border: '1px solid black',
                                borderRadius: '3px',
                                padding: '8px',
                                width: '100%'
                            }}
                            value={user.email}
                            onChange={handleChange}
                        />
                        <input
                            name='pin'
                            type='number'
                            placeholder='PIN'
                            pattern="\d{4}"
                            min="0"
                            max="9999"
                            style={{
                                border: '1px solid black',
                                borderRadius: '3px',
                                padding: '8px',
                                width: '100%'
                            }}
                            onChange={handleChange}
                        />
                        <button
                            type='submit'
                            style={{
                                border: '1px solid black',
                                borderRadius: '3px',
                                padding: '10px',
                                width: '100%',
                                backgroundColor: 'lightgray',
                                cursor: 'pointer'
                            }}
                        >
                            Add User
                        </button>
                    </form>
                </div>
                <div style={{
                    border: '1px solid black',
                    width: '20%',
                    marginTop: '10px',
                    padding: '10px',
                    borderRadius: '5px'
                }}>
                    <form style={{display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center'}}
                          onSubmit={findUser}>
                        <input
                            type='text'
                            placeholder='Find user'
                            style={{
                                border: '1px solid black',
                                borderRadius: '3px',
                                padding: '8px',
                                width: '50%'
                            }}
                            onChange={(e) => {
                                setSearch(e.target.value)
                            }}
                        />
                        <button
                            type='submit'
                            style={{
                                border: '1px solid black',
                                borderRadius: '3px',
                                padding: '8px',
                                width: '30%',
                                backgroundColor: 'lightgray',
                                cursor: 'pointer'
                            }}
                        >
                            Search
                        </button>
                    </form>
                    {requestedUser && (
                        <div style={{marginTop: '10px'}}>
                            <h2 style={{marginBottom: '5px'}}>User found:</h2>
                            <p><strong>ID:</strong> {requestedUser.id}</p>
                            <p><strong>Username:</strong> {requestedUser.username}</p>
                            <p><strong>Email:</strong> {requestedUser.email}</p>
                            <p><strong>PIN:</strong> {requestedUser.pin}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Users;