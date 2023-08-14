const LoginSchema = {
    mobileNo: {
        required: {
            value: true,
            message: 'MobileNo is required'
        },
        pattern: {
            value: /^[0-9]{10}$/,
            message: "MobileNo must be 10 digits"
        },
    }
}
export default LoginSchema;