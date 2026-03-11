import heroSectionImage from '../assets/hero-section.webp'
import { Copy, Loader, SendHorizontal } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { sendMessage } from '../services/gemini'
import Markdown from 'react-markdown'
import Sidebar from '../components/Sidebar'
import { ContextProvider } from '../components/ContextWrapper'
import { TypeAnimation } from 'react-type-animation'

const Home = () => {

    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)

    const { setMessages, messages } = useContext(ContextProvider)

    const handleSend = async () => {
        if (!input.trim() || loading) return
        setMessages(prev => [...prev, { role: 'user', text: input }])
        setInput('')
        setLoading(true)

        const response = await sendMessage(input)
        setMessages(prev => [...prev, { role: 'assistant', text: response }])
        setLoading(false)
    }

    const copyTextToClipboard = (text) => {
        navigator.clipboard.writeText(text)
        alert('Text Copied')
    }

    return (
        <main className='relative h-screen bg-(--color-chat) overflow-hidden max-w-400 mx-auto'>
            <Sidebar />
            <div className='w-full h-70'>
                <img
                    src={heroSectionImage}
                    alt="Hero Section Image"
                    className='h-70 w-full object-cover brightness-50'
                />
            </div>

            <section className='bg-(--color-bg)/70 backdrop-blur-2xl w-10/11 lg:w-10/14 mx-auto rounded-2xl flex flex-col justify-between absolute top-30 left-1/2 -translate-x-1/2 bottom-2 overflow-y-scroll'>

                <div className='flex-1 px-5 py-7'>
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`${msg.role === 'user' ? 'text-right' : 'text-left'} my-3`}>
                            <div
                                className={`inline-block rounded-2xl py-2 text-(--color-text) text-lg px-5 wrap-break-word
                                ${msg.role === 'user' ? 'bg-(--color-chat)' : 'bg-(--color-comp)/10 prose'} relative group`}>
                                {msg.role === 'assistant' ? <Markdown>{msg.text}</Markdown> : msg.text}
                                <span
                                    title='Copy to Clipboard'
                                    onClick={() => copyTextToClipboard(msg.text)}
                                    className={`absolute -top-7 ${msg.role === 'user' ? 'right-5' : 'left-5'} opacity-0 group-hover:opacity-100 transition-all ease-linear duration-300 cursor-pointer hover:text-(--color-hovered)`}>
                                    <Copy size={20} />
                                </span>
                            </div>
                        </div>
                    ))}
                    {messages.length === 0 &&
                        <div className='flex justify-center'>
                            <h3 className='text text-(--color-text) max-md:text-xl lg:text-3xl'> <TypeAnimation
                                sequence={[
                                    'Ready when you are.',
                                    2000,
                                    'Where should we begin?',
                                    2000,
                                    'What are you working on?',
                                    2000,
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                            /></h3>
                        </div>
                    }
                    {loading && (
                        <div className='text-left my-3'>
                            <Loader className='loader-animate ml-1' color='white' />
                        </div>
                    )}
                </div>

                <div className='sticky bottom-0 w-full px-5 pb-5'>
                    <textarea
                        rows={1}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='Enter your text here'
                        className='w-full bg-(--color-chat) rounded-2xl text-(--color-text) outline-none text-lg py-5 px-7 pr-16 resize-none overflow-y-scroll max-h-50'
                        onInput={(e) => {
                            e.target.style.height = 'auto'
                            e.target.style.height = e.target.scrollHeight + 'px'
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault()
                                handleSend()
                            }
                        }}
                    />
                    <span
                        onClick={(e) => {
                            handleSend()
                        }}
                        className='absolute right-12 top-5.5 text-(--color-comp) hover:text-(--color-hovered) transition-all ease-linear hover:translate-x-1 cursor-pointer'>
                        {loading ? <Loader className='loader-animate' color='white' /> : <SendHorizontal />}
                    </span>
                </div>

            </section>
        </main>
    )
}

export default Home