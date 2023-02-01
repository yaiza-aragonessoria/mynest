from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from homes.models import Home


class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class User(AbstractUser):
    # Field used for authentication
    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = []

    email = models.EmailField(unique=True)
    first_name = models.CharField(verbose_name='first name', max_length=200, blank=True, default='unkown')
    last_name = models.CharField(verbose_name='last name', max_length=200, blank=True, default='unkown')
    avatar = models.ImageField(verbose_name='profile picture', max_length=255, blank=True)
    username = None
    home = models.ForeignKey(to=Home, on_delete=models.PROTECT, related_name='cohabitants', blank=True, null=True)

    objects = UserManager()

    # balance, task_count to be added in the serializer

    def __str__(self):
        return self.email
