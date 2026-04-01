import React, { useState } from 'react';
import axios from 'axios';
import useAuthStore from '../../store/authStore.js';

interface Props {
  onRefresh: () => void;
}

const TeacherAdd: React.FC<Props> = ({ onRefresh }) => {
  const accessToken = useAuthStore((state: any) => state.accessToken);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    password: '',
    monthlySalary: '',
    photoUrl: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Parol uzunligini frontendda tekshiramiz
    if (formData.password.length < 6) {
      alert("Parol kamida 6 ta belgidan iborat bo'lishi shart!");
      return;
    }

    if (!accessToken) {
      alert("Tizimga kirmagansiz!");
      return;
    }

    // 2. Payloadni backend talabiga moslaymiz
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      password: formData.password,
      // Backend "number string" kutayotgani uchun Number() qilmaymiz, 
      // shunchaki stringligicha qoladi (masalan: "5000000")
      monthlySalary: formData.monthlySalary, 
      photoUrl: formData.photoUrl
    };

    try {
      await axios.post('http://localhost:3000/teachers', payload, {
        headers: { 
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        password: '',
        monthlySalary: '',
        photoUrl: ''
      });

      onRefresh();
      alert("Muvaffaqiyatli qo'shildi!");
    } catch (error: any) {
      console.error("Xato tafsiloti:", error.response?.data);
      alert(`Xato: ${error.response?.data?.message || "Saqlashda xato"}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-6 border">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Yangi o'qituvchi qo'shish</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        <input name="firstName" placeholder="Ism" value={formData.firstName} onChange={handleChange} className="border p-2 rounded outline-none focus:ring-1 focus:ring-blue-500 text-black" required />
        <input name="lastName" placeholder="Familya" value={formData.lastName} onChange={handleChange} className="border p-2 rounded outline-none focus:ring-1 focus:ring-blue-500 text-black" required />
        <input name="phone" placeholder="Telefon" value={formData.phone} onChange={handleChange} className="border p-2 rounded outline-none focus:ring-1 focus:ring-blue-500 text-black" required />
        
        {/* Password maydoni uchun minimal uzunlik */}
        <input 
          type="password" 
          name="password" 
          placeholder="Parol (kamida 6 ta belgi)" 
          value={formData.password} 
          onChange={handleChange} 
          className="border p-2 rounded outline-none focus:ring-1 focus:ring-blue-500 text-black" 
          minLength={6}
          required 
        />
        
        <input 
          type="number" 
          name="monthlySalary" 
          placeholder="Oylik maoshi (faqat raqam yozing)" 
          value={formData.monthlySalary} 
          onChange={handleChange} 
          className="border p-2 rounded outline-none focus:ring-1 focus:ring-blue-500 text-black" 
          required 
        />
        
        <input name="photoUrl" placeholder="Rasm URL" value={formData.photoUrl} onChange={handleChange} className="border p-2 rounded outline-none focus:ring-1 focus:ring-blue-500 text-black" />

        <button type="submit" className="lg:col-span-3 bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition active:scale-95">
          Saqlash
        </button>
      </form>
    </div>
  );
};

export default TeacherAdd;