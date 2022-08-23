# -*- coding: utf-8 -*-
import json
import logging

import requests

from odoo import api, fields, models, tools, _
from odoo.exceptions import UserError

_logger = logging.getLogger(__name__)

class GoogleMapsWizard(models.TransientModel):
    _name = "google.maps.wizard"
    _description = "Google Maps Wizard"

    # Update Data On-Load
    @api.model
    def default_get(self, fields):
        res = super(GoogleMapsWizard, self).default_get(fields)
        print('......Context', self.env.context)
        if self.env.context.get('active_id'):
            res['res_partner_id'] = self.env.context.get('active_id')
        return res

    res_partner_id = fields.Many2one('res.partner', string="Partner ID")
    country_id = fields.Many2one(related="res_partner_id.country_id", string="Country", readonly=False)
    city = fields.Char(related="res_partner_id.city", string="City", readonly=False)
    state_id = fields.Many2one(related="res_partner_id.state_id", string="State", readonly=False)
    zip = fields.Char(related="res_partner_id.zip", string="Zip Code", readonly=False)
    street = fields.Char(related="res_partner_id.street", string="Street", readonly=False)
    street2 = fields.Char(related="res_partner_id.street2", string="Street 2", readonly=False)
    


    def update_address_wizard(self):
        print('.............. Update Complete')
        return True

    @api.model
    def updateLatLong(self, data):
        partner = self.env['res.partner'].search([('id', '=', data['id'])], limit=1)
        partner.write({
            'partner_latitude': data['lat'],
            'partner_longitude': data['long']
            })
        return partner



 