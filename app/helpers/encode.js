import { helper } from '@ember/component/helper';

export function encode(params/*, hash*/) {
  return encodeURIComponent( params );
}

export default helper(encode);
