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
@RequestMapping("/consignment/tracking-log")
public class TrackingLogController {

  @GetMapping
  public ModelAndView list() {
    ModelAndView mav = new ModelAndView("admin/tracking/list");
    mav.addObject("tracking","active");
    return mav;
  }
}
