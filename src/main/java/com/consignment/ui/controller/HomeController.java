package com.consignment.ui.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author:Nguyen Anh Tuan
 * <p>
 * September 12,2020
 */
@Controller
@RequestMapping("/consignment/home")
public class HomeController {
    @GetMapping
    public ModelAndView home(){
        ModelAndView mav = new ModelAndView("admin/index");
        mav.addObject("dashboard","active");
        return mav;
    }
}
