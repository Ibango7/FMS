import React, { useState } from 'react';
import { Badge, notification, Modal } from 'antd';
import { BellOutlined } from '@ant-design/icons';

const Notification: React.FC = () => {
  const [notificationCount, setNotificationCount] = useState(5);
  const [api, contextHolder] = notification.useNotification();
  
  const openNotification = () => {
    api.open({
      message: 'Notification Title',
      description:
        'I will never close automatically. This is a purposely very very long description that has many many characters and words.',
      duration: 0,
    });

    setNotificationCount(notificationCount-1);
  };

  return (
    <div>
      <Badge count={notificationCount}>
        <BellOutlined onClick={openNotification} style={{ fontSize: '24px' }} />
      </Badge>
      {contextHolder}
    </div>
  );
};

export default Notification;
