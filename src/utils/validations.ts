// 이메일 유효성 검사
export const isEmailValid = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 비밀번호 유효성 검사
export const isPasswordValid = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return passwordRegex.test(password);
};

// 닉네임 유효성 검사
export const isNicknameValid = (nickname: string): boolean => {
  const nicknameRegex = /^[a-zA-Z0-9가-힣]{2,10}$/; // 2-10자의 한글, 영문, 숫자
  return nicknameRegex.test(nickname);
};

//날짜 포멧 로직
export function formatDateWithTime(inputDateString: string) {
  const inputDate = new Date(inputDateString);
  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
  const day = String(inputDate.getDate()).padStart(2, '0');
  const hours = String(inputDate.getHours()).padStart(2, '0');
  const minutes = String(inputDate.getMinutes()).padStart(2, '0');
  const formattedDate = `${year}.${month}.${day} ${hours}:${minutes}`;
  return formattedDate;
}

export function formatDate(inputDateString: string) {
  const inputDate = new Date(inputDateString);
  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
  const day = String(inputDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}.${month}.${day}`;
  return formattedDate;
}
