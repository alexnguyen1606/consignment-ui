package com.consignment.ui.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author:Nguyen Anh Tuan
 * <p>
 * September 12,2020
 */
@Controller
@RequestMapping
public class DirectController {
    @GetMapping
    public String redirect(){
        return "redirect:/consignment/home";
    }
}
