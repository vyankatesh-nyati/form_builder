import React, { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { PiTextUnderlineBold } from "react-icons/pi";
import { IoMdRadioButtonOn, IoMdRadioButtonOff } from "react-icons/io";
import { uid } from "uid";
import QuestionModel from "../../interfaces/QuestionModel";
import { useDispatch } from "react-redux";
import { questionsActions } from "../../store/questionSlice";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const ClozeTypeQuestion = ({ question }: { question: QuestionModel }) => {
  // const [sentence, setSentence] = useState("");
  // const [wordsArray, setWordsArray] = useState<
  //   Array<{ word: string; isShow: boolean }>
  // >([]);
  const sentenceRef = useRef<HTMLInputElement>(null);
  const [selectedArray, setSelectedArray] = useState<Array<string>>([]);
  const [isFocus, setIsFocus] = useState(false);
  // const [options, setOptions] = useState<
  //   Array<{ isExist: boolean; name: string; id: string }>
  // >([]);
  const dispatch = useDispatch();

  const onSenteceChange = () => {
    if (sentenceRef.current != null) {
      const sentence = sentenceRef.current.value;
      const sArray = sentence.split(" ");
      let wArray: Array<{ word: string; isShow: boolean }> = [];
      sArray.forEach((ele) => {
        if (ele.trim() !== "") {
          wArray.push({
            word: ele.trim(),
            isShow: true,
          });
        }
      });
      // setWordsArray(wArray);
      dispatch(
        questionsActions.clozeSetWordsArray({
          id: question.id,
          wordsArray: wArray,
        })
      );
    }
  };

  const onSelection = () => {
    const selectedElements = window.getSelection()?.toString();
    if (selectedElements === "") {
      return;
    } else {
      const sArray = selectedElements?.split(" ");
      const seArray = sArray?.map((ele) => {
        return ele.trim();
      });
      if (seArray !== undefined) {
        setSelectedArray(seArray);
      }
    }
  };

  const onUnderline = () => {
    const op: Array<{ isExist: boolean; name: string; id: string }> = [];
    const updatedWordsArray = question.wordsArray.map((word) => {
      if (selectedArray.includes(word.word)) {
        op.push({
          isExist: true,
          name: word.word,
          id: uid(),
        });
        return {
          ...word,
          isShow: false,
        };
      }
      return word;
    });

    // setOptions([...options, ...op]);
    dispatch(
      questionsActions.clozeSetOptionsArray({
        id: question.id,
        optionsArray: [...question.options, ...op],
      })
    );
    // setWordsArray(updatedWordsArray);
    dispatch(
      questionsActions.clozeSetWordsArray({
        id: question.id,
        wordsArray: updatedWordsArray,
      })
    );
    setIsFocus(false);
  };

  const changeOptionHandler = (optionString: string, index: number) => {
    dispatch(
      questionsActions.clozeOptionNameChange({
        id: question.id,
        index: index,
        optionName: optionString,
      })
    );
  };

  const onAddOptionHandler = () => {
    // setOptions([...options, { name: "option", isExist: false, id: uid() }]);
    dispatch(questionsActions.clozeAddNewOption({ id: question.id }));
  };

  const removeOption = (index: number) => {
    let newOption: Array<{ name: string; isExist: boolean; id: string }> = [];
    console.log(index);

    question.options.forEach((element, i) => {
      if (i !== index) {
        newOption.push(element);
      }
    });
    // setOptions(newOption);
    dispatch(
      questionsActions.clozeSetOptionsArray({
        id: question.id,
        optionsArray: newOption,
      })
    );
  };

  const onDragEndHandlerForOptions = (result: any) => {
    if (!result.destination) {
      return;
    }
    const newOptions = [...question.options];
    const [reordedOptions] = newOptions.splice(result.source.index, 1);
    newOptions.splice(result.destination.index, 0, reordedOptions);

    dispatch(
      questionsActions.clozeSetOptionsArray({
        id: question.id,
        optionsArray: newOptions,
      })
    );
  };

  let previewText: string = "";
  let showText: string = "";
  question.wordsArray.forEach((word) => {
    if (word.isShow) {
      previewText = previewText + " " + word.word;
      showText = showText + " " + word.word;
    } else {
      previewText = previewText + " _ _ _ _ ";
      showText = showText + " " + word.word;
    }
  });

  return (
    <div>
      <div>
        <p className="pb-2">Preview: </p>
        <input
          type="text"
          className="mb-3 w-3/5 px-2 py-1 rounded-md"
          value={previewText}
          disabled
        />
      </div>
      <div>
        <p className="pb-2">Sentence :</p>
        <div className="flex items-center gap-4">
          {isFocus ? (
            <input
              type="text"
              className="border-2 w-3/5 px-2 py-1 rounded-md focus:outline-none border-x-gray-400 focus:border-[#176B87]"
              ref={sentenceRef}
              onChange={onSenteceChange}
              onSelect={onSelection}
              defaultValue={showText}
              onFocus={() => {
                setIsFocus(true);
              }}
            />
          ) : (
            <p
              className="border-2 w-3/5 px-2 py-1 rounded-md focus:outline-[#001C30] h-10"
              onClick={() => {
                setIsFocus(true);
              }}
            >
              {question.wordsArray.map((w) => {
                if (w.isShow) {
                  return w.word + " ";
                }
                return (
                  <>
                    <span className="underline">{w.word}</span> <span> </span>
                  </>
                );
              })}
            </p>
          )}
          <PiTextUnderlineBold
            className="text-xl cursor-pointer"
            onClick={onUnderline}
          />
        </div>
      </div>
      <div className="pt-4">
        <p>Options: </p>
        <div className="flex flex-col gap-2 px-4 py-2">
          <DragDropContext onDragEnd={onDragEndHandlerForOptions}>
            <Droppable droppableId="options">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {question.options.map((ele, index) => {
                    return (
                      <Draggable
                        key={ele.id}
                        draggableId={ele.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="flex items-center gap-3"
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            {ele.isExist ? (
                              <IoMdRadioButtonOn className="text-lg" />
                            ) : (
                              <IoMdRadioButtonOff className="text-lg" />
                            )}
                            <input
                              type="text"
                              className="focus:outline-none border-b-2 border-x-gray-400 text-base pb-1 w-1/6 focus:border-[#176B87]"
                              defaultValue={ele.name}
                              disabled={ele.isExist ? true : false}
                              onChange={(event) => {
                                changeOptionHandler(event.target.value, index);
                              }}
                            />
                            {!ele.isExist && (
                              <AiOutlineClose
                                className="z-[100] cursor-pointer"
                                onClick={() => {
                                  removeOption(index);
                                }}
                              />
                            )}
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div
            className="flex items-center gap-3 text-gray-500 py-3 cursor-pointer"
            onClick={onAddOptionHandler}
          >
            <IoMdRadioButtonOff className="text-lg" />
            <input
              type="text"
              className="focus:outline-none  text-base pb-1 w-2/6"
              defaultValue="Add new option"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClozeTypeQuestion;
