interface DeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ManagerDelete = ({ isOpen, onClose, onConfirm }: DeleteProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1e293b] p-6 rounded-2xl border border-red-900/30 max-w-sm w-full text-center shadow-2xl">
        <div className="bg-red-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
           <span className="text-red-500 text-3xl font-bold">!</span>
        </div>
        <h2 className="text-white text-xl font-semibold mb-2">O'chirishni tasdiqlang</h2>
        <p className="text-gray-400 text-sm mb-6">
          Haqiqatan ham ushbu menejerni tizimdan o'chirib tashlamoqchimisiz?
        </p>
        
        <div className="flex gap-3">
          <button 
            onClick={onClose} 
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition"
          >
            Bekor qilish
          </button>
          <button 
            onClick={onConfirm} 
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition font-medium"
          >
            Ha, o'chirilsin
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagerDelete;