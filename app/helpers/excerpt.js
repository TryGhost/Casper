import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';
import _ from 'lodash';
import downsize from 'downsize';

export function getExcerpt(html, truncateOptions) {
    truncateOptions = truncateOptions || {};
    // Strip inline and bottom footnotes
    var excerpt = html.replace(/<a href="#fn.*?rel="footnote">.*?<\/a>/gi, '');
    excerpt = excerpt.replace(/<div class="footnotes"><ol>.*?<\/ol><\/div>/, '');
    // Strip other html
    excerpt = excerpt.replace(/<\/?[^>]+>/gi, '');
    excerpt = excerpt.replace(/(\r\n|\n|\r)+/gm, ' ');

    if (!truncateOptions.words && !truncateOptions.characters) {
        truncateOptions.words = 50;
    }

    return downsize(excerpt, truncateOptions);
}

export function excerpt(content, options/*, hash*/) {
  var truncateOptions = options || {};
  var excerptText = options.custom_excerpt ? String(options.custom_excerpt) : String(content);

    truncateOptions = _.pick(truncateOptions, ['words', 'characters']);
    _.keys(truncateOptions).map(function (key) {
        truncateOptions[key] = parseInt(truncateOptions[key], 10);
    });

    if (!_.isEmpty(options.custom_excerpt)) {
        truncateOptions.characters = options.custom_excerpt.length;
        if (truncateOptions.words) {
            delete truncateOptions.words;
        }
    }

    return htmlSafe(
        getExcerpt(excerptText, truncateOptions)
    );
}

export default helper(excerpt);
