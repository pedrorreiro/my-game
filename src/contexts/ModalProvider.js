import { Modal } from 'antd';
import React, { createContext, useState } from "react";

export const ModalContext = createContext("modal")

export default function ModalProvider({ children }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState({
        title: '',
        text: '',
    });
    const [canCancel, setCanCancel] = useState(true);

    const showModal = (message, canCancel) => {
        setModalMessage(message);
        setCanCancel(canCancel);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <ModalContext.Provider value={{
            showModal,
        }}>
            <>
                <div className='modal'>
                    <Modal title={modalMessage.title} open={isModalOpen} cancelButtonProps={
                        canCancel ? {} : { style: { display: 'none' } }
                    } onOk={handleOk} onCancel={handleCancel}>
                        <p>{modalMessage.text}</p>
                    </Modal>
                </div>
                {children}
            </>
        </ModalContext.Provider>
    )
}