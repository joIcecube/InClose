import { SignUp } from '@clerk/clerk-react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import BackgroundEffects from '../components/BackgroundEffects'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-dark text-white relative flex flex-col">
      <BackgroundEffects />

      <Header />

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <SignUp
            routing="path"
            path="/sign-up"
            appearance={{
              variables: {
                colorPrimary: '#00ff95',
                colorText: '#ffffff',
                colorBackground: '#1f1f1f',
                colorInputBackground: '#2a2a2a',
                colorInputText: '#ffffff',
                colorDanger: '#ff4d4f',
                fontFamily: 'Garet, sans-serif',
              },
              elements: {
                card: 'shadow-xl rounded-2xl p-8 border border-gray-700 bg-dark-lighter/80 backdrop-blur-md',
                headerTitle: 'text-3xl font-semibold mb-4 text-center text-white',
                headerSubtitle: 'text-sm text-gray-400 mb-6 text-center',
                formFieldLabel: 'text-sm font-medium text-gray-300',
                formFieldInput:
                  'bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-neon-green text-white',
                formButtonPrimary:
                  'bg-neon-green hover:bg-green-400 text-black py-2 px-4 rounded-lg mt-4 w-full',
                socialButtonsBlockButton:
                  'bg-gray-800 text-white border border-gray-600 hover:bg-gray-700',
                dividerText: 'text-gray-400',
              },
            }}
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}


