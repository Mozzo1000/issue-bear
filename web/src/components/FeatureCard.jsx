import React from 'react'
import { Card } from 'flowbite-react'

function FeatureCard(props) {
  return (
    <Card>
        <div class="flex justify-center bg-primary-500">
                {props.icon}
        </div>
        <h3 class="mb-2 text-xl font-bold dark:text-white">{props.title}</h3>
        <p class="text-gray-500 dark:text-gray-400">{props.description}</p>
    </Card>
  )
}

export default FeatureCard