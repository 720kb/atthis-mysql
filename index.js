/*global require module*/
(function moduleExport(require, module) {
  'use strict';

  var mysql = require('mysql')
    , atthisCm = require('atthis-cm')
    , dataTypes = atthisCm.dataTypes
    , optionsTypes = atthisCm.optionsTypes
    , MysqlDumper = function MysqlDumper() {
      }
    , validateConnectionAndCreateConnection = function validateConnectionAndCreateConnection(reject, selectedMenu, conn) {
        if (isNaN(selectedMenu) ||
          !conn) {

          reject('missing connection parameters');
        }

        var selectedConnectionInformations = connectionInformations.menus[selectedMenu]
          , menusInformationsKeys = Object.keys(selectedConnectionInformations)
          , optionsInforationsKeys = Object.keys(connectionInformations.options)
          , menusInformationsKeysLength = menusInformationsKeys.length
          , optionsInforationsKeysLength = optionsInforationsKeys.length
          , anIndex = 0
          , optionsKeys
          , optionsKeysLength
          , anOptionIndex = 0
          , aConnectionInformationsKey
          , toConnectionUsage
          , connection;
        for (; anIndex < menusInformationsKeysLength; anIndex += 1) {

          aConnectionInformationsKey = menusInformationsKeys[anIndex];
          if (selectedConnectionInformations[aConnectionInformationsKey].required === optionsTypes.required &&
            conn[aConnectionInformationsKey] === undefined) {

              reject('a required parameter is missing ' + aConnectionInformationsKey);
            }
          }
        }

        for (anIndex = 0; i < optionsInforationsKeysLength; anIndex += 1) {

          aConnectionInformationsKey = optionsInforationsKeys[anIndex];
          if (conn[aConnectionInformationsKey]) {

            optionsKeys = Object.keys(connectionInformations.options[aConnectionInformationsKey]);
            optionsKeysLength = optionsKeys.length;
            for (anOptionIndex = 0; anOptionIndex < optionsKeysLength; anOptionIndex += 1) {

              if (conn[optionsKeys[anOptionIndex]] === undefined) {

                reject('option declared but not filled');
              }
            }
          }
        }

        if (selectedMenu === 0) {

          toConnectionUsage = {
            'host': conn[host],
            'user': conn[user],
            'password': conn[password]
          }
        } else if (selectedMenu === 1) {

          toConnectionUsage = {
            'socketPath': conn[socketPath],
            'user': conn[user],
            'password': conn[password]
          };
        }

        if (conn[port]) {

          toConnectionUsage.port = conn[port];
        }
        if (conn[ssl]) {

          toConnectionUsage.ssl = {
            'key': fs.readFileSync(conn[keyfile]),
            'cert': fs.readFileSync(conn[certificate]),
            'ca': fs.readFileSync(conn[ca])
          };
        }

        return mysql.createConnection(toConnectionUsage);
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
              'required': optionsTypes.required,
              'label': 'Hostname'
            },
            'port': {
              'type': dataTypes.number,
              'label': 'Port'
            },
            'user': {
              'type': dataTypes.string,
              'required': optionsTypes.required,
              'label': 'Username'
            },
            'password': {
              'type': dataTypes.password,
              'required': optionsTypes.required,
              'label': 'Password'
            },
            'ssl': {
              'type': dataTypes.checkbox,
              'label': 'Connect using SSL'
            }
          },
          {
            'socketPath': {
              'type': dataTypes.string,
              'required': optionsTypes.required,
              'label': 'Socket path'
            },
            'user': {
              'type': dataTypes.string,
              'required': optionsTypes.required,
              'label': 'Username'
            },
            'password': {
              'type': dataTypes.password,
              'required': optionsTypes.required,
              'label': 'Password'
            },
            'ssl': {
              'type': dataTypes.checkbox,
              'label': 'Connect using SSL'
            }
          }
        ],
        'options': {
          'ssl': {
            'keyfile': {
              'type': dataTypes.file,
              'required': optionsTypes.required,
              'label': 'Key File'
            },
            'certificate': {
              'type': dataTypes.file,
              'required': optionsTypes.required,
              'label': 'Cert File'
            },
            'ca': {
              'type': dataTypes.file,
              'required': optionsTypes.required,
              'label': 'Ca File'
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

  MysqlDumper.prototype.testConnectionInformations = function testConnectionInformations(selectedMenu, conn) {

    return new Promise(function deferred(resolve, reject) {

      var connection = validateConnectionAndCreateConnection(reject, selectedMenu, conn);
      connection.connect(function onConnection(err) {

        if (err) {

          reject('error connecting: ' + err.stack);
        }

        this.destroy();
        resolve('connected as id ' + connection.threadId);
      });
    });
  };

  MysqlDumper.prototype.doConnect = function doConnect() {

    this.connection = validateConnectionAndCreateConnection(function onError(param) {
      throw param;
    }, selectedMenu, conn);
  };

  MysqlDumper.prototype.getDumpableResources = function getDumpableResources() {

    return [];
  };

  MysqlDumper.prototype.doDump = function doDump(informations) {

    return 'dumped!';
  };

  module.exports = MysqlDumper;
}(require, module));
