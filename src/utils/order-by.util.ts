import _ from 'lodash';

export const orderByUtil = (collection: any[], orderBy: string, kind: 'asc' | 'desc'): any[] => {
  return _.orderBy(collection, [orderBy], [kind]);
}