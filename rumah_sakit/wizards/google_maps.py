# -*- coding: utf-8 -*-
from odoo import api, fields, models, _


class GoogleMapsWizard(models.TransientModel):
    _name = "google.maps.wizard"
    _description = "Google Maps Wizard"


    

    @api.model
    def default_get(self, fields):
        res = super(GoogleMapsWizard, self).default_get(fields)
        print('......Context', self.env.context)
        if self.env.context.get('active_id'):
            res['res_partner_id'] = self.env.context.get('active_id')
        return res

    res_partner_id = fields.Many2one('res.partner', string="Partner ID")
    negara = fields.Many2one(related="res_partner_id.country_id", string="Negara")
    provinsi = fields.Many2one(related="res_partner_id.state_id", string="Provinsi")
    kotakab = fields.Char(related="res_partner_id.city", string="Kota/Kab")
    alamat1 = fields.Char(related="res_partner_id.street", string="Alamat 1")
    alamat2 = fields.Char(related="res_partner_id.street2", string="Alamat 2")
    #provinsi = fields.Char(string="Provinsi")
    #kotakab = fields.Char(string="Kota/Kab")
    #kecamatan = fields.Char(string="Kecamatan")
    #kelurahan = fields.Char(string="Kelurahan")
    #alamat = fields.Char(string="Alamat")


    def generate_maps(self):
        return
    
