import { Card, Button, Avatar } from 'flowbite-react';
import React, { useState, useEffect } from 'react'
import projectsService from '../services/projects.service';
import { useToast } from '../useToast';

function IssuePane(props) {
    const [content, setContent] = useState();
    const toast = useToast(4000);

    useEffect(() => {
        projectsService.getIssues(props.id).then(
            response => {
                setContent(response.data);
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
    }, [props.id])

    return (
        <div>
            <h1 className="text-lg font-bold pb-2">Issues</h1>
            {content &&
                <div className="flex flex-col space-y-10">
                    {content.issues.map(item => {
                        return (
                            <Card>
                                <div className="flex flex-col">
                                    <Avatar rounded />
                                    <p>{item.description}</p>
                                    <p>{item.email}</p>
                                    <p>{item.tag}</p>
                                </div>
                                <div className="flex flex-wrap space-x-4">
                                    <Button className="basis-1/2">Reply</Button>
                                    <Button color="failure" className="basis-1/4">Delete</Button>
                                </div>
                            </Card>
                        )
                    })}
                </div>
            }
        </div >
    )
}

export default IssuePane