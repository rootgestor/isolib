export default (hoverID) => (record) => {
  const namespace = 'isolib-table';
  const classnames = [namespace];
  if (!record.read) {
    classnames.push(`${namespace}--unread`);
  }

  if (hoverID === record._id) {
    classnames.push(`${namespace}--hover`);
  }

  return classnames.join(' ');
};
