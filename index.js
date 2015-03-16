/*global require module*/
(function moduleExport(require, module) {
  'use strict';

  var mysql = require('mysql')
    , dataTypes = require('atthis-cm').dataTypes
    , MysqlDumper = function MysqlDumper() {
      };

  MysqlDumper.prototype.getName = function getName() {

    return 'mysql';
  };

  MysqlDumper.prototype.getConnectionInformations = function getConnectionInformations() {

    return {
      'host': dataTypes.string,
      'port': dataTypes.number,
      'user': dataTypes.string,
      'password': dataTypes.password
    };
  };

  MysqlDumper.prototype.getDumpableResources = function getDumpableResources() {

    return [];
  };

  MysqlDumper.prototype.testConnectionInformations = function testConnectionInformations() {

    return true;
  };

  MysqlDumper.prototype.doConnect = function doConnect() {

    return true;
  };

  MysqlDumper.prototype.doDump = function doDump(informations) {

    return 'dumped!';
  };

  module.exports = MysqlDumper;
}(require, module));
