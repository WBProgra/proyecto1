// frontend/src/pages/private/Items/ItemsPage.jsx

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Button, useDisclosure, Heading, Flex, Card, CardBody, CardHeader, Text, Spinner,
  Center, VStack, Icon, useColorModeValue, Divider, InputGroup, InputLeftElement, Input, Select, Grid
} from "@chakra-ui/react";
import { AddIcon, ChevronLeftIcon, ChevronRightIcon, SearchIcon } from "@chakra-ui/icons";
import { CgFileDocument } from "react-icons/cg";

import { showSuccess, handleError } from "../../../services/NotificationService";
import GenericTable from "../../../components/Componentes_reutilizables/GenericTable";
import GenericModal from "../../../components/Componentes_reutilizables/GenericModal";
import ItemService from "../../../services/ItemService";
import ItemForm from "./ItemForm";

const ItemsPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [pageInfo, setPageInfo] = useState({ hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null });
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalMode, setModalMode] = useState("create");

  const initialFilters = { search: "", isActive: "", createdAfter: "", createdBefore: "" };
  const [filters, setFilters] = useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);

  const fetchItems = useCallback(async (variables) => {
    setIsLoading(true);
    try {
      // Combina los filtros aplicados con las variables de paginación
      const allVariables = { ...appliedFilters, ...variables };

      Object.keys(allVariables).forEach(key => {
        if (allVariables[key] === "" || allVariables[key] === null) {
          delete allVariables[key];
        }
      });
      
      if (allVariables.isActive === 'true') {
        allVariables.isActive = true;
      } else if (allVariables.isActive === 'false') {
        allVariables.isActive = false;
      }

      const response = await ItemService.getItems(allVariables);
      const { edges, pageInfo: newPageInfo } = response.data.data.allItems;
      setItems(edges.map((edge) => edge.node));
      setPageInfo(newPageInfo);
    } catch (error) {
      console.error("Error al cargar los items:", error);
      handleError("No se pudieron cargar los ítems.");
    } finally {
      setIsLoading(false);
    }
  }, [appliedFilters]); // Se ejecuta cuando los filtros APLICADOS cambian

  useEffect(() => {
    fetchItems({ first: 10 });
  }, [fetchItems]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    setAppliedFilters(filters); // Aplica los filtros y dispara el useEffect
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    setAppliedFilters(initialFilters); // Limpia los filtros y dispara el useEffect
  };

  const handleOpenModal = (mode, item = null) => {setModalMode(mode); setSelectedItem(item); onOpen();};
  const handleCloseModal = () => {setSelectedItem(null); onClose();};
  const handleSubmit = async (values) => {setIsSubmitting(true); try {if (modalMode === "create") {await ItemService.createItem(values);} else if (modalMode === "edit") {await ItemService.updateItem({ id: selectedItem.id, ...values });} showSuccess(`Item ${modalMode === "create" ? "creado" : "actualizado"} con éxito.`); fetchItems({ first: 10, ...appliedFilters }); handleCloseModal();} catch (error) {console.error(`Error al ${modalMode === "create" ? "crear" : "actualizar"} el item:`, error); handleError(error);} finally {setIsSubmitting(false);}};
  const handleDeleteConfirm = async () => {setIsSubmitting(true); try {await ItemService.deleteItem(selectedItem.id); showSuccess("El item ha sido eliminado."); fetchItems({ first: 10, ...appliedFilters }); handleCloseModal();} catch (error) {console.error("Error al eliminar el item:", error); handleError(error);} finally {setIsSubmitting(false);}};
  const handleViewItem = (item) => {navigate(`/items/${item.id}`);};

  const columns = [{ Header: "Nombre", accessor: "nombre" }, { Header: "Descripción", accessor: "descripcion" }, { Header: "Activo", accessor: "isActive" }];
  const getModalTitle = () => {if (modalMode === "create") return "Crear Nuevo Item"; if (modalMode === "edit") return "Editar Item"; return "Confirmar Eliminación";};

  if (isLoading && items.length === 0) { return <Center h="calc(100vh - 200px)"><Spinner size="xl" color="blue.500" /></Center>; }

  return (
    <Box pt="150px" px={5}>
      <Card borderRadius="xl" boxShadow="lg">
        <CardHeader borderBottomWidth="1px" p={4}>
          <Flex justify="space-between" align="center">
            <Box><Heading size="lg">Gestión de Items</Heading><Text color={useColorModeValue('gray.500', 'gray.400')}>Visualiza, crea, edita y elimina los registros.</Text></Box>
            <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={() => handleOpenModal("create")}>Crear Item</Button>
          </Flex>
        </CardHeader>

        <Box p={4}>
          <Grid templateColumns={{ base: "1fr", md: "2fr 1fr 1fr 1fr auto auto" }} gap={4} alignItems="center">
            <InputGroup>
              <InputLeftElement pointerEvents="none"><SearchIcon color="gray.300" /></InputLeftElement>
              <Input name="search" placeholder="Buscar por nombre o ID..." value={filters.search} onChange={handleFilterChange} />
            </InputGroup>
            <Select name="isActive" value={filters.isActive} onChange={handleFilterChange} placeholder="Todos los estados">
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </Select>
            <Input type="date" name="createdAfter" value={filters.createdAfter} onChange={handleFilterChange} />
            <Input type="date" name="createdBefore" value={filters.createdBefore} onChange={handleFilterChange} />
            <Button colorScheme="blue" onClick={applyFilters} isLoading={isLoading}>Filtrar</Button>
            <Button onClick={clearFilters} isLoading={isLoading}>Limpiar</Button>
          </Grid>
        </Box>
        <Divider />

        <CardBody pos="relative">
          {isLoading && (
            <Center pos="absolute" top="0" left="0" w="full" h="full" bg={useColorModeValue("whiteAlpha.700", "gray.700Alpha.700")} zIndex="10">
              <Spinner size="xl" color="blue.500" />
            </Center>
          )}
          {items.length === 0 ? (
            <Center p={10}><VStack><Icon as={CgFileDocument} boxSize={12} color="gray.400" /><Heading size="md" color="gray.600">No se encontraron resultados</Heading><Text color="gray.500">Intenta ajustar tus filtros o crea un nuevo ítem.</Text></VStack></Center>
          ) : (
            <GenericTable columns={columns} data={items} onView={handleViewItem} onEdit={(itemNode) => handleOpenModal("edit", itemNode)} onDelete={(itemNode) => handleOpenModal("delete", itemNode)} />
          )}
        </CardBody>

        {items.length > 0 && (
          <>
            <Divider />
            <Flex justify="space-between" align="center" p={4}>
              <Button leftIcon={<ChevronLeftIcon />} onClick={() => fetchItems({ last: 10, before: pageInfo.startCursor })} isDisabled={!pageInfo.hasPreviousPage || isLoading}>Anterior</Button>
              <Text color="gray.500" fontSize="sm">Mostrando {items.length} resultados</Text>
              <Button rightIcon={<ChevronRightIcon />} onClick={() => fetchItems({ first: 10, after: pageInfo.endCursor })} isDisabled={!pageInfo.hasNextPage || isLoading}>Siguiente</Button>
            </Flex>
          </>
        )}
      </Card>
      
      <GenericModal isOpen={isOpen} onClose={handleCloseModal} title={getModalTitle()} onConfirm={modalMode === "delete" ? handleDeleteConfirm : () => document.getElementById("item-form-submit").click()} confirmButtonText={modalMode === "delete" ? "Eliminar" : "Guardar"} isConfirming={isSubmitting}>
        {modalMode === "create" || modalMode === "edit" ? (<ItemForm onSubmit={handleSubmit} initialValues={selectedItem || { nombre: "", descripcion: "" }} isSubmitting={isSubmitting} />) : (<Text>¿Estás seguro de que deseas eliminar el item "<b>{selectedItem?.nombre}</b>"?</Text>)}
      </GenericModal>
    </Box>
  );
};

export default ItemsPage;