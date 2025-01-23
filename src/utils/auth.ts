// utils/auth.ts
export const login = async (email: string, password: string) => {
  try {
    // 여기에 실제 API 호출을 추가합니다.
    // 예시로 Promise를 반환하는 가상의 API 호출 코드입니다.
    const response = await fetch('https://example.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('로그인 실패: ' + response.statusText);
    }

    const data = await response.json();
    return data; // 필요한 데이터 반환
  } catch (error) {
    console.error('로그인 중 오류 발생:', error);
    throw error; // 상위에서 에러 처리 가능
  }
};
