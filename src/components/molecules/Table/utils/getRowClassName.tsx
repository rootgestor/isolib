import { TableRecord } from '../typings';

export default (hoverID: any) =>
  (record: TableRecord): string => {
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
