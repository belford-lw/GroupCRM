interface Manager {
  id: number;
  name: string;
  phone: string;
  email: string;
}

interface EditProps {
  isOpen: boolean;
  onClose: () => void;
  manager: Manager | null;
}

const ManagerEdit = ({ isOpen, onClose, manager }: EditProps) => {
  if (!isOpen || !manager) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1e293b] w-full max-w-md p-6 rounded-2xl border border-gray-700 shadow-2xl">
        <h2 className="text-xl font-semibold text-white mb-6">Menejerni tahrirlash</h2>
        
        <form className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm block mb-1">To'liq ismi</label>
            <input 
              type="text" 
              defaultValue={manager.name} 
              className="w-full bg-[#0f172a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-indigo-500 outline-none" 
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm block mb-1">Telefon raqami</label>
            <input 
              type="text" 
              defaultValue={manager.phone} 
              className="w-full bg-[#0f172a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-indigo-500 outline-none" 
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition"
            >
              Bekor qilish
            </button>
            <button 
              type="submit" 
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition font-medium"
            >
              Saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManagerEdit;