import { useEffect, useState } from 'react';
import './index.less'
import { useLocation } from 'react-router-dom';
import System from '@/components/System/index.tsx';

type Props = {
  showSystem: boolean
}

const Index: React.FC<Props> = ({ showSystem = false }) => {
  const location = useLocation();
  const [hash, setHash] = useState(null);
  useEffect(() => {
    setHash(location.hash as any)
  }, [])
  return (
    <div className="header">
      <div className='inner-header'>
        <span className='title'>{ import.meta.env.VITE_SITE_NAME || '爱码学习站' }</span>
        { showSystem ? <System /> : null }
      </div>
    </div>
  )
}
export default Index;
