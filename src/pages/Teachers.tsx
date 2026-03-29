import { useEffect, useState } from "react"
import TeacherAdd from "../Features/teachers/TeacherAdd"
import TeacherEdit from "../Features/teachers/TeacherEdit"
import TeacherDelete from "../Features/teachers/TeacherDelete"

interface Teacher {
  id: number
  firstName: string
  lastName: string
  phone: string
  password: string
}

export default function Teachers() {

  const [teachers, setTeachers] = useState<Teacher[]>([])
  const getTeachers = async () => {
  console.log("GET TEACHERS ISHLADI")

  try {
    const token = localStorage.getItem("token")
    console.log("TOKEN:", token)

    console.log("FETCH BOSHLANDI")

    const res = await fetch(" http://localhost:3000/teachers", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    console.log("FETCH YUBORILDI")

    const data = await res.json()
    console.log("DATA:", data)

    setTeachers(data)

  } catch (err) {
    console.log("ERROR:", err)
  }
}

  useEffect(() => {
    getTeachers()
  }, [])

  return (

    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">
        Teachers
      </h1>

      <TeacherAdd refresh={getTeachers} />

      <table className="w-full border rounded-lg overflow-hidden">

        <thead className="bg-gray-700">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Surname</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Password</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>

          {Array.isArray(teachers) && teachers.map((teacher) => (
            <tr key={teacher.id} className="border-t">

              <td className="p-3">{teacher.firstName}</td>
              <td className="p-3">{teacher.lastName}</td>
              <td className="p-3">{teacher.phone}</td>
              <td className="p-3">{teacher.password}</td>

              <td className="flex gap-2 p-3">

                <TeacherEdit
                  teacher={teacher}
                  refresh={getTeachers}
                />

                <TeacherDelete
                  id={teacher.id}
                  refresh={getTeachers}
                />

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}