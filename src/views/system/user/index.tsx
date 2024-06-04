// import type { FormProps } from 'antd';
import { Button } from 'antd';
import TableList from './list/index';
import Filter from './list/filter';

const SystemUserPage: React.FC = () => {
  const onReset = () =>{
    console.log('onReset');
  }
  const onSubmit = (value) =>{
    console.log('onSubmit', value);
  }
  const onValueChange = (value) =>{
    console.log('onValueChange', value);
  }
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    }}>
      <Filter reset={onReset} submit={onSubmit} valueChange={onValueChange} />
      <div style={{
        marginBottom: 12
      }}>
        <Button type="primary" >
          添加用户
        </Button>
      </div>
      <TableList />
    </div>
  )
}
export default SystemUserPage;