'use client'

import { Button } from '@/app/components/Button'
import { FieldInput } from '@/app/components/FieldInput'
import Link from 'next/link'
import { useForm, FormProvider, SubmitHandler, FieldValues } from 'react-hook-form'

type FormData = {
  email: string
  password: string
}

const Page = () => {
  const methods = useForm<FormData>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Submitted Data:', data)
  }

  return (
    <main className='flex items-center justify-center bg-gray-300 p-24 min-h-screen'>
      <section className='flex flex-col gap-4 '>
        <div className='flex flex-col gap-4 justify-center items-start w-full md:min-w-[440px] p-6 bg-white rounded-lg'>
          <h1 className='font-bold text-xl'>Login With Email</h1>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className='flex flex-col gap-4 justify-center items-center w-full'>
            <div className='w-full flex flex-col gap-4'>
            <FieldInput
                name="email"
                placeholder="Enter your Email"
                type="email"
                classNames={{inputContainerClassName:"rounded-lg'"}}
                required
              />
              <FieldInput
                name="password"
                placeholder="Enter your Password"
                classNames={{inputContainerClassName:"rounded-lg'"}}
                type="password"
                required
              />
            </div>
              <Button type="submit" className='!w-full rounded-lg'>Login</Button>
            </form>
          </FormProvider>   
          <div className='flex w-full justify-between text-sm text-gray-600 font-semibold'>
          <Link href={"/sign-up"}>
          New? Create Account
          </Link>
          <Link href={"/forget-password"}>
          Forget Password
          </Link>
          </div>
          <div className='h-[1px] w-full border-solid border-b-[1px] border-gray-300'/>
          <Button className='w-full !bg-gray-300 !text-black !text-[14px] rounded-lg'>Sign In With Goggle</Button>
        </div>
      </section>
    </main>
  )
}

export default Page

// authentication
// firestore database
// storage