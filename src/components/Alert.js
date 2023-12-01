import React from 'react'

const Alert = (props) => {

    return (
        <div>
            {props.alert && <div style={{ height: '50px',backgroundColor:'white',color:'red' }}>

                <div className="error">
                    <p className="input-error" style={{color:'red'}}>{props.message}</p>
                </div>
            </div>}
            {props.message}
        </div>
    )
}
export default Alert
