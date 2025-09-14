import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
  Button,
  VStack,
} from '@chakra-ui/react';

// Esquema de validación con Yup
const validationSchema = Yup.object({
  nombre: Yup.string()
    .max(100, 'El nombre no puede tener más de 100 caracteres')
    .required('El nombre es obligatorio'),
  descripcion: Yup.string(),
});

/**
 * Formulario para crear o editar un Item.
 *
 * @param {object} props - Propiedades del componente.
 * @param {Function} props.onSubmit - Función que se ejecuta al enviar el formulario.
 * @param {object} props.initialValues - Valores iniciales para el formulario.
 * @param {boolean} props.isSubmitting - Indica si el formulario se está enviando.
 */
const ItemForm = ({ onSubmit, initialValues, isSubmitting }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values);
      }}
      enableReinitialize // Permite que el formulario se reinicie con nuevos initialValues
    >
      {({ errors, touched }) => (
        <Form>
          <VStack spacing={4}>
            <Field name="nombre">
              {({ field }) => (
                <FormControl isInvalid={errors.nombre && touched.nombre}>
                  <FormLabel htmlFor="nombre">Nombre</FormLabel>
                  <Input {...field} id="nombre" placeholder="Nombre del item" />
                  <FormErrorMessage>{errors.nombre}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="descripcion">
              {({ field }) => (
                <FormControl>
                  <FormLabel htmlFor="descripcion">Descripción</FormLabel>
                  <Textarea {...field} id="descripcion" placeholder="Descripción (opcional)" />
                </FormControl>
              )}
            </Field>

            {/* Botón de submit oculto que se activa desde el modal */}
            <Button
              id="item-form-submit"
              type="submit"
              style={{ display: 'none' }}
              isLoading={isSubmitting}
            />
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default ItemForm;
