import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const showSuccess = (message) => {
  MySwal.fire({
    title: 'Éxito',
    text: message,
    icon: 'success',
    timer: 2000,
    showConfirmButton: false,
  });
};

export const showError = (message) => {
  MySwal.fire({
    title: 'Error',
    text: message,
    icon: 'error',
  });
};

export const showWarning = (message) => {
  MySwal.fire({
    title: 'Advertencia',
    text: message,
    icon: 'warning',
  });
};
