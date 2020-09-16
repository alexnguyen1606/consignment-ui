package com.consignment.ui.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author:Nguyen Anh Tuan
 * <p>
 * September 15,2020
 */
@RequestMapping("/consignment/personal-infomation")
@Controller
public class PersionalInfoController {

    @GetMapping
    public ModelAndView info(){
        ModelAndView mav = new ModelAndView("admin/person-info/info");
        mav.addObject("info","active");
        return mav;
    }
    @GetMapping("/change-password")
    public ModelAndView changePassword(){
        ModelAndView mav = new ModelAndView("admin/person-info/change-password");
        mav.addObject("info","active");
        return mav;
    }
}
