export default function Modal({ title, onClose, children }) {
    return (
        <div 
            className="fixed inset-0 z-10 flex items-center justify-center bg-black/40 p-4"
            onClick={onClose}
        >
            <div 
                className="w-full max-w-md rounded-xl bg-white p-5"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-semibold">{title}</h2>
                    <button onClick={onClose} className="text-xl loading-none text-gray-400 hover:text-gray-600">
                        x
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}