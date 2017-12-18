# -*- coding: utf-8 -*-
'''
@author: Oleg Sapanyuk
'''

# Import flask dependencies
from flask import Flask, Blueprint, render_template

import flask_restful

API_VERSION_V1 = 1
API_VERSION = API_VERSION_V1

API_URL_PREFIX = '/'

# Define the blueprint
base_routing = Blueprint('base_routing', __name__, url_prefix='/')

# Set base route
@base_routing.route('/', methods=['GET'])
def index_route():
    return render_template('index.html')
