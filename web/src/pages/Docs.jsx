import { ListGroup } from 'flowbite-react';
import React from 'react'
import GettingStarted from './docs/getting-started.mdx'
import CreateProject from './docs/create-project.mdx'
import ShareProject from './docs/share-project.mdx'
import GenerateNewToken from './docs/generate-new-token.mdx'

function Docs() {
    const pages = [
        { name: "Getting started", anchor: "getting-started", element: <GettingStarted /> },
        { name: "Create project", anchor: "create-project", element: <CreateProject /> },
        { name: "Share project", anchor: "share-project", element: <ShareProject /> },
        { name: "Generate new token", anchor: "generate-new-token", element: <GenerateNewToken /> },
    ];

    return (
        <div className="container mx-auto py-10">
            <div className="flex flex-wrap gap-10 lg:gap-32">
                <div className="shrink-0 basis-full lg:basis-1/4">
                    <ListGroup>
                        {pages.map((page) => (
                            <>
                                <ListGroup.Item key={page.anchor} href={"#" + page.anchor}>
                                    {page.name}
                                </ListGroup.Item>
                            </>
                        ))}
                    </ListGroup>
                </div>
                <div className="prose basis-full lg:basis-1/2">
                    {pages.map((page) => (
                        <div key={page.anchor}>
                            <a name={page.anchor}></a>{page.element}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Docs