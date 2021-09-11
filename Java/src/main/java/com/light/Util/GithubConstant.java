package com.light.util;

public class GithubConstant {

    public static final String CLIENT_ID="c04fa22c7aa981ba6419";
    //https://github.com/login/oauth/authorize?client_id=c04fa22c7aa981ba6419&redirect_uri=http%3A%2F%2Fhttpelb-1499061197.ap-southeast-1.elb.amazonaws.com%2Foauth%2Fredirect&scope=read%3Auser&state=A2Inc
    public static final String CALLBACK = "http://httpelb-1499061197.ap-southeast-1.elb.amazonaws.com/oauth/redirect";

    public static final String CODE_URL = "https://github.com/login/oauth/authorize?client_id="+CLIENT_ID+"state=STATE&redirect_uri="+CALLBACK+"";

    public static final String TOKEN_URL = "https://github.com/login/oauth/access_token?client_id="+CLIENT_ID+"&client_secret=CLIENT_SECRET&code=CODE&redirect_uri="+CALLBACK+"";

    public static final String USER_INFO_URL = "https://api.gihub.com/user?access_token=TOKEN";

}

