import React, { useEffect, useState } from 'react'
import api from '../services/api'

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoding] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        customerName: '',
        email: '',
        phone: '',
        totalAmount: ''
    })

    const fetchOrders = async () => {
        setLoding(true);
        setError(null);

        try {
            const response = await api.get('/orders');
            setOrders(response.data.data);
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
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post('/orders', formData);

            setFormData({
                customerName: '',
                email: '',
                phone: '',
                totalAmount: ''
            })

            fetchOrders();
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow-lg p-6">

                <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <i className="bi bi-cart-fill text-orange-600"></i>
                    จัดการคำสั่งซื้อ
                </h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <input
                        type="text"
                        name='customerName'
                        value={formData.customerName}
                        onChange={handleChange}
                        placeholder='Your Name'
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <input
                        type="email"
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='Your Email'
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <input
                        type="tel"
                        name='phone'
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder='Your Phone'
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <input
                        type="number"
                        name='totalAmount'
                        value={formData.totalAmount}
                        onChange={handleChange}
                        placeholder='Total Amount'
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />

                    <button
                        type='submit'
                        className="md:col-span-2 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-semibold transition"
                    >
                        Sent Data
                    </button>
                </form>

                {loading && <p className="text-center text-gray-500">Loading....</p>}
                {error && <p className="text-center text-red-600">{error}</p>}

                {!loading && !error && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border rounded-lg overflow-hidden">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border px-4 py-2">ชื่อลูกค้า</th>
                                    <th className="border px-4 py-2">อีเมล</th>
                                    <th className="border px-4 py-2">เบอร์โทร</th>
                                    <th className="border px-4 py-2">ราคารวม</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr
                                        key={order.id}
                                        className="hover:bg-gray-50 transition"
                                    >
                                        <td className='border px-4 py-2'>{order.customerName}</td>
                                        <td className='border px-4 py-2'>{order.email}</td>
                                        <td className='border px-4 py-2'>{order.phone}</td>
                                        <td className='border px-4 py-2'>{order.totalAmount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-6">
                    <p className="text-gray-700 flex items-center gap-2">
                        <i className="bi bi-info-circle-fill text-orange-600"></i>
                        หน้านี้จะใช้สำหรับแสดงและจัดการคำสั่งซื้อทั้งหมด
                    </p>
                    <p className="text-gray-600 text-sm mt-2 ml-6">
                        (ในส่วนของ Part 2 เราจะเพิ่มการเชื่อมต่อกับ API)
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Orders
