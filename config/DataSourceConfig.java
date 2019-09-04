package me.kalriz.checkmate.app.config;

import javax.sql.DataSource;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSourceConfig {
	@ConfigurationProperties(prefix="spring.datasource")
	public DataSource dataSource(){
		return DataSourceBuilder.create().build();
	}
}
