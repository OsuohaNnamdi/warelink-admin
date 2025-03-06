import React from "react";

const Alert = ({ type, message, onClose }) => {
    // Define styles based on the alert type (success or error)
    const alertStyles = {
        success: "bg-green-100 border-green-400 text-green-700",
        error: "bg-red-100 border-red-400 text-red-700",
    };

    return (
        <div className={`border-l-4 p-4 mb-4 ${alertStyles[type]}`} role="alert">
            <div className="flex justify-between items-center">
                <p className="font-medium">{message}</p>
                <button onClick={onClose} className="text-lg font-bold">&times;</button>
            </div>
        </div>
    );
};

export default Alert;