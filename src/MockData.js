const member = {
  key: 'user1',
  name: '루니',
  dateBirth: '19950911',
  email: 'sign@luniverse.io',
  emailCrtfd: true,
  mobile: '01084439999',
  mobileCrtfd: true,
};

const signedDapp = {
  hum: {
    title: '휴먼이스케이프',
    engTitle: 'HUM',
    symbol: 'HUM',
    address: '123123123',
    icon: 'humLogo',
  },
  svc: {
    title: '스노우메이커스',
    engTitle: 'Snow Value Coin',
    symbol: 'SVC',
    address: 'we5q535321',
    icon: 'svcLogo',
  },
};

const user = {
  user1: {
    address: 'address1',
    name: '사용자 1(address1로 암호화되어야 함)',
    email: 'yun@jeong.kr(address1로 암호화되어야 함)',
    mobile: '01010101(address1로 암호화되어야 함)',
    currentSigned: ['hum'],
  },
  user2: {
    address: 'address2',
    name: '사용자 2(address1로 암호화되어야 함)',
    email: 'yun2@jeong.kr(address2로 암호화되어야 함)',
    mobile: '20202020(address2로 암호화되어야 함)',
    currentSigned: ['hum', 'svc'],
  },
};

const asset = [
  // {
  //   title: 'LuniSign',
  //   engTitle: 'LuniSign',
  //   mtSymbol: 'LS',
  //   stSymbol: '',
  //   address: '0x02F22b64a3281904aDff98EC3D6D4b22F2fC233F',
  //   icon: 'signLogo',
  // },
  {
    title: 'SignToken',
    engTitle: 'SignToken',
    mtSymbol: 'LS',
    stSymbol: 'ST',
    address: '0xc64A0e60D8C66c459E067Cf2C962114676a27c9d',
    icon: 'signLogo',
  },
  {
    title: 'IdolFundingToken',
    engTitle: 'IdolFundingToken',
    mtSymbol: 'LS',
    stSymbol: 'IFT',
    address: '0x20c59BAE45044c196535315c4C939dd974478bF3',
    icon: 'kLogo',
  },
];

const paidUser = {
  hum: {
    user1: {
      address: 'address1',
      name: '사용자 1(hum의 공개키로 암호화되어야 함)',
      email: 'yun1@jeong.kr(hum의 공개키로 암호화되어야 함)',
      mobile: '10101010(hum의 공개키로 암호화되어야 함)',
    },
  },
  svc: {
    user2: {
      address: 'address2',
      name: '사용자 2(hum의 공개키로 암호화되어야 함)',
      email: 'yun2@jeong.kr(hum의 공개키로 암호화되어야 함)',
      mobile: '202020202(hum의 공개키로 암호화되어야 함)',
    },
  },
};

const mockData = {
  member,
  signedDapp,
  user,
  asset,
  paidUser,
};

export default mockData;
