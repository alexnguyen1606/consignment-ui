package com.consignment.ui.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter {

    @Value("${image.upload.folder}")
    private String uploadImageFolder;



	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/admin/static/**").addResourceLocations("/static/");
		registry.addResourceHandler("/admin/ckfinder/**").addResourceLocations("/admin/template/ckfinder/");
		registry.addResourceHandler("/admin/ckeditor/**").addResourceLocations("/admin/template/ckeditor/");
		registry.addResourceHandler("/admin/template/**").addResourceLocations("/admin/template/");
		registry.addResourceHandler("/admin/image/**").addResourceLocations("/admin/image/");
		registry.addResourceHandler("/admin/css/**").addResourceLocations("/admin/css/");
		registry.addResourceHandler("/admin/images/**").addResourceLocations(uploadImageFolder);

		registry.addResourceHandler("/public/consignment/upload/images/**").addResourceLocations("file:"+uploadImageFolder);


		super.addResourceHandlers(registry);
	}

}
