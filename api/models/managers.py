from django.contrib.auth.models import BaseUserManager


class CustomUserManager(BaseUserManager):
    """
    Manager personalizado para el modelo Usuario donde el email es el
    identificador único en lugar del nombre de usuario.
    """
    def create_user(self, email, password=None, **extra_fields):
        """
        Crea y guarda un Usuario con el email y contraseña dados.
        """
        if not email:
            raise ValueError('El campo Email es obligatorio')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Crea y guarda un superusuario con el email y contraseña dados.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('El superusuario debe tener is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('El superusuario debe tener is_superuser=True.')

        # El username no es necesario, pero lo seteamos al email por si algún
        # componente de Django lo necesita internamente.
        if 'username' not in extra_fields:
            extra_fields['username'] = email

        return self.create_user(email, password, **extra_fields)
