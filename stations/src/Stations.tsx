import React, {useEffect} from 'react';
import axios from "axios";
import {Station} from "./lib/models";

const defaultStation: Station = {
    station_number: '',
    name: '',
    location: '',
}

const Stations = () => {
    const [stations, setStations] = React.useState([]);
    const [station, setStation] = React.useState(defaultStation);

    const fetchStations = async () => {
        try {
            const response = await axios.get('http://localhost:3005/station-service/station/');
            console.log(response.data);
            setStations(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStation({
            ...station,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3005/stations-service/create', station);
            setStation(defaultStation);
            fetchStations();
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchStations();
    }, []);

    return (
        <>
            <h1 style={{fontWeight: 'bold'}}>Stations Service</h1>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
            }}>
                <div style={{
                    width: '20%',
                    marginTop: '10px'
                }}>
                    <form style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        maxWidth: '300px',
                    }}
                          onSubmit={handleSubmit}
                    >
                        <input
                            name='station_number'
                            type='number'
                            placeholder='Station number'
                            style={{
                                border: '1px solid black',
                                borderRadius: '3px',
                                padding: '8px',
                                width: '100%'
                            }}
                            min="0"
                            max="100"
                            onChange={handleChange}
                        />
                        <input
                            name='name'
                            type='text'
                            placeholder='Station name'
                            style={{
                                border: '1px solid black',
                                borderRadius: '3px',
                                padding: '8px',
                                width: '100%'
                            }}
                            value={station.name}
                            onChange={handleChange}
                        />
                        <input
                            name='location'
                            type='text'
                            placeholder='Location name'
                            style={{
                                border: '1px solid black',
                                borderRadius: '3px',
                                padding: '8px',
                                width: '100%'
                            }}
                            value={station.location}
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
                            Add Station
                        </button>
                    </form>
                </div>
                <ul style={{listStyle: 'none'}}>
                    <p>Stations:</p>
                    {stations.map((station: any, index) => (
                        <li key={index} style={{marginBottom: '5px'}}>
                            <span style={{marginRight: '5px'}}>•</span>
                            {station}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Stations;