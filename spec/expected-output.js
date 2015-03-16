/*global require*/
(function doTest(require){
  'use strict';

  var test = require('tape')
    , AtthisMysql = require('../index')
    , atthisMysqlInst = new AtthisMysql();

  test('output', function doTestCase(tape) {
      tape.plan(13);

      tape.equal(typeof AtthisMysql, 'function');
      tape.equal(typeof AtthisMysql.getName, 'undefined');
      tape.equal(typeof AtthisMysql.getConnectionInformations, 'undefined');
      tape.equal(typeof AtthisMysql.getDumpableResources, 'undefined');
      tape.equal(typeof AtthisMysql.testConnectionInformations, 'undefined');
      tape.equal(typeof AtthisMysql.doConnect, 'undefined');
      tape.equal(typeof AtthisMysql.doDump, 'undefined');

      tape.equal(typeof atthisMysqlInst.getName, 'function');
      tape.equal(typeof atthisMysqlInst.getConnectionInformations, 'function');
      tape.equal(typeof atthisMysqlInst.getDumpableResources, 'function');
      tape.equal(typeof atthisMysqlInst.testConnectionInformations, 'function');
      tape.equal(typeof atthisMysqlInst.doConnect, 'function');
      tape.equal(typeof atthisMysqlInst.doDump, 'function');
  });
}(require));
