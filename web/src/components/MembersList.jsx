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
            {members &&
                members.members.map(item => {
                    return <p>{item.name}</p>
                })
            }
        </>
    )
}

export default MembersList