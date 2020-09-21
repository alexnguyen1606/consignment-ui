package com.consignment.ui.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author:Nguyen Anh Tuan
 *     <p>September 22,2020
 */
@Controller("/consignment/cabinet")
public class CabinetController {
  @GetMapping("/list")
  public ModelAndView list() {
    ModelAndView mav = new ModelAndView("admin/lockers/cabinet-list");
    return mav;
  }
}
