'use client'

import { GoogleLogo } from '@/app/assets'
import { Button } from '@/app/components/Button'
import { FieldInput } from '@/app/components/FieldInput'
import { useAuth } from '@/context/AuthContext'
import { auth } from '@/lib/auth/firestore/fierbase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues
} from 'react-hook-form'
import { toast } from 'react-hot-toast'

type FormData = {
  email: string
  password: string
}

const Page = () => { 
  const {user} = useAuth();
  const router = useRouter()
  useEffect(()=>{
    if(user){
      router.push("/dashboard")
    }
  },[user])
  const methods = useForm<FormData>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FormData> = data => {
    console.log('Submitted Data:', data)
  }

  return (
    <main className='flex items-center justify-center bg-gray-300 p-24 min-h-screen'>
      <section className='flex flex-col gap-4 '>
        <div className='flex flex-col gap-4 justify-center items-start w-full md:min-w-[440px] p-6 bg-white rounded-lg'>
          <h1 className='font-bold text-xl'>Login With Email</h1>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className='flex flex-col gap-4 justify-center items-center w-full'
            >
              <div className='w-full flex flex-col gap-4'>
                <FieldInput
                  name='email'
                  placeholder='Enter your Email'
                  type='email'
                  classNames={{ inputContainerClassName: "rounded-lg'" }}
                  required
                />
                <FieldInput
                  name='password'
                  placeholder='Enter your Password'
                  classNames={{ inputContainerClassName: "rounded-lg'" }}
                  type='password'
                  required
                />
              </div>
              <Button type='submit' className='!w-full rounded-lg'>
                Login
              </Button>
            </form>
          </FormProvider>
          <div className='flex w-full justify-between text-sm text-gray-600 font-semibold'>
            <Link href={'/sign-up'}>New? Create Account</Link>
            <Link href={'/forget-password'}>Forget Password</Link>
          </div>
          <div className='h-[1px] w-full border-solid border-b-[1px] border-gray-300' />
          <SignInWithGoogle />
        </div>
      </section>
    </main>
  )
}

export default Page

const SignInWithGoogle = () => {
  const [isLoading, setIsLoading] = useState(false)
  const handleLogin = async () => {
    setIsLoading(true)
    try {
      const user = await signInWithPopup(auth, new GoogleAuthProvider())
    } catch (error: any) {
      toast.error(error?.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button
        disabled={isLoading}
        loading={isLoading}
        onClick={handleLogin}
        className='w-full !bg-gray-300 !text-black !text-[14px] rounded-lg'
      >
        <GoogleLogo className="h-4 w-4"/> Sign In With Goggle
      </Button>
    </>
  )
}
