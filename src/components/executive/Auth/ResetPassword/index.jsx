import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import Loader from '../../Common/Loader' // ajuste o path
import { getImagePrefix } from '../../../../utils/util' // ajuste o path
import { logo } from '../../../../assets' // ajuste o path

const ResetPassword = () => {
  const { token } = useParams() // pega o token da rota /reset/:token
  const navigate = useNavigate()

  const [data, setData] = useState({
    newPassword: '',
    ReNewPassword: '',
  })

  const [loader, setLoader] = useState(false)

  const [user, setUser] = useState({
    email: '',
  })

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios.post(`/api/forgot-password/verify-token`, {
          token,
        })

        if (res.status === 200) {
          setUser({
            email: res.data.email,
          })
        }
      } catch (error) {
        toast.error(error?.response?.data)
        navigate('/forgot-password')
      }
    }

    verifyToken()
  }, [token, navigate])

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoader(true)

    if (data.newPassword === '') {
      toast.error('Please enter your password.')
      return
    }

    try {
      const res = await axios.post(`/api/forgot-password/update`, {
        email: user?.email,
        password: data.newPassword,
      })

      if (res.status === 200) {
        toast.success(res.data)
        setData({ newPassword: '', ReNewPassword: '' })
        navigate('/signin')
      }

      setLoader(false)
    } catch (error) {
      toast.error(error.response.data)
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
                    type="password"
                    placeholder="New password"
                    name="newPassword"
                    value={data?.newPassword}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-[22px]">
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    name="ReNewPassword"
                    value={data?.ReNewPassword}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full cursor-pointer items-center justify-center rounded-md border border-primary bg-primary px-5 py-3 text-base text-white transition duration-300 ease-in-out hover:bg-blue-dark"
                  >
                    Save Password {loader && <Loader />}
                  </button>
                </div>
              </form>

              {/* os SVGs decorativos continuam iguais */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResetPassword
