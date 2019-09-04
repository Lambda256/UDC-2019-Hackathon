package bankware.finlab.myworkchain.common.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name = "company")
public class CompanyEntity {
	
	@Id
	private String compAddress;
	private String mwcAddress;
	private String compName;
	private String location;
	private Boolean useYn;

}

