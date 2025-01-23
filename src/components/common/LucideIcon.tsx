import { icons } from 'lucide-react'; // lucide-react에서 아이콘 가져오기
import React from 'react';

export interface LucideIconProps {
  name: keyof typeof icons; // 아이콘 이름을 키로 하는 타입
  size?: number; // 아이콘 크기
  className?: string; // 추가적인 클래스 이름
  onClick?: () => void; // 클릭 이벤트 핸들러
}

const LucideIcon = ({
  name,
  size = 16, // 기본 크기
  className = '', // 기본 클래스 이름
  onClick, // 클릭 이벤트 핸들러
}: LucideIconProps) => {
  const SelectLucideIcon = icons[name]; // 아이콘 선택

  return (
    <SelectLucideIcon
      size={size} // 크기 설정
      className={`${className} ${onClick ? 'cursor-pointer' : ''}`} // 클릭 이벤트가 있을 경우 포인터 스타일 추가
      onClick={onClick} // 클릭 이벤트 전달
    />
  );
};

export default LucideIcon;
