import { Button } from "@/components/ui/button"

const token = localStorage.getItem("token")

export default function TeacherDelete({id,refresh}:any){

  const deleteTeacher = async ()=>{

    await fetch(`http://localhost:3000/teachers/${id}`,{
      method:"DELETE",
      headers:{
      Authorization:`Bearer ${token}`
    }
    })

    refresh()
  }

  return(

    <Button
      variant="destructive"
      size="sm"
      onClick={deleteTeacher}
    >
      Delete
    </Button>

  )
}