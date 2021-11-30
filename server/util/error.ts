import { ErrorType } from '../type';

const ERROR = Object.freeze({
  // auth
  NOT_LOGGED_IN: <ErrorType>{ status: 401, message: '로그인이 필요합니다.' },
  NO_GITHUB_USER: <ErrorType>{ status: 500, message: '깃허브 유저정보를 받아오는데 실패했습니다.' },
  SESSION_DESTROY_FAIL: <ErrorType>{ status: 500, message: '로그아웃에 실패했습니다' },

  DB_READ_FAIL: <ErrorType>{ status: 500, message: '데이터베이스 읽기 실패' },
  DB_WRITE_FAIL: <ErrorType>{ status: 500, message: '데이터베이스 쓰기 실패' },
  DB_CONNECT_FAIL: <ErrorType>{ status: 500, message: '데이터베이스 연결 실패' },

  IMAGE_UPLOAD_FAIL: <ErrorType>{ status: 500, message: '이미지 업로드 실패' },

  URL_INVAILD: <ErrorType>{ status: 404, message: '유효하지 않는 url 입니다.' },

  INVALID_POST_ID: <ErrorType>{ status: 404, message: '유효하지 않는 게시글 입니다.' },
  ENTER_FAIL_FULL: <ErrorType>{ status: 500, message: '해당 공구는 정원이 가득 찼습니다.' },
  ENTER_FAIL_FINISHED: <ErrorType>{ status: 500, message: '해당 공구는 이미 마감되었습니다.' }
});

export default ERROR;
