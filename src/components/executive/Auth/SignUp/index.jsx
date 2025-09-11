import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import SocialSignUp from '../SocialSignUp'
import Logo from '../../Layout/Header/Logo'
import Loader from '../../Common/Loader'
import { UserAuth } from '../../../../context/AuthContext'

const SignUp = () => {
  const navigate = useNavigate()
  const { signUpNewUser } = UserAuth() // 👈 do contexto
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const data = new FormData(e.currentTarget)
    const value = Object.fromEntries(data.entries())
    const { email, password, name } = value

    const { success, error } = await signUpNewUser(email, password)

    if (success) {
      toast.success('Successfully registered')
      setLoading(false)
      navigate('/signin') // depois de criar conta vai para login
    } else {
      toast.error(error?.message || 'Error registering user')
      setLoading(false)
    }
  }

  return (
    <>
      <div className="mb-10 text-center mx-auto inline-block max-w-[160px]">
        <Logo />
      </div>

      <SocialSignUp />

      <span className="z-1 relative my-8 block text-center before:content-[''] before:absolute before:h-px before:w-[40%] before:bg-black/60 before:left-0 before:top-3 after:content-[''] after:absolute after:h-px after:w-[40%] after:bg-black/60 after:top-3 after:right-0">
        <span className="relative z-10 inline-block px-3 text-base text-black">OR</span>
      </span>

      <form onSubmit={handleSubmit}>
        <div className="mb-[22px]">
          <input
            type="text"
            placeholder="Name"
            name="name"
            required
            className="w-full rounded-md border border-black/20 bg-transparent px-5 py-3 text-base text-grey outline-none transition placeholder:text-grey focus:border-primary focus-visible:shadow-none"
          />
        </div>
        <div className="mb-[22px]">
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            className="w-full rounded-md border border-black/20 bg-transparent px-5 py-3 text-base text-grey outline-none transition placeholder:text-grey focus:border-primary focus-visible:shadow-none"
          />
        </div>
        <div className="mb-[22px]">
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            className="w-full rounded-md border border-black/20 bg-transparent px-5 py-3 text-base text-grey outline-none transition placeholder:text-grey focus:border-primary focus-visible:shadow-none"
          />
        </div>
        <div className="mb-9">
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-md bg-primary px-5 py-3 text-18 font-medium border border-primary transition duration-300 ease-in-out hover:bg-transparent hover:text-primary"
          >
            {loading ? <Loader /> : 'Sign Up'}
          </button>
        </div>
      </form>

      <p className="text-body-secondary mb-4 text-white text-base">
        By creating an account you agree with our{' '}
        <a href="/#" className="text-primary hover:underline">
          Privacy
        </a>{' '}
        and{' '}
        <a href="/#" className="text-primary hover:underline">
          Policy
        </a>
      </p>

      <p className="text-body-secondary text-white text-base">
        Already have an account?
        <Link to="/signin" className="pl-2 text-primary hover:underline">
          Sign In
        </Link>
      </p>
    </>
  )
}

export default SignUp
