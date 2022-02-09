//Basic
import { GetStaticProps, NextPage } from "next";
import { useForm } from "react-hook-form";
import {
  PageMaxNoCSSLayout,
  Title2,
  MarginOrPaddingLayout,
} from "../../../components/GlobalComponents";
//DTO
import { MenuCreateDTO, MenuCatagoryDTO } from "../../../dto/menu-create.dto";
//Style
import S from "../../../styles/AdminPage.style";

interface Props {
  menuCatagorys: MenuCatagoryDTO[];
}

const CreateMenu: NextPage<Props> = ({ menuCatagorys }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/menu/create",
        {
          method: "POST",
          body: JSON.stringify({
            ...data,
            image: {
              downloadUrl: data.downloadUrl,
              storageRef: "/Menu",
              fileName: data.downloadUrl.split("/").pop(),
            },
          } as MenuCreateDTO),
        }
      );
      if (res && typeof window != null) {
        window.location.reload();
      }
    } catch (e) {
      alert(e);
    }
  };
  //이미지 권장설명 수정 필요 & placeholder 문구 수정
  return (
    <>
      <PageMaxNoCSSLayout>
        <MarginOrPaddingLayout>
          <Title2
            style={{
              fontWeight: 600,
              marginBottom: "60px",
              color: "rgb(12,50,59)",
            }}
          >
            추가할 메뉴 정보를 입력해주세요
          </Title2>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <S.InputWrap>
              <S.Label>메뉴 카테고리</S.Label>
              <S.Description>
                메뉴 카테고리를 생성하고 싶으시면 메인에서 추가하세요
              </S.Description>
              <S.Select {...register("catagory", { required: true })}>
                {menuCatagorys.map((item, i) => (
                  <option value="item.title" key={i}>
                    {item.title}
                  </option>
                ))}
              </S.Select>
            </S.InputWrap>
            <S.InputWrap>
              <S.Label>메뉴 이름</S.Label>
              <S.Input
                placeholder="메뉴 이름을 입력해주세요"
                {...register("title", { required: true, maxLength: 20 })}
              />
            </S.InputWrap>
            <S.InputWrap>
              <S.Label>메뉴 설명1</S.Label>
              <S.Input
                placeholder="메뉴에 대해 짧은 설명문을 입력해주세요"
                {...register("content1", { required: true })}
              />
            </S.InputWrap>
            <S.InputWrap>
              <S.Label>메뉴 설명2</S.Label>
              <S.Input
                placeholder="메뉴에 대해 짧은 설명문을 입력해주세요"
                {...register("content2")}
              />
            </S.InputWrap>
            <S.InputWrap>
              <S.Label>메뉴 이미지 링크</S.Label>
              <S.Description>
                권장: 1920px X 800px (비율 2:1) / 포맷 jpg, png (최대 10MB)
              </S.Description>
              <S.Input {...register("downloadUrl", { required: true })} />
            </S.InputWrap>
            <S.Button>저장</S.Button>
          </S.Form>
        </MarginOrPaddingLayout>
      </PageMaxNoCSSLayout>
    </>
  );
};
export const getStaticProps: GetStaticProps = async (context) => {
  const menuCatagorys: MenuCatagoryDTO[] = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/menu/catagory"
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });

  if (!menuCatagorys) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      menuCatagorys,
    },
  };
};
export default CreateMenu;
