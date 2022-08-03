# -*- coding: utf-8 -*-
from odoo import api, fields, models


class KaryawanDepartemen(models.Model):
    _name = "karyawan.departemen"
    _description = "Karyawan Departemen"

    name = fields.Char(string='Name')
    manager = fields.Many2one('res.partner', string='Manager')
    status = fields.Char()