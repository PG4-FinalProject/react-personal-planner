import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import BackBtn from '../components/common/BackBtn';
import Title from '../components/common/Title';
import InputText from '../components/common/InputText';
import Button from '../components/common/LongBtn';
import { TagSelector } from '../components/createplans/TagSelector';
import {
  FormWrapper,
  HeaderContent,
  FooterContent,
  InputGroup,
  Label,
  TimeWrapper,
} from '../styles/CreatePlan.style';
import type { FormData } from '../types/createplans';
import { TAGS } from '../constants/constants';
import { createPlan } from '../apis/plans.api';
import { useAlert } from '../hooks/useAlert';

const CreatePlans: React.FC = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '14:30',
    endTime: '14:30',
    memo: '',
    color: TAGS[0].color, // 첫 번째 태그의 색상으로 초기화
    categoryId: TAGS[0].id, // 첫 번째 태그의 ID로 초기화
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 필수 입력 필드 검증
      if (!formData.title.trim()) {
        showAlert('제목을 입력해주세요.');
        return;
      }

      const response = await createPlan(formData);
      navigate(-1);
    } catch (error) {
      showAlert('일정 생성 중 오류가 발생했습니다.');
      console.error('Error submitting form:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagSelect = (categoryId: number) => {
    setFormData(prev => ({ ...prev, categoryId }));
  };

  const handlePageChange = (path: string) => {
    navigate(path);
  };

  const headerContent = (
    <HeaderContent>
      <BackBtn onClick={() => navigate(-1)} />
      <Title>일정 기록</Title>
    </HeaderContent>
  );

  const footerContent = (
    <FooterContent>
      <Button
        height="54px"
        onClick={() => {
          const formEvent = new Event('submit', {
            cancelable: true,
            bubbles: true,
          });
          document.querySelector('form')?.dispatchEvent(formEvent);
        }}
      >
        저장하기
      </Button>
    </FooterContent>
  );

  return (
    <Layout
      headerContent={headerContent}
      footerContent={footerContent}
      onPageChange={handlePageChange}
    >
      <FormWrapper onSubmit={handleSubmit}>
        <InputGroup>
          <Label>제목</Label>
          <InputText
            type="text"
            name="title"
            placeholder="일정 제목을 입력하세요"
            value={formData.title}
            onChange={handleInputChange}
            width="100%"
            borderWidth="0px"
          />
        </InputGroup>
        <InputGroup>
          <Label>날짜 선택</Label>
          <InputText
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            width="100%"
            borderWidth="0px"
          />
        </InputGroup>

        <InputGroup>
          <Label>시간 선택</Label>
          <TimeWrapper>
            <InputText
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleInputChange}
              width="50%"
              borderWidth="0px"
            />
            <span>-</span>
            <InputText
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleInputChange}
              width="50%"
              borderWidth="0px"
            />
          </TimeWrapper>
        </InputGroup>

        <InputGroup>
          <Label>메모</Label>
          <InputText
            type="text"
            name="memo"
            placeholder="메모를 입력하세요"
            value={formData.memo}
            onChange={handleInputChange}
            width="100%"
            height="80px"
            borderWidth="0px"
          />
        </InputGroup>

        <TagSelector
          selectedTagId={formData.categoryId}
          onSelect={handleTagSelect}
        />
      </FormWrapper>
    </Layout>
  );
};

export default CreatePlans;
