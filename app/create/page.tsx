'use client'

import { v4 as uuidv4 } from 'uuid';
import { useForm } from "react-hook-form";
import { Icon, NavigateHome } from "@/components";
import { useTasksContext } from "@/context/TasksContext";
import { useRouter } from 'next/navigation';

export default function Create() {
  const { addTask } = useTasksContext()
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm()
  const router = useRouter()

  function handleAddTask(create) {
    const { create: title } = create

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
      <NavigateHome title={['Create', 'Task']} />
      <main className="text-[18px] mt-[259px] mx-[12px]">
        <h4>Task title</h4>
        <form onSubmit={handleSubmit(handleAddTask)} className="flex flex-col">
          <div className="mt-[10px] bg-task-to-do w-full flex px-4 py-[22px] rounded">
            <Icon />
            <label htmlFor="create" className="flex-1 pl-[25px]">
              <input type="text" 
                id="create" 
                className="w-full bg-transparent placeholder:font-semibold outline-none"
                placeholder="Type here"
                {...register('create', { required: true })}
              />
            </label>
          </div>
          {errors.create && <span className="text-red-500 font-600 mx-auto text-xs">This field is required</span>}
          <button disabled={ isSubmitSuccessful || isSubmitting } type="submit" className={`min-h-[76px] mt-[225px] min-w-full rounded-lg bg-task-done text-white shadow-purple disabled:cursor-not-allowed disabled:opacity-30`}>
            Create task
          </button>
        </form>
      </main>
  </div>
  )
}