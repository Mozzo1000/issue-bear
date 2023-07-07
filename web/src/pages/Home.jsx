import { Button, Tooltip } from 'flowbite-react'
import React, { useState } from 'react'
import { HiOutlineArrowRight } from 'react-icons/hi';
import FeatureCard from '../components/FeatureCard';
import { HiChartBar, HiCloud, HiDatabase, HiOutlineClipboardCopy } from 'react-icons/hi';
import SyntaxHighlighter from 'react-syntax-highlighter';
import SyntaxStyle from '../components/SyntaxStyle';
import { RiOpenSourceFill } from "react-icons/ri";

function Home() {
  var widgetCode = `<script src="widget.js" token="abc..."></script>
<button data-issue-bear defer>Give feedback</button>`
  const [copyButtonText, setCopyButtonText] = useState("Copy to clipboard")

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(widgetCode);
    setCopyButtonText("Copied!")
    setTimeout(() => {
        setCopyButtonText("Copy to clipboard")
    }, 4000);
  };


  return (
    <>
    {/* Header text and call to action*/}
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

      {/* Feature list */}
      <section className="bg-white py-8 px-4 mx-auto text-center max-w-screen-md">
        <article className="prose lg:prose-xl  lg:py-16 lg:px-12  mb-8 lg:mb-16">
            <h2>Designed for business teams like yours</h2>
            <p className="text-gray-500 sm:text-xl">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth</p>
        </article>
        <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          <FeatureCard title="Widget" description="" icon={<HiChartBar className="h-8 w-8"/>}/>
          <FeatureCard title="Hosting" description="" icon={<HiCloud className="h-8 w-8" />}/>
          <FeatureCard title="Open Source" descirption="" icon={<RiOpenSourceFill className="h-8 w-8" />} />

        </div>
        <hr className="my-8"/>
      </section>

      <section className="bg-white py-8 px-4 mx-auto text-center max-w-screen-md">
        <article className="prose lg:prose-xl lg:py-16 mb-8 lg:mb-16">
            <h2>Easy to set up</h2>
            <p className="text-gray-500 sm:text-xl"></p>
            <div class="text-left bg-gray-800 shadow-2xl rounded-lg">
                <div class="py-2 px-6 pb-0 flex justify-between items-baseline">
                    <span className="text-sm text-slate-400">HTML</span>
                    <Tooltip content={copyButtonText}>
                      <Button disabled={copyButtonText == "Copied!"} onClick={copyCodeToClipboard} className="bg-transparent" outline ><HiOutlineClipboardCopy className="w-4 h-4"/></Button>
                    </Tooltip>
                </div>
                <div className="px-6 pb-1">
                    <SyntaxHighlighter showLineNumbers language="htmlbars" style={SyntaxStyle}>
                      {widgetCode}
                    </SyntaxHighlighter>
              </div>
            </div>
        </article>
      </section>


    </>
  )
}

export default Home