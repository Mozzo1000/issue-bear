import { Card, TextInput, Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import ProjectsService from '../services/projects.service'
import { useToast } from '../useToast';

function TokenInfoCTA(props) {
    const [token, setToken] = useState();
    const [copyButtonText, setCopyButtonText] = useState("Copy")
    const toast = useToast(4000);

    useEffect(() => {
        ProjectsService.get(props.id).then(
            response => {
                setToken(response.data.token);
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

    const copyTokenToClipboard = () => {
        navigator.clipboard.writeText(token);
        toast("success", "Token copied to clipboard!")
        setCopyButtonText("Copied!")
        setTimeout(() => {
            setCopyButtonText("Copy")
        }, 4000);
    };


    return (
        <Card className="text-center">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900">Get started receiving issues</h2>
            <p class="mb-6 font-light text-gray-500 md:text-lg">Use the token in your widget code. <a href="#" class="font-normal text-blue-600 hover:underline">Read more</a></p>
            <div className="flex flex-row space-x-4">
                <TextInput className="mb-2 w-full" id="token" type="text" disabled value={token} />
                <Button disabled={copyButtonText == "Copied!"} onClick={copyTokenToClipboard}>{copyButtonText}</Button>
            </div>
        </Card>
    )
}

export default TokenInfoCTA