import { useEffect, useState } from 'react';
import './index.less'
import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const [hash, setHash] = useState(null);
  useEffect(() => {
    setHash(location.hash as any)
  }, [])

  return (
    <div className="header">
      <div className='common-wrapper' data-text="爱码学习站">
        爱码学习站
        hash---00{ hash }
      </div>
    </div>
  )
}
export default Header;
