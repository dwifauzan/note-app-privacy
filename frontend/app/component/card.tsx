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
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState<getDatabase | null>(null);

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

    const handleDeleteClick = (note: getDatabase) => {
        setNoteToDelete(note);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (noteToDelete) {
            try {
                console.log('BloopAPI:', window.BloopAPI); // Cek apakah BloopAPI ada
                console.log('handleDelete:', window.BloopAPI.handleDelete); // Cek apakah handleDelete ada
                await window.BloopAPI.handleDelete(noteToDelete.id);
                await handleGetData(); // Refresh data setelah menghapus
                setIsDeleteModalOpen(false);
                setNoteToDelete(null);
            } catch (error) {
                console.log('error deleting note:', error);
            }
        }
    };

    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
        setNoteToDelete(null);
    };

    return (
        <div className="flex flex-wrap gap-4"> {/* Wadah flexbox */}
            {notes.map((note) => (
                <div
                    key={note.id}
                    className="w-80 h-auto p-4 flex-col bg-gray-700 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
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
                    <div className="flex gap-2 mt-3">
                        <button
                            onClick={() => handleOpenCard(note)}
                            type="button"
                            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2 text-center inline-flex items-center"
                        >
                            Open Card
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </button>
                        <button
                            onClick={() => handleDeleteClick(note)}
                            type="button"
                            className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-md text-sm px-4 py-2 text-center inline-flex items-center"
                        >
                            Delete
                            <svg className="w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
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

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && noteToDelete && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-6 max-w-sm w-full">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Confirm Deletion
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                            Are you sure you want to delete "{noteToDelete.title}"? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={handleCancelDelete}
                                className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default card