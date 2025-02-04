import { useNavigate } from 'react-router-dom';
import BackBtn from '../components/common/BackBtn';
import Title from '../components/common/Title';
import { LayoutWrapper } from '../components/layout/MainLayout';
import Header from '../components/layout/Header';
import Content from '../components/layout/Content';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { CreatePlanFormI } from '../types/plan.type';
import InputText from '../components/common/InputText';

const HeaderContent = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const CreatePlanForm = styled.form`
  padding: 16px;
`;

const PlanP = styled.p`
  margin: 16px 0px 8px;
  color: #4b5563;
`;

const CreatePlans: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePlanFormI>();

  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({ ...prev, [name]: value }));
  // };

  // const handleTagSelect = (categoryId: number) => {
  //   setFormData(prev => ({ ...prev, categoryId }));
  // };

  return (
    <LayoutWrapper>
      <Header borderWidth="1px">
        <HeaderContent>
          <BackBtn onClick={() => navigate(-1)} />
          <Title absoluteCenter>일정 기록</Title>
        </HeaderContent>
      </Header>
      <Content noFooter>
        <CreatePlanForm>
          <fieldset>
            <PlanP>이름</PlanP>
            <InputText
              height="48px"
              width="100%"
              placeholder="일정 이름을 입력하세요."
              borderWidth="0px"
              {...register('title', { required: true })}
            />
          </fieldset>
          <fieldset>
            <PlanP>날짜 선택</PlanP>
            <InputText
              type="date"
              height="48px"
              width="100%"
              borderWidth="0px"
              {...register('date', { required: true })}
            />
          </fieldset>
        </CreatePlanForm>
      </Content>
    </LayoutWrapper>
  );
};

export default CreatePlans;

// const CreatePlans: React.FC = () => {
//   const navigate = useNavigate();
//   const { showAlert } = useAlert();
//   const [formData, setFormData] = useState<FormData>({
//     title: '',
//     date: new Date().toISOString().split('T')[0],
//     startTime: '14:30',
//     endTime: '14:30',
//     memo: '',
//     color: TAGS[0].color, // 첫 번째 태그의 색상으로 초기화
//     categoryId: TAGS[0].id, // 첫 번째 태그의 ID로 초기화
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       // 필수 입력 필드 검증
//       if (!formData.title.trim()) {
//         showAlert('제목을 입력해주세요.');
//         return;
//       }

//       const response = await createPlan(formData);
//       navigate(-1);
//     } catch (error) {
//       showAlert('일정 생성 중 오류가 발생했습니다.');
//       console.error('Error submitting form:', error);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleTagSelect = (categoryId: number) => {
//     setFormData(prev => ({ ...prev, categoryId }));
//   };

//   const handlePageChange = (path: string) => {
//     navigate(path);
//   };

//   const headerContent = (
//     <HeaderContent>
//       <BackBtn onClick={() => navigate(-1)} />
//       <Title>일정 기록</Title>
//     </HeaderContent>
//   );

//   const footerContent = (
//     <FooterContent>
//       <Button
//         height="54px"
//         onClick={() => {
//           const formEvent = new Event('submit', {
//             cancelable: true,
//             bubbles: true,
//           });
//           document.querySelector('form')?.dispatchEvent(formEvent);
//         }}
//       >
//         저장하기
//       </Button>
//     </FooterContent>
//   );

//   return (
//     <LayoutWrapper>
//       <Header borderWidth="0px">
//         <HeaderContent>
//           <BackBtn onClick={() => navigate(-1)} />
//           <Title>일정 기록</Title>
//         </HeaderContent>
//       </Header>
//       <Content noFooter>
//         <FormWrapper onSubmit={handleSubmit}>
//           <InputGroup>
//             <Label>제목</Label>
//             <InputText
//               type="text"
//               name="title"
//               placeholder="일정 제목을 입력하세요"
//               value={formData.title}
//               onChange={handleInputChange}
//               width="100%"
//               borderWidth="0px"
//             />
//           </InputGroup>
//           <InputGroup>
//             <Label>날짜 선택</Label>
//             <InputText
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleInputChange}
//               width="100%"
//               borderWidth="0px"
//             />
//           </InputGroup>
//           <InputGroup>
//             <Label>시간 선택</Label>
//             <TimeWrapper>
//               <InputText
//                 type="time"
//                 name="startTime"
//                 value={formData.startTime}
//                 onChange={handleInputChange}
//                 width="50%"
//                 borderWidth="0px"
//               />
//               <span>-</span>
//               <InputText
//                 type="time"
//                 name="endTime"
//                 value={formData.endTime}
//                 onChange={handleInputChange}
//                 width="50%"
//                 borderWidth="0px"
//               />
//             </TimeWrapper>
//           </InputGroup>
//           <InputGroup>
//             <Label>메모</Label>
//             <InputText
//               type="text"
//               name="memo"
//               placeholder="메모를 입력하세요"
//               value={formData.memo}
//               onChange={handleInputChange}
//               width="100%"
//               height="80px"
//               borderWidth="0px"
//             />
//           </InputGroup>
//           <TagSelector
//             selectedTagId={formData.categoryId}
//             onSelect={handleTagSelect}
//           />
//         </FormWrapper>
//       </Content>
//     </LayoutWrapper>
//   );
// };

// export default CreatePlans;
