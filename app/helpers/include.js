(function () {
    module.exports.register = function (Handlebars, options) {

        /*
         * Context include helper.
         *
         * @return merged context
         * @example
         * {{#each items}}
         *   {{#include parent=..}}
         *       {{> item-template}}
         *   {{/include}}
         * {{/each}}
         */
        Handlebars.registerHelper('include', function (options) {
            var context = {},
                mergeContext = function(obj) {
                    for(var k in obj) {
                      context[k]=obj[k];
                    };
                };
            mergeContext(this);
            mergeContext(options.hash);
            return options.fn(context);
        });
    };
}).call(this);