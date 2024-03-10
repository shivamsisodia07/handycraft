const RegisterSchema = {
    email:{
        required:{
            value:true,
            message:"Email Required"
        },
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid Email"
        }
    },
    password:{
        required:{
            value:true,
            message:"Password Required"
        },
        minLength:{
            value:6,
            message:"Password must have at least 6 characters"
        }
    },
    cpassword: {
        required: {
            value: true,
            message: "Password Required"
        },
        minLength: {
            value: 6,
            message: "Password must have at least 6 characters"
        },
    },
    
    // mobileNo: {
    //     required: {
    //         value: true,
    //         message: 'MobileNo is required'
    //     },
    //     pattern: {
    //         value: /^[0-9]{10}$/,
    //         message: "MobileNo must be 10 digits"
    //     },
    // }
}
export default RegisterSchema;