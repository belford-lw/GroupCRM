import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, LogOut, Edit2, Trash2 } from 'lucide-react';
import ManagerAdd from '../Features/managers/ManagerAdd';
import ManagerEdit from '../Features/managers/ManagerEdit';
import ManagerDelete from '../Features/managers/ManagerDelete';
// @ts-ignore
import useAuthStore from '../store/authStore';

export interface Manager {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
}

const Managers = () => {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedManager, setSelectedManager] = useState<Manager | null>(null);

  const navigate = useNavigate();
  const token = useAuthStore((state: any) => state.accessToken);

  const fetchManagers = async () => {
    if (!token) {
      navigate('/');
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.get('http://localhost:3000/managers', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('GET /managers:', res.data);
      setManagers(res.data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        navigate('/');
      } else {
        toast.error("Ma'lumotlarni yuklashda xatolik yuz berdi");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchManagers();
  }, [token]);

  const handleLogout = () => {
    const logout = useAuthStore.getState().logout;
    logout();
  };

  const filteredManagers = managers.filter(m => {
    const fullName = `${m.firstName || ''} ${m.lastName || ''}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) ||
      m.phone?.includes(searchTerm);
  });

  return (
    <div className="p-6 bg-[#0f172a] min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manager Management</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-lg transition"
          >
            <Plus size={18} /> Add Manager
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      <div className="bg-[#1e293b] p-4 rounded-xl mb-6 border border-gray-700 relative">
        <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Qidirish (ism yoki telefon bo'yicha)..."
          className="w-full bg-[#0f172a] border border-gray-600 rounded-lg pl-12 pr-4 py-3 text-white outline-none focus:border-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-[#1e293b] rounded-xl overflow-hidden border border-gray-700 text-sm">
        <div className="grid grid-cols-3 bg-[#334155]/80 text-gray-300 uppercase text-xs font-bold tracking-widest px-7 py-4 w-full rounded-t-xl border-b border-gray-700">
          <div>Ism va Familiya</div>
          <div>Telefon</div>
          <div className="text-center">Actions</div>
        </div>
        <div className="flex flex-col divide-y divide-gray-700">
          {isLoading ? (
            <div className="p-8 text-center text-gray-400 w-full col-span-3">Yuklanmoqda...</div>
          ) : filteredManagers.length > 0 ? (
            filteredManagers.map((m) => (
              <div
                key={m.id}
                className="group grid grid-cols-3 px-5 py-4 items-center bg-transparent hover:bg-slate-700/30 transition-all duration-300 w-full cursor-pointer relative overflow-hidden"
              >
                {/* Subtle left glow effect on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-r-md"></div>

                <div className="truncate font-semibold text-gray-100 text-[16px] group-hover:text-indigo-300 transition-colors pl-2">
                  {m.firstName} {m.lastName}
                </div>
                <div className="text-gray-300 text-[15px] tracking-wide">{m.phone}</div>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => { setSelectedManager(m); setIsEditOpen(true); }}
                    className="p-1.5 text-blue-400 hover:bg-blue-400/10 rounded-lg transition"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => { setSelectedManager(m); setIsDeleteOpen(true); }}
                    className="p-1.5 text-red-400 hover:bg-red-400/10 rounded-lg transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-400 w-full col-span-3">Ma'lumot topilmadi</div>
          )}
        </div>
      </div>

      {isAddOpen && (
        <ManagerAdd
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          refresh={fetchManagers}
        />
      )}

      {isEditOpen && selectedManager && (
        <ManagerEdit
          isOpen={isEditOpen}
          manager={selectedManager}
          onClose={() => setIsEditOpen(false)}
          refresh={(updatedData?: any) => {
            if (updatedData) {
              setManagers(prev => prev.map(m => m.id === selectedManager.id ? { ...m, ...updatedData } : m));
            } else {
              fetchManagers();
            }
          }}
        />
      )}

      {isDeleteOpen && selectedManager && (
        <ManagerDelete
          isOpen={isDeleteOpen}
          manager={selectedManager}
          onClose={() => setIsDeleteOpen(false)}
          refresh={fetchManagers}
        />
      )}
    </div>
  );
};

export default Managers;