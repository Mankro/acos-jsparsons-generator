/* jshint globalstrict: true */
/* global require, __dirname, module */
'use strict';
var fs = require('fs');
var jsparsonsGenerator = function() {};
var nj = require('nunjucks');


jsparsonsGenerator.register = function(handlers, app, config) {
    var CONFIG = config;



    handlers.tools['jsparsons-generator'] = jsparsonsGenerator;
    
    app.get('/jsparsons-generator', function(req, res) {
        var templateDir = __dirname + '/templates/';
        nj.configure(templateDir, { autoescape: false });  
        res.set('Content-Type', 'text/html');
        res.send(nj.render('form.html'));

    });
    
    app.post('/jsparsons-generator', function(req, res) {
        var params = req.body;
        var initial =  params.initial.replace(/(?:\r\n|\r|\n)/g, '\\n');
        initial =  initial.replace(/\'/g, "\"");
        initial =  initial.replace(/\"/g, '\\"');

        var description = params.description || 'No description given.';
        var instructions = params.instructions || 'No instructions given.';
        var name = params.name || 'Unnamed';
        
        var url = CONFIG.serverAddress;
        url += 'html/jsparsons/jsparsons-python-custom/exercise?';
        url += 'name=' + encodeURIComponent(name);
        url += '&initial=' + encodeURIComponent(initial);
        url += '&instructions=' + encodeURIComponent(instructions);
        url += '&description=' + encodeURIComponent(description);

        res.set('Content-Type', 'text/html');
        res.send(nj.render('submitted.html', {'url': url, 'description': description, 'initial': initial, 'serverAddress': CONFIG.serverAddress, 'name': name, 'instructions': instructions}));
    });
    
};

jsparsonsGenerator.meta = {
    'name': 'jsparsons-generator',
    'shortDescription': 'Generates Acos compatible js-parsons json-formatted problem descriptions from given input.',
    'description': '',
    'author': 'Lassi Haaranen',
    'license': 'MIT',
    'version': '0.0.1',
    'url': ''
};

jsparsonsGenerator.namespace = 'jsparsons-generator';
module.exports = jsparsonsGenerator;
