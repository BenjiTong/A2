package com.hy.compx5270817;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
@Controller
@SpringBootApplication
public class Compx5270817Application {

    public static void main(String[] args) {
        SpringApplication.run(Compx5270817Application.class, args);
    }


    @ResponseBody
    @RequestMapping(value = "/hello")
    public String hello(){
        System.out.println("Hello....");
        return "hello...";
    }

}
