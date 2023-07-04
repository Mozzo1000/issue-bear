import { Card, Button, Avatar, Badge, Spinner, Tooltip, Accordion } from 'flowbite-react';
import React, { useState, useEffect } from 'react'
import projectsService from '../services/projects.service';
import issuesService from '../services/issues.service';
import { useToast } from '../useToast';
import TokenInfoCTA from './TokenInfoCTA';
import { HiReply, HiArchive } from 'react-icons/hi';
import IssueCard from './IssueCard';

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

    

    return (
        <div>
            <h1 className="text-lg font-bold pb-2">Issues</h1>
            {content ? (
                <>
                    <div className="flex flex-col space-y-10">
                        {content.issues.map(item => {
                            return (
                                !item.archived &&
                                <IssueCard item={item} onArchive={() => archiveIssue(item.id)} />
                            )
                        })}
                    
                    {content.issues.length <= 0 &&
                        <>
                            <TokenInfoCTA id={props.id} />
                        </>
                    }
                    {content.issues.length > 0 &&
                    <Accordion collapseAll>
                        <Accordion.Panel>
                            <Accordion.Title>
                                Archived issues
                            </Accordion.Title>
                            <Accordion.Content>
                            {content.issues.map(item => {
                                return (
                                    item.archived &&
                                    <IssueCard item={item} onArchive={() => archiveIssue(item.id)} disableArchive={true} />
                                )
                            })}
                            </Accordion.Content>
                        </Accordion.Panel>
                    </Accordion>
                    }
                    </div>
                </>
            ): (
                <Spinner/>
            )}
        </div >
    )
}

export default IssuePane