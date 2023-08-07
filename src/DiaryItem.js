import React, { useContext, useRef, useState } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryItem = ({ author, content, emotion, created_date, id }) => {
  const [isEdit, setIsEdit] = useState(false);

  const localContentInput = useRef();

  const { onEdit, onRemove } = useContext(DiaryDispatchContext);
  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleRemove = () => {
    if (window.confirm(`${author}님의 일기를 정말로 삭제하시겠습니까?`))
      onRemove(id);
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const [localContent, setLocalContent] = useState(content);

  const [editDate, setEditDate] = useState(created_date);

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }
    if (window.confirm(`${author}님의 일기를 정말로 수정하시겠습니까?`)) {
      setEditDate(new Date().toLocaleString());
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span className="author-info">
          | 작성자: {author} | 감정점수: {emotion} |
        </span>
        <br />
        <span className="date">
          최초 작성일: {new Date(created_date).toLocaleString()}
          {created_date !== editDate ? <> | 수정 작성일: {editDate}</> : null}
        </span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => {
                setLocalContent(e.target.value);
              }}
            />
          </>
        ) : (
          content
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default React.memo(DiaryItem);
