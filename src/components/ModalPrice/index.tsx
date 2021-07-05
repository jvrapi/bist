import React, { ReactNode } from 'react'
import { Modal, ModalProps, View } from 'react-native'
import { styles } from './styles'
type Props = ModalProps & {
  children: ReactNode
  closeModal(): void
}

const ModalPrice: React.FC<Props> = ({ children, closeModal, ...rest }) => {
  return (
    <Modal transparent animationType='slide' statusBarTranslucent {...rest}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.bar} />
          {children}
        </View>
      </View>
    </Modal>
  )
}

export { ModalPrice }
