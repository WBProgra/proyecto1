import React from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Tooltip,
  Text,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons'; // Se importa ViewIcon

/**
 * Un componente de tabla genérico y reutilizable.
 *
 * @param {object} props - Las propiedades del componente.
 * @param {Array<object>} props.columns - La configuración de las columnas. Cada objeto debe tener `Header` y `accessor`.
 * @param {Array<object>} props.data - Los datos a mostrar en la tabla.
 * @param {Function} [props.onView] - Función que se llama al hacer clic en el botón de visualizar. Recibe la fila de datos.
 * @param {Function} [props.onEdit] - Función que se llama al hacer clic en el botón de editar. Recibe la fila de datos.
 * @param {Function} [props.onDelete] - Función que se llama al hacer clic en el botón de eliminar. Recibe la fila de datos.
 * @param {Function} [props.renderActions] - Una función de renderizado opcional para acciones personalizadas.
 */
const GenericTable = ({ columns, data = [], onEdit, onDelete, onView, renderActions }) => {
  const headerBg = useColorModeValue('gray.100', 'gray.700');
  const rowHoverBg = useColorModeValue('gray.50', 'gray.600');

  if (!Array.isArray(data)) {
    console.error("GenericTable: `data` prop must be an array. Received:", data);
    return (
      <Text textAlign="center" color="red.500">
        Error: los datos proporcionados no son válidos.
      </Text>
    );
  }

  return (
    <Box overflowX="auto" borderWidth="1px" borderRadius="lg" p={4}>
      {data.length === 0 ? (
        <Text textAlign="center" fontSize="lg" p={10}>
          No hay datos para mostrar.
        </Text>
      ) : (
        <Table variant="simple">
          <Thead bg={headerBg}>
            <Tr>
              {columns.map((col) => (
                <Th key={col.accessor} textAlign="center">
                  {col.Header}
                </Th>
              ))}
              {(onView || onEdit || onDelete || renderActions) && (
                <Th textAlign="center">Acciones</Th>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row, rowIndex) => (
              <Tr key={row.id || rowIndex} _hover={{ bg: rowHoverBg }}>
                {columns.map((col) => (
                  <Td key={`${rowIndex}-${col.accessor}`} textAlign="center">
                    {typeof row[col.accessor] === 'boolean'
                      ? row[col.accessor] ? 'Sí' : 'No'
                      : row[col.accessor] || '-'}
                  </Td>
                ))}
                {(onView || onEdit || onDelete || renderActions) && (
                  <Td textAlign="center">
                    <Flex align="center" justify="center">
                      {onView && (
                        <Tooltip label="Visualizar" aria-label="Visualizar">
                          <IconButton
                            icon={<ViewIcon />}
                            size="sm"
                            colorScheme="blue"
                            onClick={() => onView(row)}
                            mr={2}
                          />
                        </Tooltip>
                      )}
                      {onEdit && (
                        <Tooltip label="Editar" aria-label="Editar">
                          <IconButton
                            icon={<EditIcon />}
                            size="sm"
                            colorScheme="yellow"
                            onClick={() => onEdit(row)}
                            mr={2}
                          />
                        </Tooltip>
                      )}
                      {onDelete && (
                        <Tooltip label="Eliminar" aria-label="Eliminar">
                          <IconButton
                            icon={<DeleteIcon />}
                            size="sm"
                            colorScheme="red"
                            onClick={() => onDelete(row)}
                          />
                        </Tooltip>
                      )}
                      {renderActions && renderActions(row)}
                    </Flex>
                  </Td>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default GenericTable;