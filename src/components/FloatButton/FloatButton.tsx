import React, { useState, useCallback } from 'react'
import { View } from 'remax/wechat'
import Icon from 'weui-miniprogram/miniprogram_dist/icon/icon'
import Actionsheet from 'weui-miniprogram/miniprogram_dist/actionsheet/actionsheet'

import styles from './FloatButton.module.css'

interface ActionType {
  text: string
  value: string
}

interface AddButtonProps {
  onClick?: (type: string) => void
  types: ActionType[]
  right: string
  bottom: string
  icon: string
}

const AddButton = ({ types, onClick, right, bottom, icon }: AddButtonProps) => {
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
        style={{ right, bottom }}
        onClick={() => setShowAction(true)}
      >
        <Icon icon={icon} size={35}></Icon>
      </View>
      <Actionsheet
        show={showAction}
        actions={types}
        bindclose={() => setShowAction(false)}
        bindactiontap={event => handleAction(event)}
      />
    </React.Fragment>
  )
}

export default AddButton
