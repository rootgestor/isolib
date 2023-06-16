import { TableRecord } from '../typings';

interface BaseRecord {
  _id?: string;
  read?: boolean;
}

export default (hoverID: React.Key) =>
  (record: TableRecord<BaseRecord>): string => {
    const namespace = 'isolib-table-msg';
    const classnames = [namespace];
    if (record.read === false) {
      classnames.push(`${namespace}--unread`);
    }

    if (hoverID === record._id) {
      classnames.push(`${namespace}--hover`);
    }

    return classnames.join(' ');
  };
