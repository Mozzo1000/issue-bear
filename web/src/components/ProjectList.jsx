import { ListGroup } from 'flowbite-react'
import React, { useState, useEffect } from 'react'
import ProjectsService from '../services/projects.service';
import { useToast } from '../useToast';
import CreateProject from './CreateProject';

function ProjectList(props) {
    const [list, setList] = useState();
    const [activeProject, setActiveProject] = useState();

    const toast = useToast(4000);

    const selectProject = (item) => {
        setActiveProject(item.id);
        props.onSelect(item)
    };

    useEffect(() => {
        getList();
    }, [])

    const getList = () => {
        ProjectsService.getAll().then(
            response => {
                setList(response.data);
                if (response.data.length > 0) {
                    selectProject(response.data[0])
                }
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
    };

    return (
        <div className="w-48 space-y-4">
            <div className="flex">
                <div className="flex-1">
                    <h1 className="text-xl font-bold indent-4">Projects</h1>
                </div>
                <div className="flex-1">
                    <CreateProject onSuccess={() => getList()} />
                </div>
            </div>
            <ListGroup>
                {list?.map(item => {
                    return <ListGroup.Item key={item.id} onClick={() => selectProject(item)} active={item.id == activeProject}>
                        {item.name}
                    </ListGroup.Item>
                })}
            </ListGroup>
        </div>
    )
}

export default ProjectList