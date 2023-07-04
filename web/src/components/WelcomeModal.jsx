import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'flowbite-react'
import Confetti from 'react-confetti'
import { Link } from 'react-router-dom';

function WelcomeModal() {
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("welcome_screen")) {
            if (localStorage.getItem("welcome_screen") == "true") {
                setOpenModal(true);
            } else if (localStorage.getItem("welcome_screen") == "false") {
                setOpenModal(false);
            }
        } else {
            localStorage.setItem("welcome_screen", true);
        }
    }, [])
    

    const toggleModal = () => {
        setOpenModal(!openModal)
        localStorage.setItem("welcome_screen", false);
    };

    return (
        <Modal show={openModal} size="xl" popup={true} onClose={toggleModal}>
            <Modal.Header />
            <Modal.Body>
                <div className="prose lg:prose-xl relative overflow-hidden">
                    <Confetti recycle={false} numberOfPieces={1000}/>
                    <h2>👋 Welcome to Issue Bear!</h2>
                    <p>We are happy to see you here! Create a project and start retrieving feedback from your users in minutes.</p>
                    <p>To learn more, see the <Link to="/docs">documentation</Link></p>
                </div>
            </Modal.Body>
            <Modal.Footer className="flex flex-col items-center">
                <Button onClick={toggleModal}>Get started!</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default WelcomeModal