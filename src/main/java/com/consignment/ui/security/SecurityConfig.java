package com.consignment.ui.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
  @Autowired private CustomSuccessHandler customSuccessHandler;
  @Autowired private CustomUserDetailService customUserDetailsService;
  @Autowired private UnauthorizedHandler unauthorizedHandler;

  //  @Bean
  //  public HttpSessionEventPublisher httpSessionEventPublisher() {
  //    return new HttpSessionEventPublisher();
  //  }

  @Bean
  public AuthenticationSuccessHandler myAuthenticationSuccessHandler() {
    return customSuccessHandler;
  }

  @Bean
  public BCryptPasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Autowired
  public void configureGlobal(AuthenticationManagerBuilder managerBuilder) throws Exception {
    managerBuilder.userDetailsService(customUserDetailsService).passwordEncoder(passwordEncoder());
  }

  protected void configure(HttpSecurity http) throws Exception {

    http.csrf().disable();

    http.authorizeRequests().antMatchers("/consignment/**").authenticated();
    http.authorizeRequests()
        .and()
        .formLogin()
        .loginPage("/consignment/login")
        .usernameParameter("username")
        .passwordParameter("password")
        .loginProcessingUrl("/j_spring_security_consignment")
        .successHandler(customSuccessHandler)
        .failureUrl("/consignment/login?accessDenied=true")
        .permitAll()
        .and()
        .logout()
        .logoutUrl("/consignment/logout")
        .logoutSuccessUrl("/consignment/login")
        .invalidateHttpSession(true)
        .and()
        .exceptionHandling()
        .accessDeniedPage("/consignment/login");

//         remember me
     http.rememberMe().key("uniqueAndSecret").tokenValiditySeconds(60*60*24);

//     concurent session
                http.sessionManagement().sessionFixation().newSession()
                        .invalidSessionUrl("/consignment/login?message=timeout")


     .maximumSessions(1).expiredUrl("/consignment/login?message=max_session").maxSessionsPreventsLogin(false);
  }

  //      @Bean
  //  public PersistentTokenRepository persistentTokenRepository() {
  //    InMemoryTokenRepositoryImpl memoryTokenRepository = new InMemoryTokenRepositoryImpl();
  //    return memoryTokenRepository;
  //  }

  @Override
  public void configure(WebSecurity web) throws Exception {
    web.ignoring()
        .antMatchers(
            "/public/image/**",
            "/image/**",
            "/template/**",
            "/admin/template/**",
            "/admin/css/**",
            "public/**",
            "/public/consignment/upload/**","/admin/consignment/upload/**");
  }
}
