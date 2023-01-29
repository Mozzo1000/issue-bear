import React, { useState } from 'react'
import { Button, Modal, Label, TextInput } from 'flowbite-react'
import { useToast } from '../useToast';
import MembersList from './MembersList';
import InviteMember from './InviteMember';

function Members(props) {
    const [showModal, setShowModal] = useState(false);
    const toast = useToast(4000);

    const onClickShowModal = () => {
        setShowModal(!showModal);
    };

    return (
        <>
            <Button size="xs" onClick={onClickShowModal}>{props.btnText || "Add members"}</Button>
            <Modal show={showModal} size="md" onClose={onClickShowModal}>
                <Modal.Header>
                    Share your project
                </Modal.Header>
                <Modal.Body>
                    <InviteMember id={props.id} />
                    <MembersList id={props.id} />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Members