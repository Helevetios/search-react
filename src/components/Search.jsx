import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Search() {
    const URL = 'https://jsonplaceholder.typicode.com/users';
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');

    const data = !search ? users : users.filter((item) => item.name.toLowerCase().includes(search.toLocaleLowerCase()))

    async function getUsers() {
        await axios.get(URL).then((response) => {
            setUsers(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    function handleSearch(e) {
        const value = e.target.value;
        setSearch(value);
    }

    useEffect(() => {
        getUsers();
    }, [])


    return (
        <div>
            <div>
                <input value={search} onChange={handleSearch} className='form-control mt-3' placeholder='Search by name' type="text" />
            </div>
            <table className='table table-striped table-hover mt-5 shadow-lg'>
                <thead>
                    <tr className='bg-primary'>
                        <th>Name</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Search