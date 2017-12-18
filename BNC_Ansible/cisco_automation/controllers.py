# -*- coding: utf-8 -*-
'''
@author: Oleg Sapanyuk
'''

# Import flask dependencies
from flask import Flask, Blueprint, request

import flask_restful

API_VERSION_V1 = 1
API_VERSION = API_VERSION_V1

API_URL_PREFIX = '/api/cisco-automation'

# Define the blueprint
cisco_automation = Blueprint('cisco_automation', __name__)

# Define RESTful API for routing
api_cisco_automation = flask_restful.Api(app=cisco_automation, prefix=API_URL_PREFIX)

class BuildingList(flask_restful.Resource):
    def post(self):
    # No args - for now info will be from folder or hard coded in code, since info might be from 
    # API or Database
        return {
        	"test-3": "test-3"
        }

class FloorList(flask_restful.Resource):
    def post(self):
    # TODO: parse args - Building ID
        return {
        	"test-2": "test-2"
        }

class DeviceList(flask_restful.Resource):
    def post(self):
    # TODO: parse args - Floor and Building ids
        return {
        	"test-1": "test-1"
        }

class InterfacesList(flask_restful.Resource):
    def post(self):
    # TODO: parse args to specify device id
        return {
        	"test": "test"
        }

class InterfaceInformation(flask_restful.Resource):
    def post(self):
    	# Parse args and return info. args: device ID and port.
    	print(request.args)
        return request.args

class VlanList(flask_restful.Resource):
    def post(self):
    	# TODO: parse args to specify device id
        return {
        	"test1": "test1"
        }

api_cisco_automation.add_resource(BuildingList, '/building-list')
api_cisco_automation.add_resource(FloorList, '/floor-list')
api_cisco_automation.add_resource(DeviceList, '/device-list')
api_cisco_automation.add_resource(InterfacesList, '/interfaces-list')
api_cisco_automation.add_resource(InterfaceInformation, '/interface-information')
api_cisco_automation.add_resource(VlanList, '/vlan-list')
