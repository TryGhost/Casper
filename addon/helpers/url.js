import { helper } from '@ember/component/helper';
import config from 'ember-get-config';

export function url(params/*, hash*/) {
  if(!params[0] || params[0].startsWith('//')) {
    return params;
  }

  let prefix = config.apiHost || '';

  if (prefix && config.apiNamespace) {
    prefix += `/${config.apiNamespace}`;
  } else if(prefix) {
    prefix += config.apiNamespace;
  }

  return prefix + params[0];
}

export default helper(url);
