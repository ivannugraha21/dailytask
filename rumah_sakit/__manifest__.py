# -*- coding: utf-8 -*-
{
    'name': "Rumah Sakit",

    'summary': """
        Short (1 phrase/line) summary of the module's purpose, used as
        subtitle on modules listing or apps.openerp.com""",

    'description': """
        Long description of module's purpose
    """,

    'author': "My Company",
    'website': "http://www.yourcompany.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/15.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Uncategorized',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base', 'account', 'product'],

    # always loaded
    'data': [
        'security/ir.model.access.csv',
        # 'views/views.xml',
        # 'views/templates.xml',
        'wizards/google_maps_view.xml',
        #'views/assets.xml',
        'views/menu.xml',
        'views/res_partner_inherite.xml',
        'views/karyawan-karyawan.xml',
        'views/karyawan-departemen.xml',
        'views/pasien-daftar-kunjungan.xml',
        'views/pasien-pasien.xml',
        'views/produk-produk.xml',
        'views/res_settings_view.xml',
        #
        'report/report-daftar-kunjungan.xml'
    ],
    'qweb': {
        'rumah_sakit/static/src/xml/widget_one_template.xml'
    },
    'assets': {
        'web.assets_backend': [
            'rumah_sakit/static/src/js/popup.js',
            # 'rumah_sakit/static/src/js/widget_one.js'
        ]
    },
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
}
