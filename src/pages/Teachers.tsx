import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuthStore from '../store/authStore.js'; 
import TeacherAdd from '../Features/teachers/TeacherAdd';
import TeacherDelete from '../Features/teachers/TeacherDelete';
import TeacherEdit from '../Features/teachers/TeacherEdit';

const Teachers: React.FC = () => {
  // Boshlang'ich qiymat doim bo'sh massiv bo'lsin
  const [teachers, setTeachers] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const accessToken = useAuthStore((state: any) => state.accessToken);

  const fetchTeachers = async () => {
    if (!accessToken) return;
    try {
      const response = await axios.get('http://localhost:3000/teachers', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      // MUHIM: Backenddan kelayotgan ma'lumotni tekshiramiz
      // Agar response.data o'zi massiv bo'lsa uni olamiz, 
      // agar obyekt ichida kelsa (masalan response.data.teachers), o'shani olamiz.
      const data = Array.isArray(response.data) 
        ? response.data 
        : (response.data.teachers || response.data.data || []);
      
      setTeachers(data);
    } catch (error: any) {
      console.error("Xatolik:", error);
      setTeachers([]); // Xato bo'lsa map buzilmasligi uchun bo'sh massiv
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [accessToken]);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">O'qituvchilar Paneli</h1>

      <TeacherAdd onRefresh={fetchTeachers} />

      <div className="bg-white rounded-xl shadow-lg border overflow-hidden mt-6">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Rasm</th>
              <th className="p-4 font-semibold text-gray-600">F.I.SH</th>
              <th className="p-4 font-semibold text-gray-600 text-right">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* .map funksiyasidan oldin Array.isArray tekshiruvini qo'shdik */}
            {Array.isArray(teachers) && teachers.length > 0 ? (
              teachers.map((teacher) => (
                <tr key={teacher.id || teacher._id} className="hover:bg-gray-50 transition">
                  <td className="p-4">
                    <img 
                      src={teacher.photoUrl || 'https://via.placeholder.com/40'} 
                      alt="" 
                      className="w-10 h-10 rounded-full border object-cover" 
                    />
                  </td>
                  <td className="p-4 font-medium text-gray-800">
                    {editingId === (teacher.id || teacher._id) ? (
                      <TeacherEdit 
                        teacher={teacher} 
                        onRefresh={fetchTeachers} 
                        onCancel={() => setEditingId(null)} 
                      />
                    ) : (
                      `${teacher.firstName} ${teacher.lastName}`
                    )}
                  </td>
                  <td className="p-4 text-right space-x-3">
                    {editingId !== (teacher.id || teacher._id) && (
                      <>
                        <button 
                          onClick={() => setEditingId(teacher.id || teacher._id)} 
                          className="text-blue-600 hover:underline"
                        >
                          Tahrirlash
                        </button>
                        <TeacherDelete id={teacher.id || teacher._id} onRefresh={fetchTeachers} />
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-10 text-center text-gray-400">
                  Ma'lumot topilmadi yoki yuklanmoqda...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teachers;