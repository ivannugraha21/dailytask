# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models
from datetime import datetime
from odoo.addons.base.models.res_partner import WARNING_MESSAGE, WARNING_HELP


class DaftarKunjungan(models.Model):
    _name = 'pasien.daftarkunjungan'
    _description = "Pasien - Daftar Kunjungan"
    _rec_name = 'nama'
    



    # nama = fields.Char(string="Nama")
    nama = fields.Many2one('res.partner', string="Nama")
    penanggung_jawab = fields.Many2one('res.users','Penanggung Jawab', default=lambda self: self.env.user.id, readonly=True) 
    tanggal_kunjungan = fields.Date(string='Tanggal Kunjungan', default=datetime.today())
    status_rawat = fields.Selection([('rawat_inap', 'Rawat Inap'), ('rawat_jalan', 'Rawat Jalan')], string="Status", default="rawat_inap")
    # list_pelayanan = 
    # harga = 

    list_pelayanan_ids = fields.One2many('daftarkunjungan.pelayanan.line', 'list_pelayanan_id', string="List Pelayanan")
    

    lst_price = fields.Float(string='Total', readonly=True)

    @api.onchange('list_pelayanan_ids')
    def _calculate_total(self):
        bundle = self.list_pelayanan_ids
        vsum = 0.0

        for each in bundle:
            vsum += each.sub_total


        self.lst_price = vsum



class ListPelayananLine(models.Model):
    _name = 'daftarkunjungan.pelayanan.line'
    _description = "Pasien - Daftar Kunjungan List Pelayanan dan Harga Obat"


    product_id = fields.Many2one("product.template", string="List Obat")
    price_unit = fields.Float(string="Harga", related='product_id.list_price')
    qty = fields.Integer(string="Jumlah", default="1")
    list_pelayanan_id = fields.Many2one('pasien.daftarkunjungan', 'Daftar Kunjungan')

    sub_total = fields.Float(string='Sub Total', compute='_compute_sub_total')
    

    @api.onchange('qty', 'product_id')
    def _compute_sub_total(self):
        for rec in self:
            if rec.product_id:
                subtotal = rec.price_unit * rec.qty
                rec.sub_total = subtotal
            else :
                rec.sub_total = "0"
            

        

