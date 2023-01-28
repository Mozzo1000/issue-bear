import { Card, Button, Avatar, Badge, Spinner } from 'flowbite-react';
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
                <>
                    <div className="flex flex-col space-y-10">
                        {content.issues.map(item => {
                            return (
                                <Card>
                                    <div className="flex flex-col space-y-2">
                                        <div className="flex flex-wrap">
                                            <Badge>{item.tag}</Badge>
                                        </div>
                                        <p>{item.description}</p>
                                        {item.email &&
                                            <div>
                                                <div className="flex flex-col pb-3">
                                                    <dt className="mb-1 text-gray-500 text-lg">User</dt>
                                                    <dd className="flex flex-wrap text-lg font-semibold">
                                                        <Avatar rounded>
                                                            <p>{item.email}</p>
                                                        </Avatar></dd>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className="flex flex-wrap space-x-4">
                                        <Button className="basis-1/2" disabled={!item.email}>Reply</Button>
                                        <Button color="failure" className="basis-1/4">Delete</Button>
                                    </div>
                                </Card>
                            )
                        })}
                    </div>
                    {content.issues.length <= 0 &&
                        <p>No issues found</p>
                    }
                </>
            }
        </div >
    )
}

export default IssuePane