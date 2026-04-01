import React, { useState } from 'react';
import axios from 'axios';

interface Props {
  teacher: any;
  onRefresh: () => void;
  onCancel: () => void;
}

const TeacherEdit: React.FC<Props> = ({ teacher, onRefresh, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: teacher.firstName,
    lastName: teacher.lastName,
    phone: teacher.phone,
    monthSalary: teacher.monthSalary,
    photoUrl: teacher.photoUrl
  });

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3000/teachers/${teacher.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onRefresh();
      onCancel();
    } catch (error) {
      console.error("Tahrirlashda xato:", error);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-2 bg-blue-50 rounded">
      <input 
        className="border p-1 text-sm" 
        value={formData.firstName} 
        onChange={(e) => setFormData({...formData, firstName: e.target.value})} 
        placeholder="Ism"
      />
      <input 
        className="border p-1 text-sm" 
        value={formData.lastName} 
        onChange={(e) => setFormData({...formData, lastName: e.target.value})} 
        placeholder="Familya"
      />
      <div className="flex gap-2">
        <button onClick={handleUpdate} className="bg-green-600 text-white px-2 py-1 rounded text-xs">Saqlash</button>
        <button onClick={onCancel} className="bg-gray-400 text-white px-2 py-1 rounded text-xs">Bekor qilish</button>
      </div>
    </div>
  );
};

export default TeacherEdit;