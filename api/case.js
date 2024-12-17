import { weccApi } from '~/service';

export function getCase(page, pageSize) {
  return weccApi.get(`Case?page=${page}&PageRow=${pageSize}`);
}

// 新增個案
export function postCase(data) {
  return weccApi.post('Case', data);
}

// 更新個案
export function putCase(data) {
  return weccApi.put('Case', data);
}

// 刪除個案
export function deleteCase(sequenceNo) {
  return weccApi.delete(`Case?SequenceNo=${sequenceNo}`);
}

// 個別個案資訊
export function getCaseSequenceNo(sequenceNo) {
  return weccApi.get(`Case/SequenceNo/${sequenceNo}`);
}
