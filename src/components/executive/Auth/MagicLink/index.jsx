import React, { useState } from 'react'
import toast from 'react-hot-toast' // mantém a notificação
import Loader from '../../Common/Loader' // seu componente loader
import { validateEmail } from '../../../../utils/validateEmail' // ajusta o path

const MagicLink = () => {
  const [email, setEmail] = useState('')
  const [loader, setLoader] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      return toast.error('Please enter your email address.')
    }

    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email address.')
    }

    try {
      setLoader(true)

      // Aqui você pode chamar sua API backend para enviar o magic link
      // Exemplo fictício:
      const response = await fetch('http://localhost:4000/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        toast.success('Email sent!')
        setEmail('')
      } else {
        toast.error('Unable to send email!')
      }
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong!')
    } finally {
      setLoader(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-[22px]">
        <input
          type="email"
          placeholder="Email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
          className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
        />
      </div>

      <div className="mb-9">
        <button
          type="submit"
          disabled={loader}
          className="flex w-full cursor-pointer items-center justify-center rounded-md border border-primary bg-[#102C46] px-5 py-3 text-base text-white transition duration-300 ease-in-out hover:bg-[#102C46] disabled:opacity-50"
        >
          {loader ? <Loader /> : 'Send Magic Link'}
        </button>
      </div>
    </form>
  )
}

export default MagicLink
