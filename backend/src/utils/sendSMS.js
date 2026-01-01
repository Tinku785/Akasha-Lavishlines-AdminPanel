import axios from "axios";

const sendSMS = async ({ phone, message }) => {
    try {
        const response = await axios.post(
            "https://www.fast2sms.com/dev/bulkV2",
            {
                route: "q",
                message,
                language: "english",
                numbers: phone,
            },
            {
                headers: {
                    authorization: process.env.FAST2SMS_API_KEY,
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("❌ SMS Error:", error.response?.data || error.message);
        throw new Error("SMS failed");
    }
};

export default sendSMS;
