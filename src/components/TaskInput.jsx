import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const AutoTextArea = (props) => {
  const textAreaRef = useRef(null);
  const wrapperRef = useRef(null);
  const [text, setText] = useState("");
  const [term, setTerm] = useState(props.item.task_post);
  const [strikeThrough, setStrikeThrough] = useState(false);
  const [textAreaHeight, setTextAreaHeight] = useState("auto");
  const [parentHeight, setParentHeight] = useState("auto");
  const [disabled, setDisabled] = useState(true);
  const [showFocus, setShowFocus] = useState(false);
  let showStrike = false;

  useEffect(() => {
    setParentHeight(`${textAreaRef.current.scrollHeight}px`);
    setTextAreaHeight(`${textAreaRef.current.scrollHeight}px`);
  }, [text]);

  const onChangeHandler = (event) => {
    setParentHeight(`${textAreaRef.current.scrollHeight}px`);
    setText(event.target.value);
    setTerm(event.target.value);
    if (props.onChange) {
      props.onChange(event);
    }
  };

  const handleEdit = () => {
    setDisabled(!disabled);
    setShowFocus(!showFocus);
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          if (!disabled) {
            // console.log(term, props.item.id, "You clicked outside of me!");
            setDisabled(!disabled);
            setShowFocus(!showFocus);
            props.setTaskData({ id: props.item.id, task: term });
          }
        }
      }
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [ref, term, handleEdit]);
  }

  useOutsideAlerter(wrapperRef);

  useEffect(() => {
    if (props.showStrikeValue === false) {
      let clearStrikeValue = false;
      let setClearValue = true;
      setStrikeThrough(clearStrikeValue);
      props.setShowStrikeValue(setClearValue);
    }
  }, [props.showStrikeValue]);

  const handleDelete = () => {
    showStrike = !strikeThrough;
    setStrikeThrough(showStrike);
    props.setCancel(false);
    if (showStrike) {
      let id = [...props.dataId, props.item.id];
      props.setDataId(id);
    } else {
      setStrikeThrough(false);
      props.setDataId((data) => data.filter((id) => id !== props.item.id));
    }
  };

  return (
    <>
      <form ref={wrapperRef}>
        <div className={`min-h-${parentHeight}`}>
          <textarea
            value={term}
            className={`relative  resize-none pt-12 px-2 tracking-[3px] w-[100%] h-[75px] ${
              strikeThrough && props.showStrikeValue ? "line-through" : ""
            } ${
              showFocus ? "border-b-purple-500" : "border-b-slate-500"
            } bg-white overflow-y-hidden border-b-4 text_pad-input focus:outline-0 transition-colors duration-[700ms]`}
            {...props}
            ref={textAreaRef}
            rows={1}
            style={{
              height: textAreaHeight,
            }}
            onChange={onChangeHandler}
            disabled={disabled}
          />
          <div className="flex justify-end items-center gap-[10px] absolute top-[0px] right-[10px] icon_display">
            <FontAwesomeIcon
              onClick={handleEdit}
              className="text-slate-400 text-[25px] mr-[10px] cursor-pointer hover:text-slate-600"
              icon={faPenToSquare}
            />
            <FontAwesomeIcon
              onClick={handleDelete}
              className="text-red-300 text-[25px] cursor-pointer hover:text-red-500"
              icon={faTrash}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default AutoTextArea;
