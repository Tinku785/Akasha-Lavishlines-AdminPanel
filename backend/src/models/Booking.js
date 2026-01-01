import mongoose from "mongoose";

const passengerSchema = new mongoose.Schema({
    name: String,
    seat: String,
    fare: Number,
});

const bookingSchema = new mongoose.Schema(
    {
        bookingId: String,
        mainPassengerName: String,
        phone: String,
        journeyDate: String,
        route: String,
        departureTime: String,
        arrivalTime: String,
        passengers: [passengerSchema],
        totalFare: Number,
        status: {
            type: String,
            default: 'Confirmed'
        }
    },
    { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
