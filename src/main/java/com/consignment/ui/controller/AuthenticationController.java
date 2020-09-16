package com.consignment.ui.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author:Nguyen Anh Tuan
 *     <p>September 13,2020
 */
@Controller
@RequestMapping("/consignment")
public class AuthenticationController {
  @GetMapping("/login")
  public String login() {
    return "login";
  }

  @GetMapping("/logout")
  public String logut() {
    return "redirect:/consignment/login";
  }
}
