import { ListGroup, Tabs } from 'flowbite-react'
import React, { useState, useEffect } from 'react'
import ProjectsService from '../services/projects.service';
import { useToast } from '../useToast';

function ProjectList(props) {
    const [list, setList] = useState();
    const toast = useToast(4000);

    useEffect(() => {
        ProjectsService.getAll().then(
            response => {
                setList(response.data);
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                toast("error", resMessage);
            }
        )
    }, [])

    return (
        <div className="w-48">
            <h1 className="text-lg font-bold indent-4">Projects</h1>
            <ListGroup>
                {list?.map(item => {
                    return <ListGroup.Item key={item.id} onClick={() => props.onSelect(item)}>
                        {item.name}
                    </ListGroup.Item>
                })}

            </ListGroup>
        </div>
    )
}

export default ProjectList