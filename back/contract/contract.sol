pragma solidity ^0.5.0;

contract LinkDog {

    uint indexOfDog = 0;
    uint countOfMarry = 0;

    // 반려견 구조체 선언
    struct Dog {
        address ddid;       // 반려견 번호
        string name;        // 반려견 이름
        string city;        // 반려견이 사는 지역(시)
        uint8 gender;       // 반려견 성별(1: 남자, 2: 여자, 3: 중성화 남자, 4: 중성화 여자)
        uint64 birthday;    // 반려견 생일
        address mommy;      // 반려견의 어머니
        address daddy;      // 반려견의 아버지
        address spouse;  // 반려견의 배우자
        // string diseases;    // 반려견의 질병
    }

    // 결혼 패키지용 구조체 선언
    struct Marry {
        address groom;      // 신랑
        address bride;      // 신부
        uint64 anniversary; // 결혼 기념일
        string package;     // 선택한 결혼 패키지 정보
    }

    // 강아지 번호 조회
    mapping (address => uint) dogNumber;
    
    // 반려견 구조체 Mapping
    mapping (uint => Dog) dogs;

    // 결혼 패키지 구조체 Mapping
    mapping (uint => Marry) marries;

    // 반려견 등록 함수 호출 (배우자 정보 제외)
    function registerDog(address _ddid, string memory _name, string memory _city, uint8 _gender, uint64 _birthday, address _mommy, address _daddy, address _spouse) public {
        // 구조체 생성
        Dog memory dog = Dog(_ddid, _name, _city, _gender, _birthday, _mommy, _daddy, _spouse);
        dogNumber[_ddid] = indexOfDog;
        dogs[indexOfDog] = dog;
        indexOfDog = indexOfDog + 1;
    }

    // 반려견 정보 조회
    function getDog(address ddid) public view returns(
        string memory name,
        string memory city,
        uint8 gender,                   // 반려견 성별(1: 남자, 2: 여자, 3: 중성화 남자, 4: 중성화 여자)
        uint64 birthday,                // 반려견 생일
        address mommy,                  // 반려견의 어머니
        address daddy,                  // 반려견의 아버지
        address spouse                  // 반려견의 배우자
    ) {
        uint index = dogNumber[ddid];
        name = dogs[index].name;
        city = dogs[index].city;
        gender = dogs[index].gender;
        birthday = dogs[index].birthday;
        mommy = dogs[index].mommy;
        daddy = dogs[index].daddy;
        spouse = dogs[index].spouse;
    }

    // 반려견 결혼 정보 수정
    function updateMarryInfoOfDog(address _ddid, address _spouse) public {
        dogs[dogNumber[_ddid]].spouse = _spouse;
    }

    // 결혼 정보 등록(반려견 결혼 성사)
    function registerMarry(uint index, address _groom, address _bride, address _admin, string memory _package) public onlyAdmin(_admin) {
        uint groomIndex = dogNumber[_groom];
        uint brideIndex = dogNumber[_bride];
        dogs[groomIndex].spouse = _bride;
        dogs[brideIndex].spouse = _groom;
        Marry memory marry = Marry(_groom, _bride, uint64(now), _package);
        marries[index] = marry;
        countOfMarry = countOfMarry + 1;
    }

    // 결혼 정보 조회
    function getMarry(uint index) public view returns(
        address groom,          // 신랑
        address bride,          // 신부
        uint64 anniversary,     // 결혼 기념일
        string memory package   // 선택한 결혼 패키지 정보
    ) {
        groom = marries[index].groom;
        bride = marries[index].bride;
        anniversary = marries[index].anniversary;
        package = marries[index].package;
    }

    // 검사
    modifier onlyAdmin(address _admin) {
        require(msg.sender == _admin);
        _;
    }
}