import * as Radix from '@radix-ui/react-dialog'
import { X } from 'lucide-react';
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale"

interface Props {
    note: {
        id: number,
        date: Date,
        text: string
    }
    deleteNote: (id: number) => void
}

export function CardNote({ note, deleteNote }: Props) {

    return (
        <Radix.Root>
            <Radix.Trigger>
                <div className="p-4 flex flex-col gap-2 rounded-lg bg-slate-800 relative h-56 outline-gray-500 hover:outline transition-all">
                    <p className="text-start font-bold z-10">
                        {formatDistanceToNow(note.date, {
                            locale: ptBR,
                            addSuffix: true,
                        })}
                    </p>

                    <p className="capitalize text-start text-slate-500 z-10">{note.text}</p>

                    <span className="bg-gradient-to-t to-slate-800 from-slate-950 w-full h-1/2 absolute left-0 bottom-0 z-0 rounded-lg overflow-hidden"></span>
                </div>
            </Radix.Trigger>

            <Radix.Portal>
                <Radix.Overlay className='inset-0 fixed bg-black/70 z-20'>
                    <Radix.Content className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-700 rounded-lg overflow-hidden md:w-1/2 h-1/2 w-11/12 flex flex-col gap-4'>
                        <Radix.Close className='absolute top-0 right-0 p-2 bg-slate-800 text-4xl text-slate-700 hover:text-lime-500 transition-all'>
                            <X />
                        </Radix.Close>

                        <p className='px-4 pt-4'>
                            {formatDistanceToNow(note.date, {
                                locale: ptBR,
                                addSuffix: true,
                            })}
                        </p>

                        <p className="capitalize px-4 placeholder:text-slate-500 placeholder:text-sm text-slate-500 z-10 bg-transparent focus:outline-none h-full">
                            {note.text}
                        </p>
                                
                        <button type='button' onClick={()=> deleteNote(note.id)} className='bg-slate-800 py-2 hover:bg-slate-900 transition-all'>Deseja <span className='text-red-500'>apagar esta nota?</span></button>

                    </Radix.Content>
                </Radix.Overlay>
            </Radix.Portal>
        </Radix.Root>
    )
}