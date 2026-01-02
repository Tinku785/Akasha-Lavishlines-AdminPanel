
import { body, validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const validateBooking = [
    body('mainPassengerName')
        .trim()
        .notEmpty().withMessage('Main passenger name is required')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long')
        .escape(),

    body('phone')
        .trim()
        .notEmpty().withMessage('Phone number is required')
        .isMobilePhone().withMessage('Invalid phone number format'),

    body('journeyDate')
        .trim()
        .notEmpty().withMessage('Journey date is required'),
    // You could add .isDate() or regex check if you have a specific format in mind, 
    // strictly checking typically requires a custom validator or ISO format

    body('route')
        .trim()
        .notEmpty().withMessage('Route is required')
        .escape(),

    body('departureTime')
        .trim()
        .notEmpty().withMessage('Departure time is required'),

    body('arrivalTime')
        .trim()
        .notEmpty().withMessage('Arrival time is required'),

    body('passengers')
        .isArray({ min: 1 }).withMessage('At least one passenger is required'),

    body('passengers.*.name')
        .trim()
        .notEmpty().withMessage('Passenger name is required')
        .escape(),

    body('passengers.*.seat')
        .trim()
        .notEmpty().withMessage('Seat number is required'),

    body('passengers.*.fare')
        .isNumeric().withMessage('Fare must be a number'),

    body('totalFare')
        .isNumeric().withMessage('Total fare must be a number'),
];

export const validateBookingUpdate = [
    body('mainPassengerName')
        .optional()
        .trim()
        .notEmpty().withMessage('Main passenger name cannot be empty')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long')
        .escape(),

    body('phone')
        .optional()
        .trim()
        .notEmpty().withMessage('Phone number cannot be empty')
        .isMobilePhone().withMessage('Invalid phone number format'),

    body('journeyDate')
        .optional()
        .trim()
        .notEmpty().withMessage('Journey date cannot be empty'),

    body('route')
        .optional()
        .trim()
        .notEmpty().withMessage('Route cannot be empty')
        .escape(),

    body('departureTime')
        .optional()
        .trim()
        .notEmpty().withMessage('Departure time cannot be empty'),

    body('arrivalTime')
        .optional()
        .trim()
        .notEmpty().withMessage('Arrival time cannot be empty'),

    body('passengers')
        .optional()
        .isArray({ min: 1 }).withMessage('At least one passenger is required'),

    body('passengers.*.name')
        .optional()
        .trim()
        .notEmpty().withMessage('Passenger name is required')
        .escape(),

    body('passengers.*.seat')
        .optional()
        .trim()
        .notEmpty().withMessage('Seat number is required'),

    body('passengers.*.fare')
        .optional()
        .isNumeric().withMessage('Fare must be a number'),

    body('totalFare')
        .optional()
        .isNumeric().withMessage('Total fare must be a number'),
];

export const validateLogin = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),

    body('password')
        .trim()
        .notEmpty().withMessage('Password is required'),
];
