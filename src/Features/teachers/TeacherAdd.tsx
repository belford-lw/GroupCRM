import { useState } from "react"
import { Button, Input } from "@mui/material"

interface TeacherForm {
  name: string
  surname: string
  phone: string
  subject: string
}

interface TeacherAddProps {
  refresh: () => void
}

export default function TeacherAdd({ refresh }: TeacherAddProps) {
  const [form, setForm] = useState<TeacherForm>({
    name: "",
    surname: "",
    phone: "",
    subject: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const addTeacher = async () => {
    if (!form.name || !form.surname || !form.phone || !form.subject) {
      alert("Iltimos, barcha maydonlarni to‘ldiring")
      return
    }

    try {
      const res = await fetch("http://localhost:3000/teachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      })

      if (!res.ok) throw new Error("Failed to add teacher")

      setForm({
        name: "",
        surname: "",
        phone: "",
        subject: ""
      })

      refresh() // Teacher ro'yxatini yangilash
    } catch (error) {
      console.error("Xatolik:", error)
    }
  }

  return (
    <div className="grid grid-cols-5 gap-4">
      <Input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <Input
        name="surname"
        placeholder="Surname"
        value={form.surname}
        onChange={handleChange}
      />
      <Input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
      />
      <Input
        name="subject"
        placeholder="Subject"
        value={form.subject}
        onChange={handleChange}
      />
      <Button
        onClick={addTeacher}
        variant="contained"
        color="success"
      >
        Add
      </Button>
    </div>
  )
}