import React, { useState, useEffect } from 'react'
import IssuePane from '../components/IssuePane';
import ProjectList from '../components/ProjectList'
import ProjectPane from '../components/ProjectPane';

function Dashboard() {
    const [project, setProject] = useState();

    return (
        <div className="container mx-auto py-10">
            <div className="flex flex-wrap space-y-5 lg:space-y-0">
                <div className="basis-1/4">
                    <ProjectList onSelect={setProject} />
                </div>
                <div className="basis-full lg:basis-1/2 divide-y space-y-4 grid grid-flow-row auto-rows-max">
                    <div>
                        <ProjectPane project={project} />
                    </div>
                    <div className="">
                        {project ? (
                            <IssuePane id={project.id} />
                        ) : (
                            <h1 className="text-4xl font-bold leading-none tracking-tight">Select a project to view it's issues</h1>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard