var isProd = 1;
const serverUrl = isProd ? "https://igre-prod.appspot.com/" : "https://childsnack-test.appspot.com/";

export const igreLink = "https://igre.onelink.me/5OuA"
export const igreInsta = "https://www.instagram.com/igre.official/"
export const igreBlog = "https://blog.naver.com/igre_official"
export const fairTrade = "https://www.ftc.go.kr/bizCommPop.do?wrkr_no=2158689431" 

export const reviewList = serverUrl + "_ah/api/review/v1/getReviewList?count=9&startCursor=0";
export const hotTrackList = serverUrl + "_ah/api/category/v1/getList?id=6476096291733504";

export const sendNum =  serverUrl + "_ah/api/user/v1/getAuthNum?phone=";
export const checkAuthNum = serverUrl + "_ah/api/user/v1/checkAuthNum"
export const checkPhone = serverUrl + "_ah/api/user/v1/sendUrl";



