package com.consignment.ui.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author:Nguyen Anh Tuan
 * <p>
 * September 13,2020
 */
@Controller
@RequestMapping("/consignment/borrow-lockers")
public class BorrowLockersController {
    @GetMapping
    public ModelAndView list(){
        ModelAndView mav = new ModelAndView("admin/borrow-lockers/list");
        mav.addObject("borrow","active");
        return mav;
    }
}
