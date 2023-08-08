import React, { useCallback, useEffect, useState } from "react";
import QuestionModel from "../../interfaces/QuestionModel";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { formResponseActions } from "../../store/formResponseSlice";

interface props {
  question: QuestionModel;
  index: number;
}

const FormCloze: React.FC<props> = ({ question, index }) => {
  const [options, setOptions] = useState(question.options);
  const dispatch = useDispatch();
  const [previewText, setPreviewText] = useState<
    Array<{
      word: string;
      isShow: boolean;
    }>
  >(question.wordsArray);

  const initialPreviewSet = useCallback(() => {
    let preview: Array<{
      word: string;
      isShow: boolean;
    }> = [];
    question.wordsArray.forEach((ele) => {
      if (ele.isShow) {
        preview.push({
          word: ele.word,
          isShow: true,
        });
      } else {
        preview.push({
          word: "",
          isShow: false,
        });
      }
    });
    setPreviewText(preview);
  }, [question.wordsArray]);

  useEffect(() => {
    initialPreviewSet();
  }, [initialPreviewSet]);

  const onDragEndHandler = (result: DropResult) => {
    // console.log(result);
    if (!result.destination) {
      return;
    }
    if (result.source.droppableId === result.destination.droppableId) {
      return;
    }
    const newOptions = [...options];
    dispatch(
      formResponseActions.clozeAddAnswer({
        id: question.id,
        option: newOptions[result.source.index].name,
      })
    );
    let preview = [...previewText];
    preview[+result.destination.droppableId].word =
      newOptions[result.source.index].name;
    newOptions.splice(result.source.index, 1);
    setPreviewText(preview);
    setOptions(newOptions);
  };

  return (
    <DragDropContext onDragEnd={onDragEndHandler}>
      <div className="bg-white m-8 rounded-md p-4">
        <p className="">Question {index + 1} :</p>
        <Droppable droppableId="options">
          {(provided) => (
            <div
              className="flex gap-4 mt-4 ml-4"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {options.map((op, index) => {
                return (
                  <Draggable draggableId={op.id} index={index} key={op.id}>
                    {(provided) => (
                      <p
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="px-4 rounded-md bg-[#64CCC5] text-white"
                      >
                        {op.name}
                      </p>
                    )}
                  </Draggable>
                );
              })}
            </div>
          )}
        </Droppable>
        <div className="mt-4 flex gap-2">
          {previewText.map((word, index) => {
            if (word.isShow) {
              return <p key={index}>{word.word} </p>;
            } else {
              if (word.word === "") {
                return (
                  <Droppable droppableId={index.toString()} key={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="rounded-md w-16 bg-gray-300"
                      ></div>
                    )}
                  </Droppable>
                );
              } else {
                return (
                  <div
                    className="rounded-md min-w-[4rem] bg-[#64CCC5] text-center text-white"
                    key={index}
                  >
                    {word.word}
                  </div>
                );
              }
            }
          })}
        </div>
      </div>
    </DragDropContext>
  );
};

export default FormCloze;
   