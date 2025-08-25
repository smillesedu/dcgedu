import { getImagePrefix } from '../../../../../utils/util'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link href="/">
      <img
        src={`${getImagePrefix()}images/logo/logo.svg`}
        alt="logo"
        width={160}
        height={50}
        style={{ width: 'auto', height: 'auto' }}
        quality={100}
      />
    </Link>
  )
}

export default Logo
