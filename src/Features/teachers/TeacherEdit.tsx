import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const token = localStorage.getItem("token")

export default function TeacherEdit({teacher,refresh}:any){

  const [name,setName] = useState(teacher.name)

  const updateTeacher = async () => {

    await fetch(`http://localhost:3000/teachers/${teacher.id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({name})
    })

    refresh()
  }

  return(
    <div className="flex gap-2">

      <Input
        value={name}
        onChange={(e)=>setName(e.target.value)}
        className="w-32"
      />

      <Button size="sm" onClick={updateTeacher}>
        Save
      </Button>

    </div>
  )
}