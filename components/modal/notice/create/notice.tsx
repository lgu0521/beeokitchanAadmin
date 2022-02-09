import dynamic from "next/dynamic";
import { EditorProps, Editor } from "@toast-ui/react-editor";
import styled from "styled-components";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useRef, useState } from "react";
import { TuiEditorWithForwardedProps } from "../../../components/Editor";
import React from "react";
import S from "../../../styles/AdminPage.style";

import {
  PageMaxNoCSSLayout,
  MarginOrPaddingLayout,
  Title2,
} from "../../../components/GlobalComponents";
import { useForm } from "react-hook-form";
import { useRouter } from "next/dist/client/router";

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

const AdminCreateNotice = () => {
  const router = useRouter();
  const editorRef = useRef<Editor>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    if (editorRef.current && data.title) {
      const content = editorRef.current.getInstance().getMarkdown();
      console.log(data.title + "  " + content);
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/notice/create",
        {
          method: "POST",
          body: JSON.stringify({
            title: data.title,
            content: content,
          }),
        }
      );
      if (res) {
        console.log(res);
        router.push("/board");
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
            <S.Input {...register("title", { required: true })} />
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
            />
          </S.InputWrap>
          <S.Button>저장</S.Button>
        </S.Form>
      </MarginOrPaddingLayout>
    </PageMaxNoCSSLayout>
  );
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

export default AdminCreateNotice;
