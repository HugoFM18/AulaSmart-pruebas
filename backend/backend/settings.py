import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# =========================================
# SEGURIDAD
# =========================================

SECRET_KEY = os.environ.get(
    'DJANGO_SECRET_KEY',
    'AulaSmart-12345'
)

DEBUG = os.environ.get(
    'DEBUG',
    'True'
) == 'True'

ALLOWED_HOSTS = [
    '*'
]

# =========================================
# APPS
# =========================================

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'corsheaders',

    'AulaSmart',
]

# =========================================
# MIDDLEWARE
# =========================================

MIDDLEWARE = [

    'django.middleware.security.SecurityMiddleware',

    'corsheaders.middleware.CorsMiddleware',

    'django.contrib.sessions.middleware.SessionMiddleware',

    'django.middleware.common.CommonMiddleware',

    'django.middleware.csrf.CsrfViewMiddleware',

    'django.contrib.auth.middleware.AuthenticationMiddleware',

    'django.contrib.messages.middleware.MessageMiddleware',

    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# =========================================
# URLS
# =========================================

ROOT_URLCONF = 'backend.urls'

# =========================================
# TEMPLATES
# =========================================

TEMPLATES = [
    {
        'BACKEND':
            'django.template.backends.django.DjangoTemplates',

        'DIRS': [],

        'APP_DIRS': True,

        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',

                'django.contrib.auth.context_processors.auth',

                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# =========================================
# WSGI
# =========================================

WSGI_APPLICATION = 'backend.wsgi.application'

# =========================================
# DATABASE
# =========================================

DATABASES = {
    'default': {

        'ENGINE':
            'django.db.backends.postgresql',

        'NAME':
            'postgres',

        'USER':
            'postgres.sujelkqveumnblqrcbqn',

        'PASSWORD':
            'AulaSmart2007+',

        'HOST':
            'aws-1-us-east-1.pooler.supabase.com',

        'PORT':
            '6543',

        'CONN_MAX_AGE':
            0,

        'OPTIONS': {
            'sslmode': 'require'
        },
    }
}

# =========================================
# PASSWORDS
# =========================================

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME':
            'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME':
            'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME':
            'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME':
            'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# =========================================
# CUSTOM USER
# =========================================

AUTH_USER_MODEL = 'AulaSmart.Usuario'

# =========================================
# INTERNACIONALIZACIÓN
# =========================================

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'America/Bogota'

USE_I18N = True

USE_TZ = True

# =========================================
# STATIC
# =========================================

STATIC_URL = 'static/'

# =========================================
# CORS
# =========================================

CORS_ALLOW_ALL_ORIGINS = True

CORS_ALLOW_CREDENTIALS = True