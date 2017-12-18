# -*- coding:utf-8 -*-
from flask import Flask

import json, os, re, sys
import flask_restful

__all__ = ['create_app']

# Create the Ansible APP
def create_app(environment=None):
    app = Flask(__name__, static_path='/static')
    load_config(app)
    register_module_blueprints(app)

    app.wsgi_app = ProxyFixupHelper(app.wsgi_app)

    return app


def load_config(app):
    app.config.from_object(__name__)
    app.config.from_object('config')
    app.config.from_envvar('APP_SETTINGS', silent=True)

def register_module_blueprints(app):

    # Import blueprint modules
    from BNC_Ansible.base_routing.controllers import base_routing as base_routing_module
    from BNC_Ansible.cisco_automation.controllers import cisco_automation as cisco_automation_module

    # Register blueprints
    app.register_blueprint(base_routing_module)
    app.register_blueprint(cisco_automation_module)

# Seeing 127.0.0.1 is almost never correct, promise.  We're proxied 99.9% of
# the time behind a load balancer or proxying webserver. Pull the right IP
# address from the correct HTTP header. In my hosting environments, I inject
# X-Real-IP as the HTTP header of choice instead of appending to
# X-Forwarded-For. Mixing and matching HTTP headers used by a client's proxy
# infrastructure and the server's infrastructure is almost always a bad idea.
class ProxyFixupHelper(object):
    def __init__(self, app):
        self.app = app

    def __call__(self, environ, start_response):
        # Only perform this fixup if the current remote host is localhost.
        if environ['REMOTE_ADDR'] == '127.0.0.1':
            host = environ.get('HTTP_X_REAL_IP', False)
            if host:
                environ['REMOTE_ADDR'] = host
        return self.app(environ, start_response)

