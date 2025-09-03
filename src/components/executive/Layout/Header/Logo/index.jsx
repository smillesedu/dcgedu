import { logo } from '../../../../../assets'
import { getImagePrefix } from '../../../../../utils/util'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link href="/">
      <img
        src={`${getImagePrefix()}${logo}`}
        alt="logo"
        width={160}
        height={50}
        style={{ width: '150px', height: 'auto' }}
        quality={100}
      />
    </Link>
  )
}

export default Logo
