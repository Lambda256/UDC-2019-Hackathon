package bankware.finlab.myworkchain.common.entity;


import java.math.BigDecimal;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
@Entity
@Table(name = "work_history")
public class WorkHistoryEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String userId;
	@CreationTimestamp
	private LocalDateTime time;
	private String workCode;
	private BigDecimal latitude;
	private BigDecimal longitude;
	private String workPlaceCode;
	private int reward;
	private String txId;
	
	@Builder
	public WorkHistoryEntity(int id, String userId, LocalDateTime time, String workCode, BigDecimal latitude, BigDecimal longitude, String workPlaceCode, int reward) {
		this.id = id;
		this.userId = userId;
		this.time = time;
		this.workCode = workCode;
		this.latitude = latitude;
		this.longitude = longitude;
		this.workPlaceCode = workPlaceCode;
		this.reward = reward;
	}
}
