package com.light.controllers;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.amazonaws.services.secretsmanager.AWSSecretsManager;
import com.amazonaws.services.secretsmanager.AWSSecretsManagerClientBuilder;
import com.amazonaws.services.secretsmanager.model.GetSecretValueRequest;
import com.amazonaws.services.secretsmanager.model.GetSecretValueResult;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.light.entity.GitUser;
import com.light.repository.UserRepository;
import com.light.util.GithubConstant;
import com.light.util.HttpsUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import java.util.Arrays;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/awselb")
public class GithubLogController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private UserRepository userRepository;

    private String secret;
    private ObjectMapper mapper = new ObjectMapper();


    // @Autowired
    // private IGithubService githubService;
    // The callback address
    @RequestMapping("/oauth/redirect")
    public String callback(String code, String state, Model model, HttpServletRequest req) throws Exception {
        logger.debug(code);
        /*
         * public static boolean hasText(@Nullable String str) { return (str != null &&
         * !str.isEmpty() && containsText(str)); }
         */
        if (StringUtils.isNotBlank(code) && StringUtils.isNotBlank(state)) {
            HttpsUtil http = new HttpsUtil();
            // Request a token through code
            String token_url = GithubConstant.TOKEN_URL.replace("CODE", code).replace("CLIENT_SECRET", getSecret());
            // Put the String into the map
            String responseStr = http.doGetForString(token_url);
            Map<String, Object> resMap = urlStringToMap(responseStr);
            
            if (resMap.get("access_token") != null) {
                // //Access Token
                String token = resMap.get("access_token").toString();
                logger.debug(token);
                //
                // //Obtain user information using a Token
                String userinfo_url = GithubConstant.USER_INFO_URL.replace("TOKEN", token);
                logger.debug("用户信息===:" + userinfo_url);
                Map<String, String> header = new HashMap<>();
                header.put("Authorization", "token " + token);
                responseStr = http.doGetForStringByHeader("https://api.github.com/user/repos", header);

                model.addAttribute("userInfo", JSONArray.parse(responseStr));
                // Map<String ,String > responseMap =
                // HttpsClientUtils.getMapByJson(responseStr);
            }

            // Login successful
            return "main";

        }

        // Return to the login page
        return "main";
    }

    public String getSecret() {
        return secret;
    }

    @Autowired
    public void setSecret() {
        
        String secretName = "a2_login_secrets";
        String region = "ap-southeast-1";
    
        AWSSecretsManager client  = AWSSecretsManagerClientBuilder.standard()
                                        .withRegion(region)
                                        .build();
    
        GetSecretValueRequest getSecretValueRequest = new GetSecretValueRequest()
                        .withSecretId(secretName);
        GetSecretValueResult getSecretValueResult = null;
    
        try {
            getSecretValueResult = client.getSecretValue(getSecretValueRequest);
        } catch (Exception e) {
            logger.error("get github secret from secretsmanager failed", e);
            throw e;
        } 
    
        // Decrypts secret using the associated KMS CMK.
        // Depending on whether the secret is a string or binary, one of these fields will be populated.
        String json;
        if (getSecretValueResult.getSecretString() != null) {
            json = getSecretValueResult.getSecretString();
        }
        else {
            json= new String(Base64.getDecoder().decode(getSecretValueResult.getSecretBinary()).array());
        }
        JsonNode jsonObject;
        try {
            jsonObject = mapper.readTree(json);
            this.secret = jsonObject.get("CLIENT_SECRET").asText();
        } catch (Exception e) {
            logger.error("secrets format error: ", e);
        }
    }

    @RequestMapping("/oauth/token")
    public ResponseEntity<Map<String,Object>> token(String code, String state, Model model, HttpServletRequest req, HttpSession session) throws Exception {
        Map<String,Object> map = new HashMap<>();
        if (! StringUtils.isNotBlank(code) ||  !StringUtils.isNotBlank(state)) {
            map.put("r", "no code");
            return new ResponseEntity<Map<String,Object>>(map,HttpStatus.NON_AUTHORITATIVE_INFORMATION);
        }
        HttpsUtil http = new HttpsUtil();
        String token_url = GithubConstant.TOKEN_URL.replace("CODE", code).replace("CLIENT_SECRET", getSecret());
        String responseStr = http.doGetForString(token_url);
        Map<String, Object> resMap = urlStringToMap(responseStr);
            
        if (resMap.get("access_token") == null) {
            if (resMap.get("error") != null) {
                map.put("desc", resMap.get("error").toString());
            }
            map.put("r", "error code");
            return new ResponseEntity<Map<String,Object>>(map,HttpStatus.NON_AUTHORITATIVE_INFORMATION);
        }
        // //Access Token
        String token = resMap.get("access_token").toString();
        logger.debug(token);
        //
        // //Obtain user information using a Token
        String userinfo_url = GithubConstant.USER_INFO_URL.replace("TOKEN", token);
        logger.debug("用户信息===:" + userinfo_url);
        Map<String, String> header = new HashMap<>();
        header.put("Authorization", "token " + token);
        responseStr = http.doGetForStringByHeader(userinfo_url, header);

        // model.addAttribute("userInfo", JSONArray.parse(responseStr));
        // model.addAttribute("token", token);
        session.setAttribute("code", code);
        session.setAttribute("token", token);
        map.put("token", token);
        map.put("user", JSONArray.parse(responseStr));

        // // save user
        GitUser gitUser = JSON.parseObject(responseStr, GitUser.class);
        boolean exists = userRepository.existsById(gitUser.getId());
        if (!exists) {
            userRepository.save(gitUser);
        }
      
        return new ResponseEntity<Map<String,Object>>(map,HttpStatus.OK);
    }

    @RequestMapping("/oauth/islogin")
    public ResponseEntity<Map<String,String>> isLogin(String token, String state, Model model, HttpServletRequest req, HttpSession session) throws Exception {
        Map<String,String> map = new HashMap<>();
        if (! StringUtils.isNotBlank(token) ||  !StringUtils.isNotBlank(state)) {
            map.put("r", "no token record");
            return new ResponseEntity<Map<String,String>>(map,HttpStatus.NON_AUTHORITATIVE_INFORMATION);
        }
        if (session.getAttribute("token") == null) {
            map.put("r", "token blank");
            return new ResponseEntity<Map<String,String>>(map,HttpStatus.NON_AUTHORITATIVE_INFORMATION);
        }
        if (!StringUtils.endsWithIgnoreCase(session.getAttribute("token").toString(),token)) {
            map.put("r", "token error");
            return new ResponseEntity<Map<String,String>>(map,HttpStatus.NON_AUTHORITATIVE_INFORMATION);
        }
        map.put("r", "OK");
        return new ResponseEntity<Map<String,String>>(map,HttpStatus.OK);
    }

    @RequestMapping("/oauth/quit")
    public ResponseEntity<Map<String,String>> quit(String token, String state, Model model, HttpServletRequest req, HttpSession session) throws Exception {
        Map<String,String> map = new HashMap<>();
        if (! StringUtils.isNotBlank(token) ||  !StringUtils.isNotBlank(state)) {
            map.put("r", "no token");
            return new ResponseEntity<Map<String,String>>(map,HttpStatus.NON_AUTHORITATIVE_INFORMATION);
        } 
        session.removeAttribute("token");
        session.removeAttribute("code");
        map.put("r", "ok");
        return new ResponseEntity<Map<String,String>>(map,HttpStatus.OK);
    }

    public Map<String, Object> urlStringToMap(String str) {
        Map<String, Object> map = new HashMap<>();
        if (str.contains("&")) {
            String[] keyValueArr = str.split("&");
            Arrays.stream(keyValueArr).forEach(item -> {
                String[] keyAndValues = item.split("=");
                if (keyAndValues.length == 2) {
                    map.put(keyAndValues[0], keyAndValues[1]);
                }

            });
            return map;
        } else {
            if (str.contains("=")) {
                String[] keyAndValues = str.split("=");
                if (keyAndValues.length == 2) {
                    map.put(keyAndValues[0], keyAndValues[1]);
                }
                return map;
            } else {
                return null;
            }
        }

    }

}
