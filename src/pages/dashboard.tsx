// src/pages/Dashboard.tsx
import { UserButton } from '@clerk/clerk-react'

const Dashboard = () => {
  return (
    <div className="p-8 text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Bienvenue sur ton dashboard</h1>
        <UserButton />
      </div>
      <p className="mt-4">Tu es bien connecté</p>
    </div>
  )
}

export default Dashboard
