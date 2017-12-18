# Statement for enabling the development environment
DEBUG = True

# Define the application directory
import os
BASE_DIR = os.path.abspath(os.path.dirname(__file__))  

# Application threads.
# One for incoming requests and one for background tasks.
THREADS_PER_PAGE = 2

# Enable protection agains *Cross-site Request Forgery (CSRF)*
CSRF_ENABLED     = True

# Use a secure, unique and absolutely secret key for
# signing the data. 
# TODO: Change for end of project.
CSRF_SESSION_KEY = "secret"

# Secret key for signing cookies.
#TODO: change for end of prject.
SECRET_KEY = "secret"
