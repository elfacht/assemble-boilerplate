(function () {
    module.exports.register = function (Handlebars, options) {

        /**
         * groupedEach helper
         *
         * @param  {int} every    [number of items in each group]
         * @param  {array} context  [array of items]
         *
         * @example [group every 2 items in one .row]

           {{#groupedEach 2 items}}
              <div class="row">
                {{#each this }}
                    <div class="small-12 large-6 columns">
                      {{foo}}
                    </div>
                {{/each}}
              </div>
          {{/groupedEach}}

         */
        Handlebars.registerHelper('groupedEach', function(every, context, options) {
            var out = "", subcontext = [], i;
            if (context && context.length > 0) {
                for (i = 0; i < context.length; i++) {
                    if (i > 0 && i % every === 0) {
                        out += options.fn(subcontext);
                        subcontext = [];
                    }
                    subcontext.push(context[i]);
                }
                out += options.fn(subcontext);
            }
            return out;
        });
    };
}).call(this);
