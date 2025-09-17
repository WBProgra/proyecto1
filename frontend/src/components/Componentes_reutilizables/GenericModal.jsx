/**
 * Un componente de modal genérico y reutilizable.
 *
 * @param {object} props - Las propiedades del componente.
 * @param {boolean} props.isOpen - Controla si el modal está abierto o cerrado.
 * @param {Function} props.onClose - Función que se llama al cerrar el modal.
 * @param {string} props.title - El título que se muestra en el encabezado del modal.
 * @param {React.ReactNode} props.children - El contenido que se renderiza en el cuerpo del modal.
 * @param {Function} props.onConfirm - Función que se ejecuta al hacer clic en el botón de confirmación.
 * @param {string} [props.confirmButtonText='Confirmar'] - Texto para el botón de confirmación.
 * @param {string} [props.cancelButtonText='Cancelar'] - Texto para el botón de cancelación.
 * @param {boolean} [props.isConfirming=false] - Si es true, muestra un spinner en el botón de confirmación.
 */
// frontend/src/components/Componentes_reutilizables/GenericModal.jsx

import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useColorModeValue, // 1. Importa el hook
} from '@chakra-ui/react';

const GenericModal = ({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmButtonText = 'Confirmar',
  cancelButtonText = 'Cancelar',
  isConfirming = false,
}) => {

  // 2. Define el color de fondo dependiendo del tema (claro/oscuro)
  const modalBg = useColorModeValue('white', 'navy.800');

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      {/* 3. Aplica el color de fondo al ModalContent */}
      <ModalContent bg={modalBg}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            {cancelButtonText}
          </Button>
          <Button
            colorScheme="blue"
            onClick={onConfirm}
            isLoading={isConfirming}
            loadingText="Confirmando..."
          >
            {confirmButtonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GenericModal;