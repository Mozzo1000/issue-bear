import { ListGroup } from 'flowbite-react'
import React, { useState, useEffect } from 'react'
import ProjectsService from '../services/projects.service';
import { useToast } from '../useToast';
import CreateProject from './CreateProject';
import { HiGlobe } from 'react-icons/hi';

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

    function getSiteIcon(url) {
        if (url) {
            return <img src={"https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=" + url}/>
        } else {
            return <HiGlobe />
        }
    }

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
                    return <ListGroup.Item key={item.id} onClick={() => selectProject(item)} active={item.id == activeProject} icon={(e) => getSiteIcon(item.url)}>
                        <div className="ml-2">
                            {item.name}
                        </div>
                    </ListGroup.Item>
                })}
            </ListGroup>
        </div>
    )
}

export default ProjectList