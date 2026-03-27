import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { X, AlertTriangle } from 'lucide-react';
import { Manager } from '../../pages/Managers';
// @ts-ignore
import useAuthStore from '../../store/authStore';

interface ManagerDeleteProps {
  isOpen: boolean;
  manager: Manager;
  onClose: () => void;
  refresh: () => void;
}

const ManagerDelete: React.FC<ManagerDeleteProps> = ({ isOpen, manager, onClose, refresh }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = useAuthStore((state: any) => state.accessToken);

  if (!isOpen) return null;

  const handleDelete = async () => {
    if (!token) {
      navigate('/');
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`http://localhost:3000/managers/${manager.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Manager muvaffaqiyatli o'chirildi!");
      refresh();
      onClose();
    } catch (error: any) {
      if (error.response?.status === 401) {
        navigate('/');
      } else {
        toast.error("Xatolik yuz berdi");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-[#1e293b] w-full max-w-sm rounded-xl shadow-xl overflow-hidden border border-gray-700">
        <div className="flex justify-between items-center p-5 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <AlertTriangle className="text-red-500" size={24} /> O'chirish
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X size={20} />
          </button>
        </div>
        <div className="p-5">
          <p className="text-gray-300">
            Haqiqatan ham <span className="font-semibold text-white">{manager.firstName} {manager.lastName}</span> ismli managerni o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.
          </p>
          <div className="flex justify-end gap-3 mt-6">
            <button 
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
            >
              Bekor qilish
            </button>
            <button 
              onClick={handleDelete}
              disabled={loading}
              className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-lg transition"
            >
              {loading ? "O'chirilmoqda..." : "O'chirish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDelete;