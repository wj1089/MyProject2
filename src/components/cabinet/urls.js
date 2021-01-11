const isProd = 1;
const serverUrl = isProd
  ? 'https://igre-prod.appspot.com/'
  : 'https://childsnack-test.appspot.com/';

const reviewApi = '_ah/api/review/v1/getReviewList?count=9&startCursor=0';
const hotTrackApi = '_ah/api/category/v1/getList?id=6476096291733504';
const getAuthNum = '_ah/api/user/v1/getAuthNum?phone=';
const userAuth = '_ah/api/user/v1/checkAuthNum';
const sendUrl = '_ah/api/user/v1/sendUrl';

export const reviewList = serverUrl + reviewApi;
export const hotTrackList = serverUrl + hotTrackApi;
export const sendNum = serverUrl + getAuthNum;
export const checkAuthNum = serverUrl + userAuth;
export const checkPhone = serverUrl + sendUrl;

export const igreLink = 'https://igre.onelink.me/5OuA';
export const igreInsta = 'https://www.instagram.com/igre.official/';
export const igreBlog = 'https://blog.naver.com/igre_official';
export const fairTrade = 'https://www.ftc.go.kr/bizCommPop.do?wrkr_no=2158689431';
