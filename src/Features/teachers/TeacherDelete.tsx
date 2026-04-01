import React from 'react';
import axios from 'axios';
import useAuthStore from '../../store/authStore.js';

interface Props { id: string; onRefresh: () => void; }

const TeacherDelete: React.FC<Props> = ({ id, onRefresh }) => {
  const accessToken = useAuthStore((state: any) => state.accessToken);

  const handleDelete = async () => {
    if (!window.confirm("O'chirilsinmi?")) return;
    try {
      await axios.delete(`http://localhost:3000/teachers/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      onRefresh();
    } catch (err) { alert("Xatolik yuz berdi!"); }
  };

  return <button onClick={handleDelete} className="text-red-500 hover:underline">O'chirish</button>;
};

export default TeacherDelete;