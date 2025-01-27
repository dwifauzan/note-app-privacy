import { baseNote } from "./databaseNote";
const handleCreateNote = async (sendNote) => {
    const responseBase = await baseNote.create(sendNote);
    console.log('aman');
    return 'aman';
};
const thirdBaseNote = {
    invoke: [
        {
            name: "handleCreateNote",
            togo: handleCreateNote
        }
    ]
};
export { thirdBaseNote };
