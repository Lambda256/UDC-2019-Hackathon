package bankware.finlab.myworkchain.common.entity;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name = "work_place")
public class WorkPlaceEntity {
	
	@Id
	private String workCode;
	private String compAddress;
	private String workName;
	private String workAddress;
	private BigDecimal longitude;
	private BigDecimal latitude;
	private Boolean workUseYn;
	
} 
