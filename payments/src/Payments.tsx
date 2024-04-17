import React, {useEffect} from 'react';
import axios from "axios";
import {Payment} from "./lib/models";

const defaultPayment = {
    amount: 0,
    userId: '',
    description: ''
}

const Payments = () => {
    const [payments, setPayments] = React.useState([]);
    const [payment, setPayment] = React.useState(defaultPayment);
    const fetchPayments = async () => {
        try {
            const response = await axios.get('http://localhost:3005/payment-service/getAll');
            setPayments(response.data.payments);
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPayment({
            ...payment,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log(payment)
            await axios.post('http://localhost:3005/payment-service/add', payment);
            setPayment(defaultPayment);
            fetchPayments();
        } catch (error) {
            console.error(error);
        }
    }

    const deletePayment = async (id: string) => {
        try {
            await axios.delete('http://localhost:3005/payment-service/delete', {
                data: {
                    id: id
                }
            });
            fetchPayments();
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        fetchPayments();
    }, []);

    return (
        <>
            <h1 style={{fontWeight: 'bold'}}>Payments Service</h1>
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
                            <th style={{border: '1px solid black', padding: '8px'}}>Amount</th>
                            <th style={{border: '1px solid black', padding: '8px'}}>User ID</th>
                            <th style={{border: '1px solid black', padding: '8px'}}>Created At</th>
                            <th style={{border: '1px solid black', padding: '8px'}}>Description</th>
                            <th style={{border: '1px solid black', padding: '8px'}}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {payments.map((payment: Payment) => (
                            <tr key={payment.id}>
                                <td style={{border: '1px solid black', padding: '8px'}}>{payment.id}</td>
                                <td style={{border: '1px solid black', padding: '8px'}}>{payment.amount}</td>
                                <td style={{border: '1px solid black', padding: '8px'}}>{payment.userId}</td>
                                <td style={{
                                    border: '1px solid black',
                                    padding: '8px'
                                }}>{new Date(payment.createdAt).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                })}</td>
                                <td style={{border: '1px solid black', padding: '8px'}}>{payment.description}</td>
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
                                        onClick={() => deletePayment(payment.id)}
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
                            name='amount'
                            type='number'
                            min='1'
                            max='1000000'
                            placeholder='Amount'
                            style={{
                                border: '1px solid black',
                                borderRadius: '3px',
                                padding: '8px',
                                width: '100%'
                            }}
                            onChange={handleChange}
                        />
                        <input
                            name='description'
                            type='text'
                            placeholder='Description'
                            style={{
                                border: '1px solid black',
                                borderRadius: '3px',
                                padding: '8px',
                                width: '100%'
                            }}
                            value={payment.description}
                            onChange={handleChange}
                        />
                        <input
                            name='userId'
                            type='text'
                            placeholder='User'
                            style={{
                                border: '1px solid black',
                                borderRadius: '3px',
                                padding: '8px',
                                width: '100%'
                            }}
                            value={payment.userId}
                            onChange={handleChange}
                        />
                        <button
                            type='submit'
                            style={{
                                border: '1px solid black',
                                borderRadius: '3px',
                                padding: '8px',
                                width: '100%',
                                backgroundColor: 'lightgray',
                                cursor: 'pointer'
                            }}
                        >
                            Add Payment
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Payments;