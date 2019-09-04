package bankware.finlab.myworkchain.common.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import bankware.finlab.myworkchain.common.entity.CompanyEntity;

public interface CompanyRepository extends CrudRepository<CompanyEntity, Long> {

	List<CompanyEntity> findAll();
	
	CompanyEntity findCompanyByCompAddress(String address);
}
