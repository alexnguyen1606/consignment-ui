package com.consignment.ui.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author:Nguyen Anh Tuan
 *     <p>July 15,2020
 */
@Controller
public class ErrorHandlerController implements ErrorController {
  private final String PATH = "/error";

  @RequestMapping(value = PATH)
  public ModelAndView error(ModelAndView modelAndView, Exception e) {
    ModelAndView mav = new ModelAndView("admin/error-page");
    return mav;
  }

  @Override
  public String getErrorPath() {
    return "/error";
  }


}
