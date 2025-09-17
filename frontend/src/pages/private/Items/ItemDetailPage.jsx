// frontend/src/pages/private/Items/ItemDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Spinner,
  Center,
  Badge,
  Button,
  Flex,
  Divider,
  Grid,
  GridItem,
  HStack,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowBackIcon, CalendarIcon, EditIcon } from '@chakra-ui/icons'; // Importa más iconos
import ItemService from '../../../services/ItemService';
import { handleError } from '../../../services/NotificationService';

// Pequeño componente para mostrar cada dato y mantener el código limpio
const InfoDetail = ({ icon, label, value }) => {
  const labelColor = useColorModeValue('gray.500', 'gray.400');
  return (
    <Box>
      <HStack spacing={3} mb={1}>
        <Icon as={icon} color="blue.500" />
        <Heading size="xs" textTransform="uppercase" color={labelColor}>
          {label}
        </Heading>
      </HStack>
      <Text pl={8} fontSize="md" fontWeight="medium">
        {value}
      </Text>
    </Box>
  );
};

const ItemDetailPage = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await ItemService.getItemById(itemId);
        if (response.data.data.item) {
          setItem(response.data.data.item);
        } else {
          throw new Error('Item no encontrado');
        }
      } catch (error) {
        handleError('No se pudo cargar el item.');
        navigate('/items');
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId, navigate]);

  if (loading) {
    return (
      <Center h="calc(100vh - 150px)">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  if (!item) {
    return (
      <Center h="calc(100vh - 150px)">
        <Text fontSize="xl">Item no encontrado.</Text>
      </Center>
    );
  }

  return (
    <Box pt="150px" px={5}>
      <Button
        leftIcon={<ArrowBackIcon />}
        onClick={() => navigate('/items')}
        mb={6}
        variant="outline"
      >
        Volver a la lista
      </Button>
      <Card borderRadius="xl" boxShadow="lg" overflow="hidden">
        <CardHeader
          bg={useColorModeValue('gray.50', 'gray.700')}
          borderBottomWidth="1px"
          p={6}
        >
          <Flex justify="space-between" align="center">
            <Heading size="lg">{item.nombre}</Heading>
            <Badge
              fontSize="md"
              px={4}
              py={2}
              borderRadius="full"
              colorScheme={item.isActive ? 'green' : 'red'}
            >
              {item.isActive ? 'Activo' : 'Inactivo'}
            </Badge>
          </Flex>
        </CardHeader>
        <CardBody p={8}>
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            gap={8}
          >
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <Box>
                <Heading size="md" mb={4}>
                  Descripción
                </Heading>
                <Text fontSize="md" color={useColorModeValue('gray.600', 'gray.300')}>
                  {item.descripcion || 'No se proporcionó una descripción.'}
                </Text>
              </Box>
            </GridItem>
            <GridItem>
              <InfoDetail
                icon={CalendarIcon}
                label="Fecha de Creación"
                value={new Date(item.created).toLocaleString()}
              />
            </GridItem>
            <GridItem>
              <InfoDetail
                icon={EditIcon}
                label="Última Modificación"
                value={new Date(item.modified).toLocaleString()}
              />
            </GridItem>
          </Grid>
        </CardBody>
      </Card>
    </Box>
  );
};

export default ItemDetailPage;