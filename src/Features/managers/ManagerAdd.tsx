
interface ManagerAddProps {
  isOpen: boolean;
  onClose: () => void;
}

const ManagerAdd = ({ isOpen, onClose }: ManagerAddProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1e293b] p-6 rounded-xl w-full max-w-md border border-gray-700">
        <h2 className="text-xl text-white mb-4">Add New Manager</h2>
        
        {/* Form elementlari shu yerda bo'ladi */}
        <div className="space-y-4">
          <input type="text" placeholder="Name" className="w-full p-2 bg-[#0f172a] border border-gray-600 rounded" />
          <input type="text" placeholder="Phone" className="w-full p-2 bg-[#0f172a] border border-gray-600 rounded" />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-gray-400">Cancel</button>
          <button className="px-4 py-2 bg-indigo-600 rounded text-white">Save</button>
        </div>
      </div>
    </div>
  );
};

export default ManagerAdd;