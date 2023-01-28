import { Card, Button, Avatar, Badge, Spinner } from 'flowbite-react';
import React, { useState, useEffect } from 'react'
import projectsService from '../services/projects.service';
import { useToast } from '../useToast';
import TokenInfoCTA from './TokenInfoCTA';

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

    const renderTagBadge = (value) => {
        let color = "info"
        if (value == "bug") {
            color = "failure"
        } else if (value == "question") {
            color = "warning"
        }
        return <Badge color={color}>{value}</Badge>
    }

    return (
        <div>
            <h1 className="text-lg font-bold pb-2">Issues</h1>
            {content &&
                <>
                    <div className="flex flex-col space-y-10">
                        {content.issues.map(item => {
                            return (
                                <Card key={item.id}>
                                    <div className="flex flex-col space-y-2">
                                        <div className="flex flex-wrap">
                                            {renderTagBadge(item.tag)}
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
                                    <div className="flex flex-row justify-between">
                                        <Button className="basis-1/4" disabled={!item.email}>Reply</Button>
                                        <Button color="failure" className="">Delete</Button>
                                    </div>
                                </Card>
                            )
                        })}
                    </div>
                    {content.issues.length <= 0 &&
                        <>
                            <p>No issues found</p>
                            <TokenInfoCTA id={props.id} />
                        </>
                    }
                </>
            }
        </div >
    )
}

export default IssuePane