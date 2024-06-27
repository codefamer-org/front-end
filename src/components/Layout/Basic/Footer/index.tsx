import './index.less'

const Index: React.FC = () => {
  return (
    <div className="global-footer">
      <div className="footer-inner">
        <a href="https://beian.miit.gov.cn/"> { import.meta.env.VITE_BEIAN_NO || '蜀ICP备2024084012号-1' }</a>
      </div>
    </div>
  )
}
export default Index;