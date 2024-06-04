
import { Spin } from 'antd';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SpinLoading: React.FC = (props: any) => {
  const { tip } = props
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100%', width: '100%', alignItems: 'center' }}>
      <Spin tip={tip || '加载中...'} />
    </div>
  )
}
export default SpinLoading;