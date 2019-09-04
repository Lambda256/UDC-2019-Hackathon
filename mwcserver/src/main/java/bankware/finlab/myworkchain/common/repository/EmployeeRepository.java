package bankware.finlab.myworkchain.common.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import bankware.finlab.myworkchain.common.entity.EmployeeEntity;

public interface EmployeeRepository extends CrudRepository<EmployeeEntity, Long> {

	List<EmployeeEntity> findAll();
	List<EmployeeEntity> findEmployeeByEmplAddress(String emplAddress);
	EmployeeEntity findEmployeeByUserId(String userId);
}
