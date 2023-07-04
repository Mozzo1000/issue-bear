import { Card, Button, Avatar, Badge, Spinner, Tooltip } from 'flowbite-react';
import React, { useState, useEffect } from 'react'
import projectsService from '../services/projects.service';
import issuesService from '../services/issues.service';
import { useToast } from '../useToast';
import TokenInfoCTA from './TokenInfoCTA';
import { HiReply, HiArchive } from 'react-icons/hi';

function IssuePane(props) {
    const [content, setContent] = useState();
    const toast = useToast(4000);

    const getIssues = () => {
        setContent("");
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
    };

    useEffect(() => {
        getIssues();
    }, [props.id])

    const archiveIssue = (id) => {
        issuesService.archive(id).then(
            response => {
                toast("success", response.data.message)
                getIssues();
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
    }

    const renderTagBadge = (value) => {
        let color = "info"
        if (value == "bug") {
            color = "failure"
        } else if (value == "question") {
            color = "warning"
        }
        return <Badge color={color}>{value}</Badge>
    }

    const onClickEmail = (event, desc, address) => {
        var subject = "[Issue Bear] - Feedback " + desc.substring(0, 20) + "..."
        var body = "%0D%0AOriginal feedback:%0D%0A" + desc;
        window.location.href = "mailto:" + address + "?subject=" + subject + "&body=" + body;
    }

    return (
        <div>
            <h1 className="text-lg font-bold pb-2">Issues</h1>
            {content ? (
                <>
                    <div className="flex flex-col space-y-10">
                        {content.issues.map(item => {
                            return (
                                !item.archived &&
                                <Card key={item.id}>
                                    <div className="flex flex-col space-y-2">
                                        <div className="flex justify-between">
                                            {renderTagBadge(item.tag)}
                                            <p className="font-semibold text-gray-800 text-xs">
                                                {new Date(item.created_at).toLocaleDateString("en", {year: "numeric", day: "2-digit", month: "long"})}
                                            </p>
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
                                        <Tooltip content={item.email ? ("Reply to the user") : ("This user has not provided any email")}>
                                            <Button className="basis-1/4" disabled={!item.email} onClick={(e) => onClickEmail(e, item.description, item.email)}><HiReply className="mr-2"/>Reply</Button>
                                        </Tooltip>
                                        <Button color="gray" onClick={() => archiveIssue(item.id)}><HiArchive className="mr-2"/>Archive</Button>
                                    </div>
                                </Card>
                            )
                        })}
                    </div>
                    {content.issues.length <= 0 &&
                        <>
                            <TokenInfoCTA id={props.id} />
                        </>
                    }
                </>
            ): (
                <Spinner/>
            )}
        </div >
    )
}

export default IssuePane