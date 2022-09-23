import React from 'react'
import { useToast } from '../hooks/useToast'
import { motion, AnimatePresence } from 'framer-motion'
const Toast = () => {
    const { isToastOpen, message, toastType, position, direction, closeToast } = useToast()
    return (
        <AnimatePresence>
            {
                isToastOpen && (
                    <motion.div className={toastType === "success" ? 'toast-container-success' : 'toast-container-error'}>
                        {toastType === "success" ? "✅" : "🚫"}{" "}
                        {message}
                        <button className="toast-button" onClick={closeToast}>X</button>
                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}

export default Toast