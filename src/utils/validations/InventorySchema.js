const InventorySchema={
    name:{
        required:{
            value:true,
            message:'Name is required'
        },
        pattern:{
            value:/^[^\s].*[^\s]$/,
            message:"Name must not contain any spaces"
        },
        minLength:{
            value:3,
            message:"Name must be at least 3 characters"
        }
    },
    price:{
        required:{
            value:true,
            message:'Price is required'
        },
        pattern:{
            value:/[-+]?[0-9]*\.?[0-9]*/,
            message:"Price must be a number"
        },
        min:{
            value:100,
            message:"Price must be at least 1"
        }
        
    },
    quantity:{
        required:{
            value:true,
            message:'Quantity is required'
        },
        pattern:{
            value:/^[0-9]*$/,
            message:"Quantity must be a number"
        },
        min:{
            value:1,
            message:"Quantity must be at least 1"
        }
    },
    description:{
        required:{
            value:true,
            message:'Description is required'
        },
        pattern:{
            value:/^[^\s].*[^\s]$/,
            message:"Description must not contain any spaces"
        },
        minLength:{
            value:3,
            message:"Description must be at least 3 characters"
        }
    },
    imgFile:{
        required:{
            value:true,
            message:'Image is required'
        },
        
    }
}

export default InventorySchema;