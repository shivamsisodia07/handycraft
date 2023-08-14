const OtpSchema = {
    otp: {
        required: {
            value: true,
            message: 'otp is required'
        },
        pattern: {
            value: /^[0-9]{6}$/,
            message: "MobileNo must be 6 digits"
        },
    }
}
export default OtpSchema;