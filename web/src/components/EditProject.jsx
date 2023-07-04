import React, { useState, useEffect } from 'react'
import { Modal, TextInput, Label, Button, Dropdown } from 'flowbite-react'
import ProjectsService from '../services/projects.service';
import { useToast } from '../useToast';

function EditProject(props) {
    const [name, setName] = useState();
    const [url, setUrl] = useState();
    const [openModal, setOpenModal] = useState(false);
    const toast = useToast(8000);

    const toggleModal = () => {
        setOpenModal(!openModal)
    };

    useEffect(() => {
        if (props.project) {
            setName(props.project.name)
            setUrl(props.project.url)
        }
    }, [props.project])

    const onSubmit = (e) => {
        e.preventDefault();
        ProjectsService.edit(props.project.id, {name, url}).then(
            response => {
                toggleModal();
                console.log(response.data.message)
                toast("success", response.data.message + ". Refresh the page for changes to take effect.");
                props.onSuccess();
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                toggleModal();
                toast("error", resMessage);
            }
        )
    };

    const removeProject = () => {
        ProjectsService.remove(props.project.id).then(
            response => {
                toggleModal();
                console.log(response.data.message)
                toast("success", response.data.message + ". Refresh the page for changes to take effect.");
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                toggleModal();
                toast("error", resMessage);
            }
        )
    };

    return (
        <>
            <Dropdown.Item onClick={toggleModal}>
                Edit
            </Dropdown.Item>
            <Modal show={openModal} size="md" onClose={toggleModal} root={document.body}>
                <Modal.Header>
                    Edit project
                </Modal.Header>
                <Modal.Body>
                    <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Name for the project" />
                            </div>
                            <TextInput id="name" type="text" placeholder="My first project" required value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="url" value="Link to website" />
                            </div>
                            <TextInput id="url" type="text" placeholder="https://google.com" required={false} value={url} onChange={e => setUrl(e.target.value)} />
                        </div>
                        <div>
                            <Button onClick={removeProject} color="failure">Remove project</Button>
                        </div>
                        <div className="flex flex-row space-x-4">
                            <Button type="submit">Save</Button>
                            <Button color="light" onClick={toggleModal}>Close</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EditProject