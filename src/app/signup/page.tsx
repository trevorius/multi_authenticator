import SignUpForm from "@/components/login/SignupForm"



export default function SignUpPage({
  searchParams
}: {
  searchParams: { message: string }
}) {
  return (
    <div>
      <SignUpForm searchParams={searchParams}/>
    </div>
  )
}