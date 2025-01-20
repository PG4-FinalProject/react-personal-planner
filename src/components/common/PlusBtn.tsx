import React from 'react';
import { Plus } from 'lucide-react'; // 아이콘 임포트
import { palette } from '../../styles/Palette'; // 팔레트 임포트

interface PlusButtonProps {
    onClick: () => void; // onClick prop의 타입 정의
}

export const PlusButton: React.FC<PlusButtonProps> = ({ onClick }) => {
    return (
        <button 
            onClick={onClick} 
            style={{
                backgroundColor: palette.blue, // 팔레트의 파란색 사용
                color: palette.white, // 아이콘 색상
                border: 'none', // 테두리 없음
                borderRadius: '50%', // 완전한 원형으로 만들기
                padding: '10px', // 여백
                cursor: 'pointer', // 커서 모양
                display: 'flex', // 아이콘 정렬
                alignItems: 'center', // 세로 정렬
                justifyContent: 'center', // 가로 정렬
                width: '50px', // 버튼 너비
                height: '50px', // 버튼 높이
                position: 'fixed', // 고정 위치
                
            }}
        >
            <Plus color={palette.white} size={24} /> {/* 아이콘 */}
        </button>
    );
};
