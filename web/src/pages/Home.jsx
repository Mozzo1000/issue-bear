import { Button } from 'flowbite-react'
import React from 'react'
import { HiOutlineArrowRight } from 'react-icons/hi';

function Home() {
  return (
    <section className="bg-white">
        <article className="prose lg:prose-xl py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
            <h1>Your place for customer feedback</h1>
            <p className=" text-lg  text-gray-500 lg:text-xl sm:px-16 xl:px-48">Issue Bear has everything you need to collect, reply and take action on valuable customer feedback. Making your customers happy and your product better!</p>

        </article>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <Button>Get started <HiOutlineArrowRight className="ml-2 h-5 w-5" /></Button>
            <Button color="gray">Learn more</Button>
        </div>
        <hr />
    </section>
  )
}

export default Home