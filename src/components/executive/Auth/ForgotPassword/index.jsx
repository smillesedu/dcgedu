import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import Loader from '../../Common/Loader' // ajuste o caminho se necessário
import { useNavigate, Link } from 'react-router-dom'
import { getImagePrefix } from '../../../../utils/util' // ajuste o caminho
import {
  logo
} from '../../../../assets'


const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      toast.error('Please enter your email address.')
      return
    }

    setLoader(true)

    try {
      const res = await axios.post('/api/forgot-password/reset', {
        email: email.toLowerCase(),
      })

      if (res.status === 404) {
        toast.error('User not found.')
        setLoader(false)
        return
      }

      if (res.status === 200) {
        toast.success(res.data)
        setEmail('')
      }

      setLoader(false)
    } catch (error) {
      toast.error(error?.response?.data || 'An error occurred')
      setLoader(false)
    }
  }

  return (
    <section className="bg-[#F4F7FF] py-14 dark:bg-dark lg:py-20">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white px-8 py-14 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]"
              data-wow-delay=".15s"
            >
              <div className="mb-10 text-center">
                <Link to="/" className="mx-auto inline-block max-w-[160px]">
                  <img
                    src={`${logo}`}
                    alt="logo"
                    width={140}
                    height={30}
                    className="dark:hidden"
                  />
                  <img
                    src={`${logo}`}
                    alt="logo"
                    width={140}
                    height={30}
                    className="hidden dark:block"
                  />
                </Link>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-[22px]">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex w-full cursor-pointer items-center justify-center rounded-md border border-primary bg-primary px-5 py-3 text-base text-white transition duration-300 ease-in-out hover:bg-blue-dark"
                  >
                    Send Email {loader && <Loader />}
                  </button>
                </div>
              </form>

              <div>
                {/* SVG decorativos */}
                <span className="absolute right-1 top-1">
                  {/* ...coloque os SVGs aqui, igual no seu código original */}
                </span>
                <span className="absolute bottom-1 left-1">{/* ...SVGs adicionais */}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword
