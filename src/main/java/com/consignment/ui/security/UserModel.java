package com.consignment.ui.security;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserModel {
    private String fullName;
    private String id;
    private String code;
    private String username;
    private String password;
    private List<String> permissionNames;
    private List<String> roles;

}
