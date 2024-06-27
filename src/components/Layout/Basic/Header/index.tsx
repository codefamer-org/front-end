import { useEffect, useState } from 'react';
import './index.less'
import { useLocation, useNavigate } from 'react-router-dom';
import System from '@/components/System/index.tsx';

type Props = {
  showSystem: boolean
}

const Index: React.FC<Props> = ({ showSystem = false }) => {
  const location = useLocation();
  const navigate = useNavigate()
  const [hash, setHash] = useState(null);
  useEffect(() => {
    setHash(location.hash as any)
  }, [])

  const navigateToHome = () => {
    navigate('/')
  }
  return (
    <div className="header">
      <div className='inner-header'>
        <span onClick={navigateToHome} className='title'>{ import.meta.env.VITE_SITE_NAME || '爱码学习站' }</span>
        { showSystem ? <System /> : null }
      </div>
    </div>
  )
}
export default Index;
