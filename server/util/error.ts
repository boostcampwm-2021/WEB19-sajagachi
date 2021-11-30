import { ErrorType } from '../type';

const ERROR = Object.freeze({
  // auth
  NOT_LOGGED_IN: <ErrorType>{ status: 401, message: '로그인이 필요합니다.' },
  INVALID_USER: <ErrorType>{ status: 401, message: '사용자 정보가 유효하지 않습니다.' },
  NO_GITHUB_USER: <ErrorType>{ status: 500, message: '깃허브 유저정보를 받아오는데 실패했습니다.' },
  SESSION_DESTROY_FAIL: <ErrorType>{ status: 500, message: '로그아웃에 실패했습니다' },

  DB_READ_FAIL: <ErrorType>{ status: 500, message: '데이터베이스를 읽는데 실패하였습니다.' },
  DB_WRITE_FAIL: <ErrorType>{ status: 500, message: '데이터베이스에 쓰는데 실패하였습니다.' },
  DB_CONNECT_FAIL: <ErrorType>{ status: 500, message: '데이터베이스 연결에 실패하였습니다.' },

  NO_FILE: <ErrorType>{ status: 500, message: '파일이 없습니다.' },
  IMAGE_UPLOAD_FAIL: <ErrorType>{ status: 500, message: '이미지 업로드에 실패하였습니다.' },

  URL_INVAILD: <ErrorType>{ status: 404, message: '유효하지 않는 url 입니다.' },

  INVALID_POST_ID: <ErrorType>{ status: 404, message: '유효하지 않는 게시글 입니다.' },
  ENTER_FAIL: <ErrorType>{ status: 500, message: '해당 공구는 정원이 가득 찼습니다.' },

  NOT_ENOUGH_POINT: <ErrorType>{ status: 500, message: '잔여 포인트가 부족합니다.' },
  NOT_PARTICIPANTS: <ErrorType>{ status: 500, message: '공동구매 참여 정보가 없습니다.' },
  NO_PURCHASE: <ErrorType>{ status: 500, message: '구매 확정 기록이 없습니다.' }
});

export default ERROR;
