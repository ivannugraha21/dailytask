# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models
from odoo.addons.base.models.res_partner import WARNING_MESSAGE, WARNING_HELP


class ResSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    google_maps_key = fields.Char(string="Google Maps API Key")

    def set_values(self):
        res = super(ResSettings, self).set_values()
        self.env['ir.config_parameter'].set_param('rumah_sakit.google_maps_key', self.google_maps_key)
        return res

    @api.model
    def get_values(self):
        res = super(ResSettings, self).get_values()
        ICPSudo = self.env['ir.config_parameter'].sudo()
        mapKey = ICPSudo.get_param('rumah_sakit.google_maps_key')
        res.update(
            google_maps_key = mapKey
        )
        return res