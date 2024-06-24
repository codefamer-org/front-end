import React from 'react';
import { Button, Empty, Typography } from 'antd';

type Props = {
  image?: string,
  imageStyle?: { height: number | string, width: number | string },
  description?: string,
  btnText?: string,
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const Index: React.FC<Props> = (props) => {
  const propsMerge = {
    image: <img src='./empty.svg' />,
    imageStyle: { height: 60 },
    description: '暂无数据',
    btnText: '刷新',
    ...props
  }

  return <Empty
    image={propsMerge.image}
    imageStyle={propsMerge.imageStyle}
    description={
      <Typography.Text>
        {propsMerge.description}
      </Typography.Text>
    }
  >
    <Button type="primary" onClick={propsMerge.onClick}>{ propsMerge.btnText }</Button>
  </Empty>
};

export default Index;