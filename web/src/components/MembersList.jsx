import { Avatar, Button } from 'flowbite-react';
import React, { useState, useEffect } from 'react'
import ProjectsService from '../services/projects.service'
import { useToast } from '../useToast';

function MembersList(props) {
    const [members, setMembers] = useState();
    const toast = useToast(4000);

    useEffect(() => {
        getMembers();
    }, [props.id])

    useEffect(() => {
        if (props.update) {
            getMembers();
            props.afterUpdate();

        }
    }, [props.update])

    const getMembers = () => {
        ProjectsService.getMembers(props.id).then(
            response => {
                setMembers(response.data);
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
            <h2 className="text-sm font-medium text-gray-900 mb-2">In this project</h2>
            {members &&
                members.members.map(item => {
                    return <>
                        <div className="flex flex-row justify-between mb-2">
                            <Avatar rounded>
                                <div className="flex flex-col">
                                    <div className="font-medium">
                                        {item.name}
                                    </div>
                                    <div className="text-gray-500 text-sm">
                                        {item.email}
                                    </div>
                                </div></Avatar>
                            <Button color="failure">Remove</Button>

                        </div>
                        <hr className="m-2" />
                    </>
                })
            }
        </>
    )
}

export default MembersList