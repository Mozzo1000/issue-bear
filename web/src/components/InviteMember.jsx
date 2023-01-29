import React, { useState, useEffect } from 'react'
import ProjectsService from '../services/projects.service';
import { Button, Label, TextInput } from 'flowbite-react'
import { useToast } from '../useToast';

function InviteMember(props) {
    const [email, setEmail] = useState();
    const toast = useToast(4000);

    const handleSubmitInvite = (e) => {
        e.preventDefault();
        ProjectsService.addMember(props.id, email).then(
            response => {
                setEmail(" ");
                toast("success", response.data.message);
                props.onSuccess();
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
        <form onSubmit={handleSubmitInvite}>
            <div className="block">
                <Label htmlFor="member" value="Invite members" />
            </div>
            <div className="flex flex-row space-x-2">
                <TextInput className="w-full" id="member" type="email" placeholder="name@company.com" value={email} onChange={e => setEmail(e.target.value)} />
                <Button type="submit">Share</Button>
            </div>
        </form>
    )
}

export default InviteMember