import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function TeacherAdd({refresh}:any){

  const [form,setForm] = useState({
    name:"",
    surname:"",
    phone:"",
    subject:""
  })

  const handleChange=(e:any)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  const addTeacher = async ()=>{

    await fetch("http://localhost:3000/teachers",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(form)
    })

    setForm({
      name:"",
      surname:"",
      phone:"",
      subject:""
    })

    refresh()
  }

  return(

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

      <Button onClick={addTeacher} style={{background:"green"}}>
        Add
      </Button>

    </div>
  )
}