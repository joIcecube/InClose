import { SignUp } from '@clerk/clerk-react'

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <SignUp
        routing="path"
        path="/sign-up"
        appearance={{
          elements: {
            card: 'shadow-lg rounded-xl p-6',
            headerTitle: 'text-2xl font-semibold text-center',
            formButtonPrimary: 'bg-green-600 hover:bg-green-700',
          },
        }}
      />
    </div>
  )
}
