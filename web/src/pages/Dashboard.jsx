import React, { useState, useEffect } from 'react'
import IssuePane from '../components/IssuePane';
import ProjectList from '../components/ProjectList'

function Dashboard() {
    const [project, setProject] = useState();

    useEffect(() => {
        console.log(project);
    }, [project])


    return (
        <div className="container mx-auto py-10">
            <div className="flex flex-wrap space-y-5 lg:space-y-0">
                <div className="basis-1/4">
                    <ProjectList onSelect={setProject} />
                </div>
                <div className="basis-full lg:basis-1/2">
                    <IssuePane id={project?.id} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard