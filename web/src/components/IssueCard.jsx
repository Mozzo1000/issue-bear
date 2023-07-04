import React from 'react'
import { HiReply, HiArchive } from 'react-icons/hi';
import { Card, Button, Avatar, Tooltip, Badge } from 'flowbite-react';

function IssueCard(props) {


    const onClickEmail = (event, desc, address) => {
        var subject = "[Issue Bear] - Feedback " + desc.substring(0, 20) + "..."
        var body = "%0D%0AOriginal feedback:%0D%0A" + desc;
        window.location.href = "mailto:" + address + "?subject=" + subject + "&body=" + body;
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

    return (
        <Card key={props.item.id}>
            <div className="flex flex-col space-y-2">
                <div className="flex justify-between">
                    {renderTagBadge(props.item.tag)}
                    <p className="font-semibold text-gray-800 text-xs">
                        {new Date(props.item.created_at).toLocaleDateString("en", {year: "numeric", day: "2-digit", month: "long"})}
                    </p>
                </div>
                <p>{props.item.description}</p>
                {props.item.email &&
                    <div>
                        <div className="flex flex-col pb-3">
                            <dt className="mb-1 text-gray-500 text-lg">User</dt>
                            <dd className="flex flex-wrap text-lg font-semibold">
                                <Avatar rounded>
                                    <p>{props.item.email}</p>
                                </Avatar></dd>
                        </div>
                    </div>
                }
            </div>
            <div className="flex flex-row justify-between">
                <Tooltip content={props.item.email ? ("Reply to the user") : ("This user has not provided any email")}>
                    <Button className="basis-1/4" disabled={!props.item.email} onClick={(e) => onClickEmail(e, props.item.description, props.item.email)}><HiReply className="mr-2"/>Reply</Button>
                </Tooltip>
                <Button color="gray" onClick={props.onArchive} disabled={props.disableArchive}><HiArchive className="mr-2"/>Archive</Button>
            </div>
        </Card>
    )
}

export default IssueCard