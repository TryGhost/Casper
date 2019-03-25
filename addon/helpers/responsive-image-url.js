import { helper } from '@ember/component/helper';

export function responsiveImageUrl(params/*, hash*/) {
  return params[0].replace(/^\/images\//, '')
}

export default helper(responsiveImageUrl);
