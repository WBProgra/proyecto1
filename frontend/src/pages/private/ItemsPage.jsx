import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  useDisclosure,
  Heading,
  Flex,
  HStack,
} from "@chakra-ui/react";

import { showSuccess, showError } from "../../services/NotificationService";
import GenericTable from "../../components/Componentes_reutilizables/GenericTable";
import GenericModal from "../../components/Componentes_reutilizables/GenericModal";
import ItemService from "../../services/ItemService";
import ItemForm from "./ItemForm";

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalMode, setModalMode] = useState("create");

  const fetchItems = useCallback(async (pagination) => {
    try {
      const response = await ItemService.getItems(pagination);
      const { edges, pageInfo } = response.data.data.allItems;
      setItems(edges.map((edge) => edge.node)); // Extraemos los nodos
      setPageInfo(pageInfo);
    } catch (error) {
      console.error("Error al obtener los items:", error);
      showError("No se pudieron cargar los items.");
    }
  }, []);

  useEffect(() => {
    fetchItems({ first: 10 }); // Carga inicial
  }, [fetchItems]);

  const handleOpenModal = (mode, item = null) => {
    setModalMode(mode);
    setSelectedItem(item);
    onOpen();
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    onClose();
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      if (modalMode === "create") {
        await ItemService.createItem(values);
      } else if (modalMode === "edit") {
        await ItemService.updateItem({ id: selectedItem.id, ...values });
      }
      showSuccess(
        `Item ${
          modalMode === "create" ? "creado" : "actualizado"
        } con éxito.`
      );
      fetchItems({ first: 10 }); // Recargar la lista desde la primera página
      handleCloseModal();
    } catch (error) {
      console.error(
        `Error al ${modalMode === "create" ? "crear" : "actualizar"} el item:`,
        error
      );
      showError("Ocurrió un problema al guardar el item.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setIsSubmitting(true);
    try {
      // El ID de Relay es globalmente único, no necesitamos el `node`
      await ItemService.deleteItem(selectedItem.id);
      showSuccess("El item ha sido eliminado.");
      fetchItems({ first: 10 });
      handleCloseModal();
    } catch (error) {
      console.error("Error al eliminar el item:", error);
      showError("No se pudo eliminar el item.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = [
    { Header: "Nombre", accessor: "nombre" },
    { Header: "Descripción", accessor: "descripcion" },
    { Header: "Activo", accessor: "isActive" },
  ];

  const getModalTitle = () => {
    if (modalMode === "create") return "Crear Nuevo Item";
    if (modalMode === "edit") return "Editar Item";
    return "Confirmar Eliminación";
  };

  return (
    <Box p={8}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading>Gestión de Items</Heading>
        <Button colorScheme="blue" onClick={() => handleOpenModal("create")}>
          Crear Item
        </Button>
      </Flex>

      <GenericTable
        columns={columns}
        data={items}
        onEdit={(itemNode) => handleOpenModal("edit", itemNode)}
        onDelete={(itemNode) => handleOpenModal("delete", itemNode)}
      />

      <HStack mt={4} justify="center">
        <Button
          onClick={() => fetchItems({ last: 10, before: pageInfo.startCursor })}
          isDisabled={!pageInfo?.hasPreviousPage}
        >
          Anterior
        </Button>
        <Button
          onClick={() => fetchItems({ first: 10, after: pageInfo.endCursor })}
          isDisabled={!pageInfo?.hasNextPage}
        >
          Siguiente
        </Button>
      </HStack>

      <GenericModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        title={getModalTitle()}
        onConfirm={
          modalMode === "delete"
            ? handleDeleteConfirm
            : () => document.getElementById("item-form-submit").click()
        }
        confirmButtonText={modalMode === "delete" ? "Eliminar" : "Guardar"}
        isConfirming={isSubmitting}
      >
        {modalMode === "create" || modalMode === "edit" ? (
          <ItemForm
            onSubmit={handleSubmit}
            initialValues={selectedItem || { nombre: "", descripcion: "" }}
            isSubmitting={isSubmitting}
          />
        ) : (
          <p>
            ¿Estás seguro de que deseas eliminar el item "
            {selectedItem?.nombre}"?
          </p>
        )}
      </GenericModal>
    </Box>
  );
};

export default ItemsPage;
