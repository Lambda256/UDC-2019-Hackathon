package bankware.finlab.myworkchain.app.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bankware.finlab.myworkchain.app.dto.WorkHistoryDto;
import bankware.finlab.myworkchain.common.constant.DataSourceConstant;
import bankware.finlab.myworkchain.common.entity.WorkHistoryEntity;
import bankware.finlab.myworkchain.common.repository.WorkHistoryRepository;

@Service
public class WorkHistoryService {
	
	@Autowired
	private WorkHistoryRepository workHistoryRepository;
	
	/** 
	 * Work History 생성
	 * @param workHistoryDto
	 * @return WorkHistoryEntity
	 */
	public WorkHistoryEntity newWorkHistoryToDB(WorkHistoryDto workHistoryDto) {
		WorkHistoryEntity workHistoryEntity = WorkHistoryEntity.builder()
																	.userId(workHistoryDto.getUserId())
																	.workCode(workHistoryDto.getWorkCode())
																	.latitude(workHistoryDto.getLatitude())
																	.longitude(workHistoryDto.getLongitude())
																	.workPlaceCode(workHistoryDto.getWorkPlaceCode())
																	.reward(DataSourceConstant.VALUE_AMOUNT)
																	.build();
		return workHistoryRepository.save(workHistoryEntity);
	}

	/**
	 * Work History 가져오기
	 * @param userId
	 * @param time
	 * @return
	 */
	public List<WorkHistoryEntity> getWorkHistoryWithTime(String userId, LocalDateTime time) {
		return workHistoryRepository.findWorkHistoryByUserIdAndTimeBetween(userId, time, time.plusDays(1));
	}
	
	/**
	 * Work History 목록 가져오기
	 * @param userId
	 * @return
	 */
	public List<WorkHistoryEntity> getWorkHistoryList(String userId) {
		return workHistoryRepository.findWorkHistoryByUserId(userId);
	}
	
	
	 
	/**
	 * Chain에 값 등록시 반환받은 txId를 workHistory에 update 해준다. 
	 * @param input
	 * @param txId
	 * @return boolean
	 */
	public void updateTxId(int id, String txId) {		
		WorkHistoryEntity item = workHistoryRepository.findOneById(id);
		item.setTxId(txId);
		workHistoryRepository.save(item);
	}
}
