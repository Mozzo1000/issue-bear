import { Dropdown, Modal, Label, TextInput, Button, Tooltip } from 'flowbite-react'
import React, { useState, useEffect } from 'react'
import ProjectsService from '../services/projects.service';
import { useToast } from '../useToast';
import ManageMembers from './ManageMembers';
import { HiRefresh, HiExternalLink } from 'react-icons/hi';
import EditProject from './EditProject';
import { Link } from 'react-router-dom';

function ProjectPane(props) {
    const [openTokenModal, setOpenTokenModal] = useState(false);
    const [copyButtonText, setCopyButtonText] = useState("Copy")
    const [tokenText, setTokenText] = useState();

    const toast = useToast(4000);

    const toggleTokenModal = () => {
        setOpenTokenModal(!openTokenModal)
    };

    const onClickGenerateToken = () => {
        ProjectsService.generateToken(props.project.id).then(
            response => {
                toast("success", response.data.message);
                setTokenText(response.data.token);
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                toggleTokenModal();
                toast("error", resMessage);
            }
        )
    };

    useEffect(() => {
        if (props.project) {
            setTokenText(props.project.token)
        }
    }, [props.project])

    const copyTokenToClipboard = () => {
        navigator.clipboard.writeText(tokenText);
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
                        <div className="flex flex-row">
                            <h1 className="text-lg font-bold pb-2">{props.project.name}</h1>
                            {props.project.url &&
                                <Tooltip content="Open website">
                                    <Link to={props.project.url} target="_blank" rel="noopener noreferrer"><HiExternalLink className="ml-1 w-6 h-6"/></Link>
                                </Tooltip>
                            }
                        </div>
                        <ManageMembers btnText="Share" id={props.project.id} />
                        <Tooltip content="Refresh issues">
                            <Button size="sm" color="gray" onClick={props.onRefresh}><HiRefresh/></Button>
                        </Tooltip>
                        <Dropdown label="More" size="xs" outline={true} color="gray">
                            <Dropdown.Item onClick={toggleTokenModal}>
                                Token
                            </Dropdown.Item>
                            <EditProject project={props.project} />
                        </Dropdown>
                    </div>
                    <Modal show={openTokenModal} size="md" popup={true} onClose={toggleTokenModal}>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="mb-2 block">
                                <Label htmlFor="token" value="Project token" />
                            </div>
                            <div className="flex flex-row space-x-4">

                                <TextInput className="mb-2 w-full" id="token" type="text" disabled value={tokenText} />
                                <Button disabled={copyButtonText == "Copied!"} onClick={copyTokenToClipboard}>{copyButtonText}</Button>
                            </div>

                            <Button color="failure" onClick={onClickGenerateToken}>Generate new token</Button>
                        </Modal.Body>
                    </Modal>
                </>
            }
        </div>
    )
}

export default ProjectPane