import { ArrowUpRight } from 'lucide-react';
import * as Radix from '@radix-ui/react-dialog'
import { ChangeEvent, FormEvent, useState } from 'react';
import { X } from 'lucide-react';
import { toast, Toaster } from 'sonner';

interface Props{
    newNota: (content: string) => void
}

export function NewNote({newNota}: Props) {
    const [showTextArea, setShowTextArea] = useState(false)
    const [content, setContent] = useState('')
    const [open, setOpen] = useState(false)

    function handleTextArea() {
        setShowTextArea(!showTextArea)
    }

    function handleChangeText(event: ChangeEvent<HTMLTextAreaElement>) {
        setContent(event.target.value)
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault()

        if (content != '') {
            toast.success('Nota salva com sucesso!')
            newNota(content)
        } else {
            toast.error('Escreva algo para salvar a nota...')
            return
        }

        setContent('')
        setOpen(false)
        setShowTextArea(false)
    }

    return (
        <Radix.Root open={open} onOpenChange={setOpen}>
            <Radix.Trigger>
                <div className="p-4 flex flex-col gap-2 rounded-lg bg-slate-700 relative h-56 overflow-hidden outline-gray-500 hover:outline transition-all">
                    <div className='absolute top-0 right-0 p-2 bg-slate-800 text-4xl text-slate-700'>
                        <ArrowUpRight />
                    </div>
                    <p className="text-start font-bold z-10">Adicionar nota</p>

                    <p className='text-start'>Grave um nota em áudio que será convertida para texto automaticamente.</p>
                </div>
            </Radix.Trigger>

            <Radix.Portal>
                <Radix.Overlay className='inset-0 fixed bg-black/70 z-20'>
                    <Radix.Content className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-700 rounded-lg overflow-hidden md:w-1/2 h-1/2 w-11/12 flex flex-col gap-4'>
                        <Radix.Close onClick={handleTextArea} id='close' className='absolute top-0 right-0 p-2 bg-slate-800 text-4xl text-slate-700 hover:text-lime-500 transition-all'>
                            <X />
                        </Radix.Close>

                        <form onSubmit={handleSubmit} className='h-full flex flex-col flex-1'>

                            <p className='p-4'>Adicionar nota</p>

                            {showTextArea ? <>
                                <textarea autoFocus onChange={handleChangeText} className="px-4 placeholder:text-slate-500 placeholder:text-sm text-slate-500 z-10 bg-transparent focus:outline-none resize-none h-full" />
                                <button className='bg-lime-500 py-2 hover:bg-lime-600 transition-all'>Salvar nota</button>
                            </> : (
                                <p className='h-full px-4'>Comece <button type='button' className='line-through text-lime-500 '>gravando um nota</button> em áudio ou se preferir <button className='text-lime-500 hover:underline' onClick={handleTextArea}>utilize apenas texto.</button></p>
                            )}
                        </form>
                    </Radix.Content>
                </Radix.Overlay>
                <Toaster toastOptions={{
                    unstyled: true,
                    classNames: {
                        error: 'bg-red-400 p-4 rounded-lg flex w-full items-center',
                        success: 'bg-green-400 p-4 rounded-lg flex w-full items-center',
                    },
                }} />
            </Radix.Portal>
        </Radix.Root>
    )
}