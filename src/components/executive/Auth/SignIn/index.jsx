// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import toast from 'react-hot-toast'

// import SocialSignIn from '../SocialSignIn'
// import Logo from '../../Layout/Header/Logo'
// import Loader from '../../Common/Loader'

// const Signin = () => {
//   const navigate = useNavigate()

//   const [loginData, setLoginData] = useState({
//     email: '',
//     password: '',
//     checkboxToggle: false,
//   })
//   const [loading, setLoading] = useState(false)

//   const loginUser = async (e) => {
//     e.preventDefault()

//     setLoading(true)

//     try {
//       // 👉 aqui você pode chamar sua API de autenticação
//       // Exemplo fictício:
//       if (loginData.email === 'admin@test.com' && loginData.password === '123456') {
//         toast.success('Login successful')
//         setLoading(false)
//         localStorage.setItem('token', 'fake-jwt-token') // salva token mock
//         navigate('/dashboard') // redireciona
//       } else {
//         toast.error('Invalid credentials')
//         setLoading(false)
//       }
//     } catch (err) {
//       setLoading(false)
//       console.log(err.message)
//       toast.error('Something went wrong')
//     }
//   }

//   return (
//     <>
//       <div className="mb-10 text-center mx-auto inline-block max-w-[160px]">
//         <Logo />
//       </div>

//       <SocialSignIn />

//       <span className="z-1 relative my-8 block text-center before:content-[''] before:absolute before:h-px before:w-40% before:bg-black/15 before:left-0 before:top-3 after:content-[''] after:absolute after:h-px after:w-40% after:bg-black/15 after:top-3 after:right-0">
//         <span className="text-body-secondary relative z-10 inline-block px-3 text-base text-black">
//           OR
//         </span>
//       </span>

//       <form onSubmit={loginUser}>
//         <div className="mb-[22px]">
//           <input
//             type="email"
//             placeholder="Email"
//             value={loginData.email}
//             onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
//             className="w-full rounded-md border border-black/20 bg-transparent px-5 py-3 text-base outline-none transition placeholder:text-grey focus:border-primary focus-visible:shadow-none text-white"
//           />
//         </div>
//         <div className="mb-[22px]">
//           <input
//             type="password"
//             placeholder="Password"
//             value={loginData.password}
//             onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
//             className="w-full rounded-md border border-black/20 bg-transparent px-5 py-3 text-base outline-none transition placeholder:text-grey focus:border-primary focus-visible:shadow-none text-white"
//           />
//         </div>
//         <div className="mb-9">
//           <button
//             type="submit"
//             className="bg-primary w-full py-3 rounded-lg text-18 font-medium border border-primary hover:text-primary hover:bg-transparent"
//           >
//             Sign In {loading && <Loader />}
//           </button>
//         </div>
//       </form>

//       <Link
//         to="/forgot-password"
//         className="mb-2 inline-block text-base text-white hover:text-primary"
//       >
//         Forgot Password?
//       </Link>
//       <p className="text-body-secondary text-white text-base">
//         Not a member yet?{' '}
//         <Link to="/signup" className="text-primary hover:underline">
//           Sign Up
//         </Link>
//       </p>
//     </>
//   )
// }

// export default Signin

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import SocialSignIn from '../SocialSignIn'
import Logo from '../../Layout/Header/Logo'
import Loader from '../../Common/Loader'
import { UserAuth } from '../../../../context/AuthContext'
import { useTranslation } from 'react-i18next'

const Signin = () => {
  const navigate = useNavigate()
  const { signInUser } = UserAuth()
  const { t, i18n } = useTranslation()

  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const loginUser = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { success, error } = await signInUser(loginData.email, loginData.password)

    if (success) {
      toast.success('Login successful')
      navigate('/dashboard')
    } else {
      toast.error(error || 'Invalid credentials')
    }
    setLoading(false)
  }

  return (
    <>
      <div className="mb-10 text-center mx-auto inline-block max-w-[160px]">
        <Logo />
      </div>

      {/* <SocialSignIn /> */}

      <span className="z-1 relative my-8 block text-center before:content-[''] before:absolute before:h-px before:w-40% before:bg-black/15 before:left-0 before:top-3 after:content-[''] after:absolute after:h-px after:w-40% after:bg-black/15 after:top-3 after:right-0">
        <span className="text-body-secondary relative z-10 inline-block px-3 text-base text-black">
          OR
        </span>
      </span>

      <form onSubmit={loginUser}>
        <div className="mb-[22px]">
          <input
            type="email"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            className="w-full rounded-md border border-black/20 bg-transparent px-5 py-3 text-black  text-base outline-none transition placeholder:text-grey focus:border-primary focus-visible:shadow-none"
          />
        </div>
        <div className="mb-[22px]">
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            className="w-full rounded-md border border-black/20 bg-transparent px-5 py-3 text-black text-base outline-none transition placeholder:text-grey focus:border-primary focus-visible:shadow-none"
          />
        </div>
        <div className="mb-9">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary w-full py-3 rounded-lg text-18 text-black font-medium border border-primary hover:text-white hover:bg-transparent"
          >
            {loading ? <Loader /> : t('login')}
          </button>
        </div>
      </form>

      <Link
        to="/forgot-password"
        className="mb-2 inline-block text-base text-primary hover:text-primary"
      >
        Forgot Password?
      </Link>
      {/* <p className="text-body-secondary text-white text-base">
        Not a member yet?{' '}
        <Link to="/signup" className="text-primary hover:underline">
          Sign Up
        </Link>
      </p> */}
    </>
  )
}

export default Signin
