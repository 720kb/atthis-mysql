/*global require __dirname module console*/
(function lint(require, __dirname, module, console) {
  'use strict';

  var path = require('path')
    , glob = require('glob')
    , colors = require('colors/safe')
    , CLIEngine = require('eslint').CLIEngine
    , cli = new CLIEngine(require('../confs/eslint.json'))
    , validFolders = '?(spec|tasks|lib)/**/*.js';

  glob(validFolders, function onGlob(err, files) {

    if (err) {

      throw err;
    }
    if (files &&
      files.length > 0) {

      var filesIndex = 0
        , filesLength = files.length
        , aResult
        , toLint = []
        , aFileToLint
        , report
        , reportMessagesIndex = 0
        , reportMessagesLength
        , aReportMessage;
      for (; filesIndex < filesLength; filesIndex += 1) {

        aResult = files[filesIndex];
        if (aResult) {

          aFileToLint = path.resolve(__dirname, '../..', aResult);
          if (aFileToLint) {

            toLint.push(aFileToLint);
          }
        }
      }

      report = cli.executeOnFiles(toLint);
      if (report) {


        if (report.results &&
          Array.isArray(report.results)) {

          filesIndex = 0;
          filesLength = report.results.length;
          for (; filesIndex < filesLength; filesIndex += 1) {

            aResult = report.results[filesIndex];
            if (aResult &&
              (aResult.errorCount > 0 || aResult.warningCount > 0) &&
              aResult.filePath &&
              aResult.messages &&
              Array.isArray(aResult.messages)) {

              console.log(colors.red('%s: %s errors, %s warnings'), aResult.filePath, aResult.errorCount, aResult.warningCount);
              reportMessagesIndex = 0;
              reportMessagesLength = aResult.messages.length;
              for (; reportMessagesIndex < reportMessagesLength; reportMessagesIndex += 1) {

                aReportMessage = aResult.messages[reportMessagesIndex];
                if (aReportMessage.severity === 1) {

                  console.log(colors.gray(' %s:%s  %s  %s'), aReportMessage.line, aReportMessage.column, aReportMessage.message, aReportMessage.ruleId);
                } else if (aReportMessage.severity === 2) {

                  console.log(colors.magenta(' %s:%s  %s  %s'), aReportMessage.line, aReportMessage.column, aReportMessage.message, aReportMessage.ruleId);
                }
              }
            }
          }
        }

        if (report.errorCount > 0) {

          console.log(colors.red.underline('%s errors!'), report.errorCount);
          throw 'Blocked due errors.';
        } else {

          console.log(colors.rainbow('No errors!'));
        }

        if (report.warningCount > 0) {

          console.log(colors.yellow.underline('%s warnings!'), report.warningCount);
        } else {

          console.log(colors.rainbow('No warnings!'));
        }
      }
    }
  });
}(require, __dirname, module, console));
