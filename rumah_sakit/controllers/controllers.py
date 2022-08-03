# -*- coding: utf-8 -*-
# from odoo import http


# class RumahSakit2(http.Controller):
#     @http.route('/rumah_sakit2/rumah_sakit2', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/rumah_sakit2/rumah_sakit2/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('rumah_sakit2.listing', {
#             'root': '/rumah_sakit2/rumah_sakit2',
#             'objects': http.request.env['rumah_sakit2.rumah_sakit2'].search([]),
#         })

#     @http.route('/rumah_sakit2/rumah_sakit2/objects/<model("rumah_sakit2.rumah_sakit2"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('rumah_sakit2.object', {
#             'object': obj
#         })
