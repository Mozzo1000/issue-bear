import { Dropdown, Modal, Label, TextInput, Button } from 'flowbite-react'
import React, { useState } from 'react'
import { useToast } from '../useToast';

function ProjectPane(props) {
    const [openTokenModal, setOpenTokenModal] = useState(false);
    const [copyButtonText, setCopyButtonText] = useState("Copy")
    const toast = useToast(4000);

    const toggleTokenModal = () => {
        setOpenTokenModal(!openTokenModal)
    };

    const copyTokenToClipboard = () => {
        navigator.clipboard.writeText(props.project.token);
        toast("success", "Token copied to clipboard!")
        setCopyButtonText("Copied!")
        setTimeout(() => {
            setCopyButtonText("Copy")
        }, 4000);
    };

    return (
        <div>
            {props.project &&
                <>
                    <div className="flex flex-row justify-between">
                        <h1 className="text-lg font-bold pb-2">{props.project.name}</h1>
                        <Dropdown label="More" size="xs" outline={true}>
                            <Dropdown.Item onClick={toggleTokenModal}>
                                Token
                            </Dropdown.Item>
                            <Dropdown.Item>
                                Edit
                            </Dropdown.Item>
                        </Dropdown>
                    </div>
                    <Modal show={openTokenModal} size="md" popup={true} onClose={toggleTokenModal}>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="mb-2 block">
                                <Label htmlFor="token" value="Project token" />
                            </div>
                            <div className="flex flex-row space-x-4">

                                <TextInput className="mb-2 w-full" id="token" type="text" disabled value={props.project.token} />
                                <Button disabled={copyButtonText == "Copied!"} onClick={copyTokenToClipboard}>{copyButtonText}</Button>
                            </div>

                            <Button color="failure">Generate new token</Button>
                        </Modal.Body>
                    </Modal>
                </>
            }
        </div>
    )
}

export default ProjectPane