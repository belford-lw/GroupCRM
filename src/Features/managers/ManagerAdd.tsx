import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
// @ts-ignore
import useAuthStore from '../../store/authStore';

interface ManagerAddProps {
  isOpen: boolean;
  onClose: () => void;
  refresh: () => void;
}

const ManagerAdd: React.FC<ManagerAddProps> = ({ isOpen, onClose, refresh }) => {
  const [formData, setFormData] = useState({ 
    firstName: '', 
    lastName: '', 
    phone: '', 
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = useAuthStore((state: any) => state.accessToken);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      navigate('/');
      return;
    }

    try {
      setLoading(true);
      const payload: any = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        password: formData.password,
        monthlySalary: 0 // DTO talab qilgani uchun doim default jo'natiladi
      };

      await axios.post('http://localhost:3000/managers', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Manager muvaffaqiyatli qo'shildi!");
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
      <div className="bg-[#1e293b] w-full max-w-md rounded-xl shadow-xl overflow-hidden border border-gray-700">
        <div className="flex justify-between items-center p-5 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Yangi manager qo'shish</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Ism</label>
              <input 
                required
                type="text" 
                className="w-full bg-[#0f172a] border border-gray-600 rounded-lg px-4 py-2 text-white outline-none focus:border-indigo-500"
                value={formData.firstName}
                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Familiya</label>
              <input 
                required
                type="text" 
                className="w-full bg-[#0f172a] border border-gray-600 rounded-lg px-4 py-2 text-white outline-none focus:border-indigo-500"
                value={formData.lastName}
                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Telefon (+998...)</label>
            <input 
              required
              type="text" 
              placeholder="+998"
              className="w-full bg-[#0f172a] border border-gray-600 rounded-lg px-4 py-2 text-white outline-none focus:border-indigo-500"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Parol</label>
            <input 
              required
              type="password" 
              className="w-full bg-[#0f172a] border border-gray-600 rounded-lg px-4 py-2 text-white outline-none focus:border-indigo-500"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
            >
              Bekor qilish
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg transition"
            >
              {loading ? "Qo'shilmoqda..." : "Saqlash"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManagerAdd;