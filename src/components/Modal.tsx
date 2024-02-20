import React from 'react';
import styles from '../styles/Modal.module.css'

interface Props { 
    children:React.ReactNode;
}

const Modal = ({ children }: Props) => {

    const closeModal = (e: React.MouseEvent): void => {
        const modal = document.querySelector('#modal')
        modal!.classList.add('hide');
    }

    return (
        <div id='modal' className='hide'>
            <div className={styles.fade} onClick={closeModal}></div>
            <div className={styles.modal}>
                <h1>Texto Modal</h1>
                {children}
            </div>
        </div>
    )
}

export default Modal
