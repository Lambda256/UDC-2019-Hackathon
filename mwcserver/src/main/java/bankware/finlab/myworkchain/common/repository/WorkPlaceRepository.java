package bankware.finlab.myworkchain.common.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import bankware.finlab.myworkchain.common.entity.WorkPlaceEntity;

public interface WorkPlaceRepository extends CrudRepository<WorkPlaceEntity, Long> {

	List<WorkPlaceEntity> findWorkPlaceByCompAddress(String compAddress);
	WorkPlaceEntity findWorkNameByWorkCode(String workCode);
}
