import React, { useEffect, useState } from 'react'
import api from '../services/api'

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoding] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        imageurl: ''
    })

    const fetchProducts = async () => {
        setLoding(true);
        setError(null);

        try {
            const response = await api.get('/products');
            setProducts(response.data.data);
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
            await api.post('/products', formData);

            setFormData({
                name: '',
                description: '',
                price: '',
                stock: '',
                category: '',
                imageUrl: ''
            })

            fetchProducts();
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow-lg p-6">

                <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <i className="bi bi-box-seam-fill text-green-600"></i>
                    จัดการข้อมูลสินค้า
                </h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <input
                        type="text"
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        placeholder='Your Name'
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="text"
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                        placeholder='Description'
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="number"
                        name='price'
                        value={formData.price}
                        onChange={handleChange}
                        placeholder='Price'
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="number"
                        name='stock'
                        value={formData.stock}
                        onChange={handleChange}
                        placeholder='Stock'
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="text"
                        name='category'
                        value={formData.category}
                        onChange={handleChange}
                        placeholder='Category'
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="url"
                        name='imageUrl'
                        value={formData.imageUrl}
                        onChange={handleChange}
                        placeholder='ImageUrl'
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <button
                        type='submit'
                        className="md:col-span-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
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
                                    <th className="border px-4 py-2">ชื่อสินค้า</th>
                                    <th className="border px-4 py-2">คำอธิบาย</th>
                                    <th className="border px-4 py-2">ราคา</th>
                                    <th className="border px-4 py-2">จำนวนสินค้า</th>
                                    <th className="border px-4 py-2">ประเภทสินค้า</th>
                                    <th className="border px-4 py-2">ลิ้งรูปภาพ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr
                                        key={product.id}
                                        className="hover:bg-gray-50 transition"
                                    >
                                        <td className='border px-4 py-2'>{product.name}</td>
                                        <td className='border px-4 py-2'>{product.description}</td>
                                        <td className='border px-4 py-2'>{product.price}</td>
                                        <td className='border px-4 py-2'>{product.stock}</td>
                                        <td className='border px-4 py-2'>{product.category}</td>
                                        <td className='border px-4 py-2 text-blue-600 underline'>
                                            {product.imageUrl}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
                    <p className="text-gray-700 flex items-center gap-2">
                        <i className="bi bi-info-circle-fill text-green-600"></i>
                        หน้านี้จะใช้สำหรับแสดงและจัดการข้อมูลสินค้าทั้งหมด
                    </p>
                    <p className="text-gray-600 text-sm mt-2 ml-6">
                        (ในส่วนของ Part 2 เราจะเพิ่มการเชื่อมต่อกับ API)
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Products
