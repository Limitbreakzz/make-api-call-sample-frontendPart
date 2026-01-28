import React from 'react'
import { useState, useEffect } from 'react'
import api from '../services/api'

const Members = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoding] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        firstName : '',
        lastName : '',
        email : ''
    });

    const fetchMembers = async () => {
        setLoding(true);
        setError(null);

        try {
            const response = await api.get('/members');
            setMembers(response.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoding(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name] : value
        }))
    }

    // เพิ่มข้อมูล
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post('/members', formData);

            setFormData({
                firstName: '',
                lastName: '',
                email: ''
            })

            fetchMembers();
        } catch (err) {
            console.error(err)
        }
    }

    // เรียกใช้ฟังชั่น
    useEffect(() => {
        fetchMembers();
    }, []);

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-lg p-6">

                    <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <i className="bi bi-people-fill text-blue-600"></i>
                        จัดการข้อมูลสมาชิก
                    </h1>
                    
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <input
                            type="text"
                            name='firstName'
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder='Your FirstName'
                            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            name='lastName'
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder='Your LastName'
                            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="email"
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Your Email'
                            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            type='submit'
                            className="md:col-span-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
                        >
                            Sent Data
                        </button>
                    </form>

                    {loading && <p className="text-center text-gray-500">Loading....</p>}
                    {error && <p className='text-center text-red-600'>{error}</p>}

                    {!loading && !error && (
                        <div className="overflow-x-auto">
                            <table className="min-w-full border rounded-lg overflow-hidden">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border px-4 py-2">ID</th>
                                        <th className="border px-4 py-2">ชื่อ</th>
                                        <th className="border px-4 py-2">นามสกุล</th>
                                        <th className="border px-4 py-2">อีเมล</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {members.map(member => (
                                        <tr
                                            key={member.id}
                                            className="hover:bg-gray-50 transition"
                                        >
                                            <td className='border px-4 py-2'>{member.id}</td>
                                            <td className='border px-4 py-2'>{member.firstName}</td>
                                            <td className='border px-4 py-2'>{member.lastName}</td>
                                            <td className='border px-4 py-2'>{member.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                        <p className="text-gray-700 flex items-center gap-2">
                            <i className="bi bi-info-circle-fill text-blue-600"></i>
                            หน้านี้จะใช้สำหรับแสดงและจัดการข้อมูลสมาชิกทั้งหมด
                        </p>
                        <p className="text-gray-600 text-sm mt-2 ml-6">
                            (ในส่วนของ Part 2 เราจะเพิ่มการเชื่อมต่อกับ API)
                        </p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Members
