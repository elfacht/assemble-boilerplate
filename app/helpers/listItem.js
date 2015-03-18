(function () {
    module.exports.register = function (Handlebars, options) {

        /*
         * Context list item helper.
         *
         * @return n elements
         * @example 
         * {{#listItem 2 6 articles}}
              {{> article }}
          {{/listItem}}
         */
        Handlebars.registerHelper('listItem', function (from, to, context, options){
            var item = "";
            for (var i = from, j = to; i < j; i++) {
                item = item + options.fn(context[i]);
            }
            return item;
        });
    };
}).call(this);