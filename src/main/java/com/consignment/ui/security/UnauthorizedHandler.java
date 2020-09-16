package com.consignment.ui.security;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author:Nguyen Anh Tuan
 *     <p>June 03,2020
 */
@Component
public class UnauthorizedHandler implements AuthenticationEntryPoint {
  @Override
  public void commence(
      HttpServletRequest request, HttpServletResponse response, AuthenticationException e)
      throws IOException, ServletException {
    response.sendRedirect("redirect:/admin/logout");
  }
}
