/* eslint-disable no-useless-escape,no-console */

// # Has Helper
// Usage: `{{#has tag="video, music"}}`, `{{#has author="sam, pat"}}`
//        `{{#has author="count:1"}}`, `{{#has tag="count:>1"}}`
//
// Checks if a post has a particular property

import { helper } from '@ember/component/helper';


import _ from 'lodash';

const validAttrs = ['tag', 'author', 'slug', 'id', 'number', 'index', 'any', 'all'];

function handleCount(ctxAttr, data) {
    let count;

    if (ctxAttr.match(/count:\d+/)) {
        count = Number(ctxAttr.match(/count:(\d+)/)[1]);
        return count === data.length;
    } else if (ctxAttr.match(/count:>\d/)) {
        count = Number(ctxAttr.match(/count:>(\d+)/)[1]);
        return count < data.length;
    } else if (ctxAttr.match(/count:<\d/)) {
        count = Number(ctxAttr.match(/count:<(\d+)/)[1]);
        return count > data.length;
    }

    return false;
}

function evaluateTagList(expr, tags) {
    return expr.split(',').map(function (v) {
        return v.trim();
    }).reduce(function (p, c) {
        return p || (_.findIndex(tags, function (item) {
            // Escape regex special characters
            item = item.replace(/[\-\/\\\^$*+?.()|\[\]{}]/g, '\\$&');
            item = new RegExp('^' + item + '$', 'i');
            return item.test(c);
        }) !== -1);
    }, false);
}

function handleTag(data, attrs) {
    if (!attrs.tag) {
        return false;
    }

    if (attrs.tag.match(/count:/)) {
        return handleCount(attrs.tag, data.tags);
    }

    return evaluateTagList(attrs.tag, _.map(data.tags, 'name')) || false;
}

function evaluateAuthorList(expr, authors) {
    var authorList = expr.split(',').map(function (v) {
        return v.trim().toLocaleLowerCase();
    });

    return _.filter(authors, (author) => {
        return _.includes(authorList, author.name.toLocaleLowerCase());
    }).length;
}

function handleAuthor(data, attrs) {
    if (!attrs.author) {
        return false;
    }

    if (attrs.author.match(/count:/)) {
        return handleCount(attrs.author, data.authors);
    }

    return evaluateAuthorList(attrs.author, data.authors) || false;
}

function evaluateIntegerMatch(expr, integer) {
    var nthMatch = expr.match(/^nth:(\d+)/);
    if (nthMatch) {
        return integer % parseInt(nthMatch[1], 10) === 0;
    }

    return expr.split(',').reduce(function (bool, _integer) {
        return bool || parseInt(_integer, 10) === integer;
    }, false);
}

function evaluateStringMatch(expr, str, ci) {
    if (ci) {
        return expr && str && expr.toLocaleLowerCase() === str.toLocaleLowerCase();
    }

    return expr === str;
}

/**
 *
 * @param {String} type - either some or every - the lodash function to use
 * @param {String} expr - the attribute value passed into {{#has}}
 * @param {Object} obj - "this" context from the helper
 * @param {Object} data - global params
 */
function evaluateList(type, expr, obj, data) {
    return expr.split(',').map(function (prop) {
        return prop.trim().toLocaleLowerCase();
    })[type](function (prop) {
        if (prop.match(/^@/)) {
            return _.has(data, prop.replace(/@/, '')) && !_.isEmpty(_.get(data, prop.replace(/@/, '')));
        } else {
            return _.has(obj, prop) && !_.isEmpty(_.get(obj, prop));
        }
    });
}

export function has(params, hash) {
    const options = {};
    options.hash = hash || {};
    options.data = options.data || {};

    var self = this,
        attrs = _.pick(options.hash, validAttrs),
        data = _.pick(options.data, ['blog', 'config', 'labs']),
        checks = {
            tag: function () {
                return handleTag(self, attrs);
            },
            author: function () {
                return handleAuthor(self, attrs);
            },
            number: function () {
                return attrs.number && evaluateIntegerMatch(attrs.number, options.data.number) || false;
            },
            index: function () {
                return attrs.index && evaluateIntegerMatch(attrs.index, params[0]) || false;
            },
            slug: function () {
                return attrs.slug && evaluateStringMatch(attrs.slug, self.slug, true) || false;
            },
            id: function () {
                return attrs.id && evaluateStringMatch(attrs.id, self.id, true) || false;
            },
            any: function () {
                return attrs.any && evaluateList('some', attrs.any, self, data) || false;
            },
            all: function () {
                return attrs.all && evaluateList('every', attrs.all, self, data) || false;
            }
        };

    if (_.isEmpty(attrs)) {
        console.warn('warnings.helpers.has.invalidAttribute');
        return;
    }

    return _.some(attrs, function (value, attr) {
        return checks[attr]();
    });
}

export default helper(has);
