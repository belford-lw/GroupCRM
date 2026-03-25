import  { useState } from 'react';
import ManagerAdd from '../Features/managers/ManagerAdd';
import ManagerEdit from '../Features/managers/ManagerEdit';
import ManagerDelete from '../Features/managers/ManagerDelete';

interface Manager {
  id: number;
  name: string;
  phone: string;
  email: string;
}

const initialData: Manager[] = [
  { id: 1, name: "Ali Valiyev", phone: "+998 90 123 45 67", email: "ali@crm.uz" },
  { id: 2, name: "Olim Hakimov", phone: "+998 93 444 55 66", email: "olim@crm.uz" },
];

const Managers = () => {
  const [managers, setManagers] = useState<Manager[]>(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  const [selectedManager, setSelectedManager] = useState<Manager | null>(null);

  // Qidiruv funksiyasi
  const filteredManagers = managers.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.phone.includes(searchTerm)
  );

  // O'chirishni tasdiqlash funksiyasi
  const handleDelete = () => {
    if (selectedManager) {
      setManagers(managers.filter(m => m.id !== selectedManager.id));
      setIsDeleteOpen(false);
      setSelectedManager(null);
    }
  };

  return (
    <div className="p-6 bg-[#0f172a] min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manager Management</h1>
        <button 
          onClick={() => setIsAddOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-lg transition"
        >
          + Add Manager
        </button>
      </div>

      <div className="bg-[#1e293b] p-4 rounded-xl mb-6 border border-gray-700">
        <input 
          type="text" 
          placeholder="Qidirish..." 
          className="w-full bg-[#0f172a] border border-gray-600 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-[#1e293b] rounded-xl overflow-hidden border border-gray-700 text-sm">
        <table className="w-full text-left">
          <thead className="bg-[#334155] text-gray-300 uppercase text-[10px] tracking-wider">
            <tr>
              <th className="p-4">Full Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredManagers.map((m) => (
              <tr key={m.id} className="hover:bg-[#334155]/50 transition">
                <td className="p-4">{m.name}</td>
                <td className="p-4 text-gray-400">{m.phone}</td>
                <td className="p-4 text-center space-x-4">
                  <button onClick={() => { setSelectedManager(m); setIsEditOpen(true); }} className="text-blue-400 hover:underline">Edit</button>
                  <button onClick={() => { setSelectedManager(m); setIsDeleteOpen(true); }} className="text-red-400 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ManagerAdd isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
      
      <ManagerEdit 
        isOpen={isEditOpen} 
        manager={selectedManager} 
        onClose={() => setIsEditOpen(false)} 
      />

      <ManagerDelete 
        isOpen={isDeleteOpen} 
        onClose={() => setIsDeleteOpen(false)} 
        onConfirm={handleDelete} 
      />
    </div>
  );
};

export default Managers;