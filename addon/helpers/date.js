import { helper } from '@ember/component/helper';
import moment from 'moment';

export function date([post], hash) {
  var format, timeago, dateMoment, date;

  // set to published_at by default, if it's available
  // otherwise, this will print the current date
  if (post && post.date) {
      date = moment(post.date).format();
  } else {
      date = moment();
  }

  format = hash.format || 'MMM DD, YYYY';
  timeago = hash.timeago;

  dateMoment = moment(date);

  if (timeago) {
      date = dateMoment.fromNow();
  } else {
      date = dateMoment.format(format);
  }

  return (date);
}

export default helper(date);
