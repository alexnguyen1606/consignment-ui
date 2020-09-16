package com.consignment.ui.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Component
public class CustomSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

    public void loginUserByApi() {
        MyUser currentUser = SecurityUtils.getPrincipal();
        UserModel data = new UserModel();
        data.setUsername(currentUser.getUsername());
        data.setPassword(currentUser.getPassword());
        String uri = "localhost:8080/api/login";
        RestTemplate restTemplate = new RestTemplate();
        UserModel response = restTemplate.postForObject( uri, data, UserModel.class);
    }

    public void handle(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException {
        String targetUrl = determineTargetUrl(authentication);
        if (response.isCommitted()) {
            return;
        }
//        loginUserByApi();
        redirectStrategy.sendRedirect(request, response, targetUrl);
    }

    public RedirectStrategy getRedirectStrategy() {
        return redirectStrategy;
    }

    public void setRedirectStrategy(RedirectStrategy redirectStrategy) {
        this.redirectStrategy = redirectStrategy;
    }

    private String determineTargetUrl(Authentication authentication) {
        String url = "/consignment/home";

        return url;
    }

    private boolean isAdmin(List<String> roles) {
        if (roles.contains("ROLE_MOD") || roles.contains("ROLE_SUPER_ADMIN") || roles.contains("ROLE_TEACHER")) {
            return true;
        }
        return false;
    }

    private boolean isUser(List<String> roles) {
        if (roles.contains("ROLE_USER")) {
            return true;
        }
        return false;
    }
}
