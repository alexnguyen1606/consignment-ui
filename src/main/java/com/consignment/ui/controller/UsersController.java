package com.consignment.ui.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author:Nguyen Anh Tuan
 *     <p>September 15,2020
 */
@Controller
@RequestMapping("/consignment/users")
public class UsersController {
  @GetMapping("/list")
  public ModelAndView list() {
    ModelAndView mav = new ModelAndView("admin/user/list");
    mav.addObject("user", "active");
    return mav;
  }
}
