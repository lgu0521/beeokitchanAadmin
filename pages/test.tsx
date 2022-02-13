import React, { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import MarkdownEditor from "rich-markdown-editor";
import useUploadStorage from "../hooks/useUploadStorage";
import { GetServerSideProps, NextPage } from "next";
import { NoticeDTO } from "../dto/notice.dto";

type Props = {
    item: NoticeDTO;
}

const Editor:NextPage<Props> = ({item}) => {
    const [value, setValue] = useState('');
    const localStorage = useUploadStorage;

    useEffect(() => {
        if (item !== undefined && value === null) {
            console.log("Set initial content");
            setValue(item.content);
        }
    }, [item, value]);

    const onUnload = (event:any) => {
        event.preventDefault();
        event.returnValue = "You have unsaved changes!";
        return "You have unsaved changes!";
    };

    useEffect(() => {
        if (item && !(item.content === value)) {
            window.addEventListener("beforeunload", onUnload);
        } else {
            window.removeEventListener("beforeunload", onUnload);
        }

        return () => window.removeEventListener("beforeunload", onUnload);
    });

    const saveChanges = () => {
        // db.collection("users").doc(userId).collection("files").doc(fileId).update({
        //     content: value,
        // });
        // mutate([userId, fileId]);
        // toast.success("🎉 Your changes have been saved!");
    };

    const uploadImage = async (item: any) => {
        const res = await localStorage(item, "storeImage");
        return res.downloadUrl;
    };

        return (
            <>
                <div>
                    <div className="editor">
                        <MarkdownEditor
                            defaultValue={item.content}
                            onChange={(getValue) => {
                                setValue(getValue());
                            }}
                            uploadImage={uploadImage}
                        />
                    </div>
                </div>
            </>
        );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/notice/qggZhOPavXKVePJ4tCPB");
    const item = await res.json();

    return {
        props: {
            item
        }
    }
}

export default Editor;
