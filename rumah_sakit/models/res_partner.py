# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import fields, models
from odoo.addons.base.models.res_partner import WARNING_MESSAGE, WARNING_HELP


class ResPartner(models.Model):
    _inherit = 'res.partner'

    status = fields.Selection([
        ('karyawan', 'Karyawan'),
        ('pasien', 'Pasien')
        ],  default='karyawan', readonly=True)

    add_latitude = fields.Char(string="Address Latitude", readonly=True, default='0')
    add_longitude = fields.Char(string="Address Longitude", readonly=True, default='0')
    html_map_view = fields.Html(string="HTML code for showing map")

