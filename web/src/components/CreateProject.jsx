import React, { useState } from 'react'
import { Button, Modal, Label, TextInput, Tooltip } from 'flowbite-react'
import ProjectsService from '../services/projects.service';
import { useToast } from '../useToast';
import { HiPlus } from 'react-icons/hi';

function CreateProject(props) {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState();
    const [url, setUrl] = useState();
    const toast = useToast(4000);

    const onClickShowModal = () => {
        setShowModal(!showModal);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        ProjectsService.add(name, url).then(
            response => {
                onClickShowModal();
                toast("success", response.data.message);
                props.onSuccess();
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                onClickShowModal();
                toast("error", resMessage);
            }
        )
    };

    return (
        <>
            <Tooltip content="Create project">
                <Button size="sm" className="ml-2" outline onClick={onClickShowModal}><HiPlus /></Button>
            </Tooltip>
            <Modal show={showModal} size="md" onClose={onClickShowModal} root={document.body}>
                <Modal.Header>
                    Create project
                </Modal.Header>
                <Modal.Body>
                    <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Name for the project" />
                            </div>
                            <TextInput id="name" type="text" placeholder="My first project" required={true} value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="url" value="Link to website" />
                            </div>
                            <TextInput id="url" type="text" placeholder="https://google.com" required={false} value={url} onChange={e => setUrl(e.target.value)} />
                        </div>
                        <div className="flex flex-row space-x-4">
                            <Button type="submit">Create</Button>
                            <Button color="light" onClick={onClickShowModal}>Close</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CreateProject