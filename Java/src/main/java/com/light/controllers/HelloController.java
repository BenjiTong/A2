package com.light.controllers;

import java.util.List;

import com.light.entity.MainObj;
import com.light.repository.MainRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/awselb")
public class HelloController {

    private final MainRepository mainRepository;
    Logger logger = LoggerFactory.getLogger(this.getClass());

    // @GetMapping("/")
    // public String hello(Model model, @RequestParam(value="name", required=false, defaultValue="World") String name) {
    //     model.addAttribute("name", name);
    //     long cnt = mainRepository.count();
    //     logger.debug("get from db:" + cnt);
    //     return "hello";
    // }

    @GetMapping("/city")
    public ResponseEntity<List<MainObj>> getMainObjByCityId(Model model, @RequestParam(value="id", required=true, defaultValue="0") Integer cityId) {
        long cnt = mainRepository.count();
        logger.debug("get from db:" + cnt);
        List<MainObj> lst = mainRepository.findByCityId(cityId);
        return new ResponseEntity<List<MainObj>>(lst, HttpStatus.OK);
    }

    @Autowired
    private HelloController(MainRepository mainRepository) {
        this.mainRepository = mainRepository;
    }

}

