/*global require module*/
(function moduleExport(require, module) {
  'use strict';

  var mysql = require('mysql')
    , dataTypes = require('atthis-cm').dataTypes
    , MysqlDumper = function MysqlDumper() {
      }
    , connectionInformations = {
      'menus': [
        {
          'host': dataTypes.string.required,
          'port': dataTypes.number,
          'username': dataTypes.string.required,
          'password': dataTypes.password.required,
          'ssl': dataTypes.checkbox
        },
        {
          'socketPath': dataTypes.string.required,
          'username': dataTypes.string.required,
          'password': dataTypes.password.required,
          'ssl': dataTypes.checkbox
        }
      ],
      'options': {
        'ssl': {
          'keyfile': dataTypes.file.required,
          'certificate': dataTypes.file.required,
          'ca': dataTypes.file.required
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
      , aConnectionInformationsKey;
    for (; anIndex < menusInformationsKeysLength; anIndex += 1) {

      aConnectionInformationsKey = menusInformationsKeys[anIndex];
      if (conn[aConnectionInformationsKey] === undefined) {

        throw 'a required parameter is missing ' + aConnectionInformationsKey;
      }
    }

    for (anIndex = 0; i < optionsInforationsKeysLength; anIndex += 1) {
      Things[i]
    };


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
