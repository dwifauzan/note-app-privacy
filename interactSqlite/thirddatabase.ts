import { baseNote } from "./databaseNote";
import { dataNote } from "./univInterface";

const handleCreateNote = async (sendNote: dataNote) => {
    const responseBase = await baseNote.create(sendNote)
    console.log('aman')
    return 'aman'
} 


const thirdBaseNote = {
    invoke: [
        {
            name: "handleCreateNote",
            togo: handleCreateNote
        }
    ]
}

export {thirdBaseNote}