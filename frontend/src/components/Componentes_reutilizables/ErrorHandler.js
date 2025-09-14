import Swal from "sweetalert2";

/**
 * Componente para manejar errores del backend
 * @param {Object} error - El error recibido (response de Axios o similar)
 */
export const handleBackendError = (error) => {
  // Validar y extraer la respuesta del backend
  const response = error?.response;

  // Imprimir el error completo en la consola para diagnóstico
  console.error("Error recibido del backend:", response);

  // Configurar estilos globales del modal para asegurar que siempre esté al frente
  const customStyles = {
    zIndex: "99999", // Muy alto para superar cualquier otro modal
  };

  const swalOptions = {
    icon: "error",
    title: "Error en la operación",
    confirmButtonText: "Entendido",
    customClass: {
      popup: "swal-custom-popup",
    },
    didOpen: () => {
      // Aplicar estilos de z-index dinámicamente al popup
      const popup = document.querySelector(".swal-custom-popup");
      if (popup) {
        Object.assign(popup.style, customStyles);
      }
    },
  };

  if (response) {
    // Extraer detalles del error del backend
    const backendError = response.data?.detail || "Error desconocido.";
    const detalles = response.data?.detalles || response.data || null;

    let mensaje = `<p>${backendError}</p>`;
    if (detalles && typeof detalles === "object") {
      mensaje += "<ul>";
      for (const [key, value] of Object.entries(detalles)) {
        mensaje += `<li><strong>${key}:</strong> ${Array.isArray(value) ? value.join(", ") : value}</li>`;
      }
      mensaje += "</ul>";
    }

    Swal.fire({
      ...swalOptions,
      html: mensaje, // Mostrar mensaje formateado
    });
  } else {
    // Si no hay detalles del backend, muestra un error genérico
    Swal.fire({
      ...swalOptions,
      text: "Ocurrió un error. Por favor, intenta nuevamente más tarde.",
    });
  }
};
