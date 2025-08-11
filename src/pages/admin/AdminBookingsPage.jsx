// client/src/pages/admin/AdminBookingsPage.jsx
import React, { useState, useEffect } from 'react';
import { getAllAdminBookings } from '../../api/adminApi';
import { Toaster, toast } from 'react-hot-toast';

const AdminBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const { data } = await getAllAdminBookings();
                setBookings(data.data.bookings);
            } catch (error) {
                toast.error("Failed to fetch bookings.");
                console.error("Fetch bookings error:", error);
            }
            setLoading(false);
        };
        fetchBookings();
    }, []);

    const getStatusChip = (status) => {
        const baseStyle = 'px-3 py-1 text-xs font-medium text-white rounded-full';
        switch (status) {
            case 'Completed': return `${baseStyle} bg-green-500`;
            case 'Pending': return `${baseStyle} bg-yellow-500`;
            case 'Failed': return `${baseStyle} bg-red-500`;
            default: return `${baseStyle} bg-gray-500`;
        }
    };

    if (loading) return <div className="text-center p-8">Loading bookings...</div>;

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <Toaster position="top-center" />
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Manage All Bookings</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Vehicle</th>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Travel Date</th>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Seats</th>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Price</th>
                            <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {bookings.length > 0 ? bookings.map(booking => (
                            <tr key={booking._id} className="hover:bg-gray-50">
                                <td className="py-4 px-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{booking.user?.name || 'N/A'}</div>
                                    <div className="text-xs text-gray-500">{booking.user?.email || 'N/A'}</div>
                                </td>
                                <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-700">{booking.vehicle?.name || 'N/A'}</td>
                                <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-700">{new Date(booking.travelDate).toLocaleDateString()}</td>
                                <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-700">{booking.bookedSeats.map(s => s.seatNumber).join(', ')}</td>
                                <td className="py-4 px-4 whitespace-nowrap text-sm font-semibold text-gray-900">NPR {booking.totalPrice}</td>
                                <td className="py-4 px-4 whitespace-nowrap">
                                    <span className={getStatusChip(booking.paymentStatus)}>
                                        {booking.paymentStatus}
                                    </span>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6" className="text-center py-8 text-gray-500">No bookings found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminBookingsPage;