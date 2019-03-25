import { helper } from '@ember/component/helper';

export function encode([source]/*, hash*/) {
  return encodeURIComponent(source);
}

export default helper(encode);
