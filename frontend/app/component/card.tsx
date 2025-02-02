import { useEffect, useState } from "react"

interface getDatabase {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

const card = () => {
    const [notes, setNote] = useState<getDatabase[]>([])
    const [selectedNote, setSelectedNote] = useState<getDatabase | null>(null); // State untuk note yang dipilih
    const [isModalOpen, setIsModalOpen] = useState(false); // State untuk status modal
    const handleGetData = async () => {
        try {
            const getData = await window.BloopAPI.handleFindAll()
            console.log(getData)
            setNote(getData)
        } catch (error) {
            console.log('error ini ', error)
        }
    }
    useEffect(() => {
        handleGetData()
    }, [])

    const handleOpenCard = (note: getDatabase) => {
        setSelectedNote(note); // Set note yang dipilih
        setIsModalOpen(true); // Buka modal
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Tutup modal
        setSelectedNote(null); // Reset selected note
    };
    return (
        <div className="flex flex-wrap gap-4"> {/* Wadah flexbox */}
            {notes.map((note) => (
                <div
                    key={note.id}
                    className="w-96 h-72 p-3 flex-col bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
                >
                    {/* Isi card (judul, konten, tanggal) tetap sama */}
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {note.title}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
                        {note.content}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Dibuat: {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Diubah: {new Date(note.updatedAt).toLocaleDateString()}
                    </p>
                    <button onClick={() => handleOpenCard(note)} type="button" className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Open Card
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button>
                </div>
            ))}
            {notes.length === 0 && <p>Loading data or no notes available.</p>}

              {/* Modal */}
              {isModalOpen && selectedNote && ( // Tampilkan modal jika isModalOpen true dan selectedNote tidak null
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 p-7">
                    <div className="relative p-4 w-full max-w-xl max-h-full bg-white rounded-lg shadow-sm dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {selectedNote.title} {/* Tampilkan judul note di modal */}
                            </h3>
                            <button
                                type="button"
                                onClick={handleCloseModal} // Tutup modal saat tombol close diklik
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="p-6 space-y-6 overflow-y-auto max-h-96 flex flex-wrap">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                {selectedNote.content} {/* Tampilkan konten note di modal */}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default card