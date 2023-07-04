import React from 'react'
import { Button, Tooltip } from 'flowbite-react'
import { HiPencil } from 'react-icons/hi';

function FeedbackButton() {
  return (
    <>
        <Tooltip placement="left" content="Try it">
            <Button disabled size="sm"><HiPencil className="mr-2 h-5 w-5"/> Give Feedback</Button>
        </Tooltip>
    </>
  )
}

export default FeedbackButton