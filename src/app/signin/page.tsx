import SignInForm from '@/components/login/SignInForm'
import SignupResult from '@/components/login/SignupResult'
export default function SignInPage({searchParams}: {searchParams: {message: string}}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
          <SignupResult message={searchParams.message} />
      <SignInForm />
    </div>
  )
}