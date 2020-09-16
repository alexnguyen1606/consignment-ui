package com.consignment.ui.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CustomUserDetailService implements UserDetailsService {
  @Value("${api.login}")
  private String apiLogin;

  protected UserModel loadUserByApi(String userName, Integer status) {
    String url = apiLogin;
    Map<String, String> data = new HashMap<>();
    data.put("username", userName);
    data.put("status", String.valueOf(status));
    RestTemplate restTemplate = new RestTemplate();
    UserModel userModel = restTemplate.postForObject(url, data, UserModel.class);
    return userModel;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    UserModel userEntity = loadUserByApi(username, 1);
    if (userEntity.getCode() == "500") {
      throw new UsernameNotFoundException("User not found");
    }

    List<GrantedAuthority> authorities = new ArrayList<>();
    for (String userPermistion : userEntity.getRoles()) {
      authorities.add(new SimpleGrantedAuthority(userPermistion));
    }

    MyUser myUser =
        new MyUser(
            userEntity.getUsername(),
            userEntity.getPassword(),
            true,
            true,
            true,
            true,
            authorities);
    myUser.setFullName(userEntity.getFullName());
    myUser.setId(userEntity.getId());

    return myUser;
  }
}
