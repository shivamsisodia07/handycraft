const ConsumerSchema = {
    name: {
        required: {
            value: true,
            message: 'Name is required'
        },
        pattern: {
            value: /^[^\s].*[^\s]$/,
            message: "Name must not contain any spaces"
        },
        minLength: {
            value: 5,
            message: "Name must be at least 3 characters"
        },
    },
    city: {
        required: {
            value: true,
            message: 'City is required'
        },
        pattern: {
            value: /^[^\s].*[^\s]$/,
            message: "City must not contain any spaces"
        },
        minLength: {
            value: 5,
            message: "City must be at least 3 characters"
        },
    },
    district: {
        required: {
            value: true,
            message: 'District is required'
        },
        pattern: {
            value: /^[^\s].*[^\s]$/,
            message: "District must not contain any spaces"
        },
        minLength: {
            value: 5,
            message: "District must be at least 3 characters"
        },
    },
    State: {
        required: {
            value: true,
            message: 'State is required'
        },
        pattern: {
            value: /^[^\s].*[^\s]$/,
            message: "State must not contain any spaces"
        },
        minLength: {
            value: 5,
            message: "State must be at least 3 characters"
        },
    },
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

export default ConsumerSchema;