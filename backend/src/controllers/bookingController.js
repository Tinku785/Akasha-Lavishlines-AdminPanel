import Booking from '../models/Booking.js';

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Public
export const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({}).sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Create a booking
// @route   POST /api/bookings
// @access  Public
export const createBooking = async (req, res) => {
    try {
        const booking = await Booking.create(req.body);
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// @desc    Update a booking
// @route   PUT /api/bookings/:id
// @access  Protected
export const updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findOne({ bookingId: req.params.id });
        if (booking) {
            Object.assign(booking, req.body);
            const updatedBooking = await booking.save();
            res.json(updatedBooking);
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// @desc    Delete (Cancel) a booking
// @route   DELETE /api/bookings/:id
// @access  Protected
export const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findOne({ bookingId: req.params.id });
        if (booking) {
            booking.status = 'Cancelled'; // Soft delete/Cancel
            const updatedBooking = await booking.save();
            res.json(updatedBooking);
            // OR for hard delete:
            // await booking.remove();
            // res.json({ message: 'Booking removed' });
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
