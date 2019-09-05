// MessageProvider.js
// TODO: 메타데이터 정리 필요

const common = {
  confirm: '확인',
  cancel: '취소',
  wallet: '지갑',
  asset: '자산',
  member: '회원',
  setting: '설정',
  next: '다음',
  password_setting_title: '비밀번호 설정하기',
  enter_password: '비밀번호 입력',
  enter_confirm_password: '확인 비밀번호 입력',
  password_length_validate_desc: '비밀번호는 8자 이상 16자 이하로 입력해주세요',
  password_pattern_validate_desc:
    '비밀번호는 영문,숫자,대문자,특수문자를 조합해서 입력해주세요',
  password_confirm_validate_desc:
    '확인 비밀번호는 비밀번호와 동일하게 입력해주세요',
  password_help_modal_title: '비밀번호란?',
  password_help_modal_using_desc:
    '- 설정한 비밀번호는 자산 출금시 사용자의 키 확인에 이용됨으로서 사용자는 더 안전하게 자산을 관리할 수 있게 됩니다',
  password_help_modal_new_password_desc:
    '- 지갑 삭제시 기존 비밀번호는 사라지게 되며 지갑 복구시 새로운 비밀번호를 설정할 수 있습니다',
  please_try_again: '다시 시도해 주세요',
  validating_password: '비밀번호 확인 중',
  approval: '승인',
  scanner: '스캐너',
};

const wallet = {
  create_wallet: '지갑 생성',
  creating_wallet: '지갑 생성 중',
  loading_wallet: '자산 불러오는 중',
  import_wallet: '지갑 복원',
  importing_wallet: '지갑 복원 중',
  import_wallet_set_password: '비밀번호 설정',
  mnemonic_input_placeholder: '니모닉 단어 입력',
  mnemonic_word_validate: '니모닉 단어 확인',
  default_mnemonic_warning:
    '백업했던 니모닉 단어를 정확히 입력해주세요. 각 단어의 철자와 띄어쓰기에 유의해주세요.',
  length_invalid_mnemonic_warning:
    '유효하지 않은 니모닉입니다.\n 단어 수가 12개인지 확인하세요.',
  badword_invalid_mnemonic_warning:
    '유효하지 않은 니모닉입니다.\n 잘못된 단어가 있는지 확인하세요.',
  checksum_invalid_mnemonic_warning: '유효하지 않은 니모닉입니다.',
  please_write_mnemonic_word: '니모닉 단어를 적어주세요 ✏️',
  what_is_mnemonic_word: '니모닉 단어란?',
  mnemonic_modal_desc_protect:
    '니모닉 단어로 회원님의 자산을 보호할 수 있습니다.\n',
  mnemonic_modal_desc_security:
    '단, 니모닉 단어가 타인에게 노출되면 회원님의 자산을 잃어버릴 수 있으니 절대 타인에게 노출하지 마세요!',
  wallet_connect: '지갑 연결',
  connecting: '연결 중 ...',
  check_connect_info: '연결 요청을 확인해주세요',
  connect_complete: '연결되었습니다',
  qrcode_scan: 'QR코드 스캔',
};

const asset = {
  receive: '받기',
  send: '보내기',
  send_breakdown: '보낸 내역',
  receive_breakdown: '받은 내역',
  send_address: '보낸 주소',
  receive_address: '받은 주소',
  address_copy_complete: '주소가 복사되었습니다',
  enter_address: '주소를 입력해주세요',
  fee: '수수료',
  send_fee_desc: '수수료는 블록체인 네트워크 상황에 따라 달라집니다',
  complete_send_request: '송금 요청 완료',
  complete_send_request_desc:
    '정상적으로 송금 요청되었습니다\n' +
    '선택한 수수료에 따라 지갑 잔고에 반영되기까지\n' +
    '약간의 시간이 소요될 수 있습니다\n',
  ethereum_fee_warning_desc:
    '진행 중인 송금 내역의 수수료는 예상 수수료가 표시됩니다',
  receive_fee: '입금 수수료',
  amount: '수량',
  pending: '펜딩 중',
  processing: '진행 중',
  confirming: '컨펌 중',
  holding_amount: '보유 수량',
  enter_amount: '수량을 입력해주세요',
  enter_password: '비밀번호를 입력해주세요',
  enter_password_for_security: '보안을 위해 비밀번호를 입력해주세요',
  max: 'MAX',
  slow: '느림',
  regular: '보통',
  fast: '빠름',
  minute: '분',
  caution: '주의',
  scan: 'QR코드 스캔',
  invalid_password_warning: '비밀번호가 일치하지 않습니다',
  invalid_address_warning: '주소가 올바르지 않습니다',
  invalid_balance_warning: '보유 잔액이 부족합니다',
  invalid_send_fee_warning: '수수료가 부족합니다',
  write_receive_amount: '받을 수량 직접 작성',
  transaction_amount: '거래 수량',
  transaction_time: '거래 시간',
  transaction_list: '보내기/받기 내역',
  transactions_empty: '보내기/받기 내역이 없습니다.',
  show_more: '더보기',
  send_please_desc: '를 보내주세요',
  search_bitcoin_transaction: '블록체인 탐색기에서 확인하기',
  search_ethereum_transaction: '이더스캔에서 확인하기',
  qrcode_error: '올바르지 않은 QRCode 입니다',
  requesting_send: '송금 요청 중',
};

const setting = {
  security_and_auth: '보안 및 인증',
  mnemonic_backup: '니모닉 백업',
  service_overview: '서비스 안내',
  notice: '공지사항',
  faq: '자주 묻는 질문',
  community: '커뮤니티',
  information: '정보',
  application_version: '앱 버전',
};

const trade = {
  buy: '매수',
  sell: '매도',
  buy_price: '매수가',
  sell_price: '매도가',
  trade_list: '매매 내역',
  count: '건',
  won: '원',
};

const member = {
  basic_info: '기본 정보',
  name: '이름',
  email: '이메일',
  mobilePhone: '핸드폰',
  account_info: '계좌 정보',
  account_number: '계좌 번호',
  bank_name: '은행명',
  account_holder: '예금주',
  account_not_verified: '등록된 계좌가 없습니다',
  change_account: '계좌 변경',
  verify_account: '계좌 등록',
  identity_info: '신원 확인',
  verify_identity: '신원 인증',
  verify_identity_again: '신원 재인증',
  verify_waiting: '요청 대기중',
  verify_companion: '요청 반려',
  verify_request_companion_detail: '신원인증요청 반려 사유',
  verify_complete: '인증 완료',
  not_verified: '미인증',
  welcome_user: '님 반갑습니다 👋',
  change_member_info: '회원 정보 변경',
  change: '변경하기',
  register_bank_account: '계좌 등록',
  verify_idcard_photo: '신분증 사진',
  verify_with_idcard_photo: '신원 확인용 사진',
  upload_idcard_photo: '신분증 사진 업로드',
  upload_with_idcard_photo: '신원 확인용 사진 업로드',
  idcard_warning_valid:
    '신분증은 유효기간이 지나지 않은 주민등록증, 운전면허증만 인정됩니다',
  idcard_warning_hide: '주민등록번호 뒷자리를 가려 주십시오',
  idcard_warning_hide_driver_license:
    '운전면허증은 면허증 번호를 가려 주십시오',
  idcard_warning_face: '본인의 얼굴이 선명하게 나온 신분증을 사용해 주십시오',
  idcard_warning_light:
    '밝은 곳에서 신분증 상의 모든 정보가 선명하게 보이도록 촬영되어야 합니다',
  idcard_warning_revise:
    '포토샵과 같은 프로그램을 사용하여 이미지를 보정하지 마십시오',
  photo_warning_need:
    '신원확인용 사진에는 아래 세 가지가 모두 포함되어야 합니다',
  photo_warning_need_list:
    '1) 자필로 모터스와 오늘의 날짜를 적은 메모\n 2) 유효기간이 표시된 신분증\n 3) 고객님의 얼굴',
  photo_warning_light:
    '밝은 곳에서 신분증과 메모 상의 모든 정보가 선명하게 보이도록 촬영되어야 합니다',
  photo_warning_hide_and_out:
    '신분증의 주민등록번호 뒷자리만 가리고, 메모와 고객님의 얼굴 전체가 확인될 수 있는 사진을 전송해주십시오' +
    '(모자, 머플러, 안대, 선글라스 등 착용 금지)',
  select_photo: '사진 선택',
  take_photo: '직접 촬영하기',
  choose_from_library: '앨범에서 선택하기',
  cancel: '취소',
};

const auth = {
  login_success: '로그인 완료 - 메인으로 이동합니다.',
  login_fail: '로그인 실패 - 다시 로그인 화면으로 이동합니다.',
};

export default {
  common,
  wallet,
  asset,
  setting,
  trade,
  member,
  auth,
};
