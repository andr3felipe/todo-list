'use client'

import { v4 as uuidv4 } from 'uuid';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { TaskIcon, NavigateHome } from "@/components";
import { useTasksContext } from "@/context/TasksContext";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';

export default function Create() {
  const { addTask } = useTasksContext()
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm()
  const router = useRouter()

  const handleAddTask: SubmitHandler<FieldValues> = ({create}) => {
    const title = create

    const task = {
        id: uuidv4(),
        title,
        isDone: false
      }
  
    addTask(task)
    
    router.push('/')
  }

  return (
    <div className="p-[30px] pl-[18px] max-w-7xl mx-auto">
      <NavigateHome >
        Create <br /> task
      </NavigateHome>
      <main className="text-[18px] mt-[259px] mx-[12px]">
        <h4>Task title</h4>
        <form onSubmit={handleSubmit(handleAddTask)} className="flex flex-col">
          <div className="mt-[10px] bg-task-to-do w-full flex px-4 py-[22px] rounded">
            <TaskIcon />
            <label htmlFor="create" className="flex-1 pl-[25px]">
              <input 
                autoComplete='off'
                type="text" 
                id="create" 
                className="w-full bg-transparent outline-none placeholder:font-semibold"
                placeholder="Type here"
                {...register('create', { required: true })}
              />
            </label>
          </div>
          {errors.create && <span className="mx-auto text-xs text-red-500 font-600">This field is required</span>}
          <Button disabled={ isSubmitSuccessful || isSubmitting }>
            Create task
          </Button>
        </form>
      </main>
  </div>
  )
}