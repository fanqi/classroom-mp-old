import React, { useState, useCallback } from 'react'
import { View } from 'remax/wechat'
import Icon from 'weui-miniprogram/miniprogram_dist/icon/icon'
import Actionsheet from 'weui-miniprogram/miniprogram_dist/actionsheet/actionsheet'

import styles from './Addbutton.module.css'

interface AddButtonProps {
  onClick?: (type: string) => void
}

const AddButton = ({ onClick }: AddButtonProps) => {
  // hooks
  const [showAction, setShowAction] = useState(false)

  // 处理点击 action
  const handleAction = useCallback(
    event => {
      setShowAction(false)
      onClick && onClick(event.detail.value)
    },
    [onClick]
  )

  return (
    <React.Fragment>
      <View
        className={styles['add-button']}
        onClick={() => setShowAction(true)}
      >
        <Icon icon="add" size={35} type="field"></Icon>
      </View>
      <Actionsheet
        show={showAction}
        actions={[
          { text: '创建课堂', value: 'create' },
          { text: '加入课堂', value: 'join' },
        ]}
        bindclose={() => setShowAction(false)}
        bindactiontap={event => handleAction(event)}
      />
    </React.Fragment>
  )
}

export default AddButton
