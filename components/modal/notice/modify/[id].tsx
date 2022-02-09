import dynamic from "next/dynamic";
import { NoticeDetailDTO } from "../../../dto/notice-create.dto";
import { EditorProps, Editor } from "@toast-ui/react-editor";
import styled from "styled-components";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useRef, useState } from "react";
import { TuiEditorWithForwardedProps } from "../../../components/Editor";
import React from "react";
import { GetServerSideProps } from "next";
import { Params } from "next/dist/server/router";
import { useRouter } from "next/dist/client/router";
import S from "../../../styles/AdminPage.style";

import {
  PageMaxNoCSSLayout,
  MarginOrPaddingLayout,
  Title2,
} from "../../../components/GlobalComponents";
import { useForm } from "react-hook-form";

interface Props {
  notice: NoticeDetailDTO;
}

const TuiNoSSRWrapper = dynamic<TuiEditorWithForwardedProps>(
  () => import("../../../components/Editor"),
  {
    ssr: false,
    loading: () => <p>Loading . . .</p>,
  }
);
const TuiWrapper = React.forwardRef((props: EditorProps, ref) => (
  <TuiNoSSRWrapper
    {...props}
    forwardedRef={ref as React.MutableRefObject<Editor>}
  />
));

TuiWrapper.displayName = "Editor";

const ModifyAndDeleteNoticePage = ({ notice }: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const editorRef = useRef<Editor>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);
    if (editorRef.current && data.title) {
      const content = editorRef.current.getInstance().getMarkdown();
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/notice/modify",
        {
          method: "POST",
          body: JSON.stringify({
            id: id,
            title: data.title,
            content: content,
            datetime: new Date(),
          }),
        }
      );
      if (res) {
        router.push("/board/notice/" + id);
      }
    }
  };

  return (
    <PageMaxNoCSSLayout>
      <MarginOrPaddingLayout>
        <Title2
          style={{
            fontWeight: 600,
            marginBottom: "60px",
            color: "rgb(12,50,59)",
          }}
        >
          추가할 공지사항 정보를 입력해주세요
        </Title2>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.InputWrap>
            <S.Label>공지사항 제목</S.Label>
            <S.Input
              {...register("title", { required: true })}
              defaultValue={notice.title}
            />
          </S.InputWrap>

          <S.InputWrap>
            <S.Label>공지사항 내용</S.Label>
            <S.Description>
              사진 첨부시, 반드시 FireBase에서 이미지 업로드 후 URL을
              넣어주세요.
            </S.Description>
            <TuiWrapper
              height="800px"
              initialEditType="wysiwyg"
              useCommandShortcut={true}
              ref={editorRef}
              initialValue={notice.content}
            />
          </S.InputWrap>
          <S.Button>저장</S.Button>
        </S.Form>
      </MarginOrPaddingLayout>
    </PageMaxNoCSSLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: Params) => {
  const { id } = params;
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/api/notice/${id}`
  );
  const notice: NoticeDetailDTO = await res.json();

  if (!notice) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      notice,
    },
  };
};

const Button = styled.button`
  border: 0px;
  border-radius: 5px;
  width: 120px;
  height: 50px;
  color: white;
  font-size: ${(props) => props.theme.fontSizes.lg};
  background-color: black;
`;

export default ModifyAndDeleteNoticePage;
