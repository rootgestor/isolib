import { TableRecord } from '../typings';
interface BaseRecord {
    _id?: string;
    read?: boolean;
}
declare const _default: (hoverID: React.Key) => (record: TableRecord<BaseRecord>) => string;
export default _default;
