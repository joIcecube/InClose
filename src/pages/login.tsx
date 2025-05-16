import React, { useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import BackgroundEffects from '../components/BackgroundEffects'
import Button from '../components/ui/Button'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [isRegisterMode, setIsRegisterMode] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isRegisterMode && formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas')
      return
    }

    if (isRegisterMode) {
      console.log('Créer un compte avec', formData)
      // Exemple de redirection après inscription
      navigate('/welcome') // adapte la route
    } else {
      console.log('Connexion avec', formData)
      // Exemple de redirection après connexion
      navigate('/dashboard') // adapte la route
    }
  }

  return (
    <>
      <BackgroundEffects />
      <Header />
      <div className="min-h-screen flex items-center justify-center px-4 bg-transparent">
        <div className="w-full max-w-md bg-dark-lighter/80 backdrop-blur-md rounded-2xl shadow-xl p-8">
          <h2 className="text-white text-2xl font-semibold mb-6 text-center">
            {isRegisterMode ? 'Créer un compte' : 'Connexion'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-neon-green"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Mot de passe</label>
              <input
                type="password"
                name="password"
                required
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-neon-green"
              />
            </div>

            {isRegisterMode && (
              <div>
                <label className="block text-gray-300 mb-1">Confirmer le mot de passe</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-neon-green"
                />
              </div>
            )}

            <Button type="submit" fullWidth>
              {isRegisterMode ? 'Créer un compte' : 'Se connecter'}
            </Button>
          </form>

          <p className="text-gray-400 text-sm text-center mt-6">
            {isRegisterMode ? 'Déjà inscrit ?' : 'Pas encore de compte ?'}{' '}
            <button
              type="button"
              className="text-neon-green hover:underline"
              onClick={() => setIsRegisterMode(!isRegisterMode)}
            >
              {isRegisterMode ? 'Se connecter' : 'Créer un compte'}
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}
