package me.kalriz.checkmate.app.config;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

@Configuration
@MapperScan(basePackages="me.kalriz.checkmate.app.dao")
public class DataAccessConfig {
	@Bean
	public SqlSessionFactory sqlSessionFactory(DataSource ds) throws Exception{
		SqlSessionFactoryBean sfBean = new SqlSessionFactoryBean();
		
		sfBean.setDataSource(ds);
		sfBean.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath:mapper/*-mapper.xml"));
		
		return sfBean.getObject();
	}
	
	@Bean
	public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory ssf){
		return new SqlSessionTemplate(ssf);
	}
}
