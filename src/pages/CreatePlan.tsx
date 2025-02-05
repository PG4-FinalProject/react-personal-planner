import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BackBtn from '../components/common/BackBtn';
import Title from '../components/common/Title';
import { LayoutWrapper } from '../components/layout/MainLayout';
import Header from '../components/layout/Header';
import Content from '../components/layout/Content';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { CreatePlanFormI } from '../types/plan.type';
import InputText from '../components/common/InputText';
import { useCategory } from '../hooks/useCategory';
import CategoryRadioBtn from '../components/createPlanPage/CategoryRadioBtn';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import { useAlert } from '../hooks/useAlert';
import { usePlan } from '../hooks/usePlan';
import LucideIcon from '../components/common/LucideIcon';
import dayjs from 'dayjs';
import { getDateFormat } from '../utils/date'; // getDateFormat import 추가

export const HeaderContent = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const CreatePlanForm = styled.form`
  padding: 16px;
`;

export const PlanP = styled.p`
  margin: 20px 0px 8px;
  font-weight: bold;
  color: #4b5563;
`;

export const PlanTimeBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const CategoriesBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const CreatePlan: React.FC = () => {
  const location = useLocation();
  const selectedDate = location.state?.selectedDate;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePlanFormI>({
    defaultValues: {
      date: selectedDate || dayjs().format('YYYY-MM-DD'),
      startTime: dayjs().format('HH:00:00'),
      endTime: dayjs().add(1, 'hour').format('HH:00:00'),
    },
  });
  const { categories } = useCategory();
  const { createPlan } = usePlan();
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const onCreatePlan = (data: CreatePlanFormI) => {
    if (data.startTime >= data.endTime) {
      showAlert('일정 시작 시간이 종료 시간 전이어야 합니다.');
      return;
    }

    const { title, detail, date, startTime, endTime, categoryId } = data;
    const startDateTime = date + ' ' + startTime;
    const endDateTime = date + ' ' + endTime;

    createPlan({
      title,
      detail,
      startTime: startDateTime,
      endTime: endDateTime,
      categoryId,
    });
  };

  return (
    <LayoutWrapper>
      <Header borderWidth="1px">
        <HeaderContent>
          <BackBtn onClick={() => navigate(-1)} />
          <Title absoluteCenter>일정 기록</Title>
        </HeaderContent>
      </Header>
      <Content>
        <CreatePlanForm id="createPlan" onSubmit={handleSubmit(onCreatePlan)}>
          <fieldset>
            <PlanP>이름</PlanP>
            <InputText
              height="48px"
              width="100%"
              autoFocus
              placeholder="일정 이름을 입력하세요."
              borderWidth="0px"
              fontWeight="bold"
              {...register('title', { required: true })}
            />
          </fieldset>
          <fieldset>
            <PlanP>날짜 선택</PlanP>
            <InputText
              type="date"
              min="2020-01-01"
              max="2029-12-31"
              height="48px"
              width="100%"
              borderWidth="0px"
              fontWeight="bold"
              {...register('date', { required: true })}
            />
          </fieldset>
          <fieldset>
            <PlanP>시간 선택</PlanP>
            <PlanTimeBox>
              <InputText
                type="time"
                height="48px"
                width="40%"
                borderWidth="0px"
                fontWeight="bold"
                {...register('startTime', { required: true })}
              />
              <LucideIcon name="Minus" size={10} />
              <InputText
                type="time"
                height="48px"
                width="40%"
                borderWidth="0px"
                fontWeight="bold"
                {...register('endTime', { required: true })}
              />
            </PlanTimeBox>
          </fieldset>
          <fieldset>
            <PlanP>메모</PlanP>
            <InputText
              height="48px"
              width="100%"
              placeholder="메모를 입력하세요."
              borderWidth="0px"
              {...register('detail')}
            />
          </fieldset>
          <fieldset>
            <PlanP>태그 선택</PlanP>
            <CategoriesBox>
              {categories.map(category => (
                <CategoryRadioBtn
                  key={category.id}
                  category={category}
                  {...register('categoryId', { required: true })}
                />
              ))}
            </CategoriesBox>
          </fieldset>
        </CreatePlanForm>
      </Content>
      <Footer borderWidth="0px">
        <Button type="submit" form="createPlan" margin="16px" height="48px">
          생성하기
        </Button>
      </Footer>
    </LayoutWrapper>
  );
};

export default CreatePlan;
