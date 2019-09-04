package bankware.finlab.myworkchain.common.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Getter
@Setter
@Entity
@Table(name = "employee")
public class EmployeeEntity {
	
	private String userId;
	@Id
	private String emplAddress; //직원 Wallet 주소
	private String compAddress; //기업 Wallet 주소
	private String name; //이름
	private String currentWorkplaceCode; // 현재 근무지 코드
	@Transient
	private String workPlaceName; //현재 근무지 코드를 바탕으로 가져오는 값
	// 부서
	private String department;
	// 직책
	private String position;
	// 입사일
	private String joinDate;
	// 이메일
	private String email;
	// 휴대전화
	private String phoneNumber;
	@Transient
	private int workValue; //직원 근무 시간 Progress 표시를 위한 value
	@Transient
	private String progressColor; //직원 근무시간 Progress 색
	@Transient
	private String imgName; //직원 근무 상세 Graph Sample Image
	
	
	
	@Builder
	public EmployeeEntity(String userId, String emplAddress, String compAddress, String name, String currentWorkplaceCode, String workPlaceName, String department, String position, String joinDate, String email, String phoneNumber) {
		this.userId = userId;
		this.emplAddress = emplAddress;
		this.compAddress = compAddress;
		this.name = name;
		this.currentWorkplaceCode = currentWorkplaceCode;
		this.workPlaceName = workPlaceName;
		this.department = department;
		this.position = position;
		this.joinDate = joinDate;
		this.email = email;
		this.phoneNumber = phoneNumber;
	}
	
}
