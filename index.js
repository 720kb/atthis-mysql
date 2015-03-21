/*global require module*/
(function moduleExport(require, module) {
  'use strict';

  var mysql = require('mysql')
    , atthisCm = require('atthis-cm')
    , dataTypes = atthisCm.dataTypes
    , optionsTypes = atthisCm.optionsTypes
    , MysqlDumper = function MysqlDumper() {
      }
    , connectionInformations = {
      'menusNames': [
        'Standard connection',
        'Socket Connection'
      ],
      'menus': [
        {
          'host': {
            'type': dataTypes.string,
            'required': optionsTypes.required
          },
          'port': {
            'type': dataTypes.number
          },
          'username': {
            'type': dataTypes.string,
            'required': optionsTypes.required
          },
          'password': {
            'type': dataTypes.password,
            'required': optionsTypes.required
          },
          'ssl': {
            'type': dataTypes.checkbox
          }
        },
        {
          'socketPath': {
            'type': dataTypes.string,
            'required': optionsTypes.required
          },
          'username': {
            'type': dataTypes.string,
            'required': optionsTypes.required
          },
          'password': {
            'type': dataTypes.password,
            'required': optionsTypes.required
          },
          'ssl': {
            'type': dataTypes.checkbox
          }
        }
      ],
      'options': {
        'ssl': {
          'keyfile': {
            'type': dataTypes.file,
            'required': optionsTypes.required
          },
          'certificate': {
            'type': dataTypes.file,
            'required': optionsTypes.required
          },
          'ca': {
            'type': dataTypes.file,
            'required': optionsTypes.required
          }
        }
      },
      'defaults': {
        'port': 3306
      }
    };

  MysqlDumper.prototype.getName = function getName() {

    return 'mysql';
  };

  MysqlDumper.prototype.getConnectionInformations = function getConnectionInformations() {

    return connectionInformations;
  };

  MysqlDumper.prototype.testConnectionInformations = function testConnectionInformations(conn) {

    /*{
      'host': '127.0.0.1',
      'port': 3306,
      'username': 'antani',
      'password': 'antani',
      'ssl': true,

      'keyfile': '/home/antani/key.key',
      'certificate': '/home/antani/cert.cert',
      'ca': '/home/antani/ca.ca'
    },
    {
      'socketPath': '/var/run/mysqld/socketPath.so',
      'username': 'antani',
      'password': 'antani',
      'ssl': false
    }*/

    if (!conn) {

      throw 'missing connection parameters';
    }

    var menusInformationsKeys = Object.keys(connectionInformations.menus)
      , optionsInforationsKeys = Object.keys(connectionInformations.options)
      , menusInformationsKeysLength = menusInformationsKeys.length
      , optionsInforationsKeysLength = optionsInforationsKeys.length
      , anIndex = 0
      , optionsKeys
      , optionsKeysLength
      , anOptionIndex = 0
      , aConnectionInformationsKey;
    for (; anIndex < menusInformationsKeysLength; anIndex += 1) {

      aConnectionInformationsKey = menusInformationsKeys[anIndex];
      if (conn[aConnectionInformationsKey] === undefined) {

        throw 'a required parameter is missing ' + aConnectionInformationsKey;
      }
    }

    for (anIndex = 0; i < optionsInforationsKeysLength; anIndex += 1) {

      aConnectionInformationsKey = optionsInforationsKeys[anIndex];
      if (conn[aConnectionInformationsKey]) {

        optionsKeys = Object.keys(connectionInformations.options[aConnectionInformationsKey]);
        optionsKeysLength = optionsKeys.length;
        for (anOptionIndex = 0; anOptionIndex < optionsKeysLength; anOptionIndex += 1) {

          if (conn[optionsKeys[anOptionIndex]] === undefined) {

            throw 'option declared but not filled';
          }
        }
      }
    }


    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'me',
      password: 'secret'
    });
    return true;
  };

  MysqlDumper.prototype.doConnect = function doConnect() {

    return true;
  };

  MysqlDumper.prototype.getDumpableResources = function getDumpableResources() {

    return [];
  };

  MysqlDumper.prototype.doDump = function doDump(informations) {

    return 'dumped!';
  };

  module.exports = MysqlDumper;
}(require, module));
