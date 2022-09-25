import React, { useEffect } from 'react'
import { useToast } from '../hooks/useToast'
import { motion, AnimatePresence } from 'framer-motion'
const Toast = () => {
    const { isToastOpen, message, toastType, position, direction, closeToast } = useToast()
    useEffect(() => {
        if (isToastOpen) {

            setTimeout(() => {
                closeToast()
            }, 1700)
        }
    }, [isToastOpen])
    return (
        <AnimatePresence>
            {
                isToastOpen && (
                    <motion.div
                        
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }} className={toastType === "success" ? 'toast-container-success' : 'toast-container-error'}>
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