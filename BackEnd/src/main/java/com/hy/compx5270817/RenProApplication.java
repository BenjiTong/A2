package com.hy.compx5270817;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.CookieLocaleResolver;

import javax.swing.*;
import java.util.Locale;

@SpringBootApplication
public class RenProApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application){
        return application.sources(RenProApplication.class);
    }

    public static void main(String[] args){
        SpringApplication.run(RenProApplication.class,args);
    }

    @Bean
    public LocaleResolver localeResolver(){
        CookieLocaleResolver slr = new CookieLocaleResolver();
        slr.setDefaultLocale(Locale.CHINA);
        //设置cookie有效期
        slr.setCookieMaxAge(3600);
        return slr;
    }
}
