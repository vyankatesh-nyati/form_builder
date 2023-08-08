import QuestionModel from "../interfaces/QuestionModel";

interface FormModel {
  title: string;
  questions: Array<QuestionModel>;
}

export const formData: FormModel = {
  title: "Testing FOrm",
  questions: [
    {
      id: "3e6423c1036",
      type: "Cloze",
      question: "",
      categories: [
        {
          id: "e6423c10369",
          name: "category",
        },
      ],
      items: [],
      wordsArray: [
        {
          word: "How",
          isShow: true,
        },
        {
          word: "are",
          isShow: false,
        },
        {
          word: "you",
          isShow: false,
        },
        {
          word: "?",
          isShow: true,
        },
      ],
      options: [
        {
          isExist: true,
          name: "are",
          id: "6423c103694",
        },
        {
          name: "Hello ",
          isExist: false,
          id: "23c1036948b",
        },
        {
          isExist: true,
          name: "you",
          id: "423c1036948",
        },
      ],
      comprehension: "",
      comprehnesionQuestions: [],
    },
    {
      id: "0bc72ed16b7",
      type: "Comprehensive",
      question: "",
      categories: [
        {
          id: "bc72ed16b7c",
          name: "category",
        },
      ],
      items: [],
      wordsArray: [],
      options: [],
      comprehension:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit amet bibendum libero. Nullam vel cursus nulla, a mollis odio. Mauris efficitur accumsan lectus sit amet sollicitudin. Proin fringilla ex eget felis scelerisque tempus. In molestie auctor maximus. Integer id volutpat justo, non consectetur velit. Donec sed ullamcorper odio. Ut auctor, massa ac finibus porttitor, quam nisl hendrerit lacus, sed varius nulla purus non velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque sed ex lacus. Donec eget mattis nisl. Ut libero nibh, mattis a ex in, gravida fermentum tellus. Integer mauris augue, placerat et lobortis a, laoreet in odio. In suscipit mi et libero congue rutrum. Aliquam ut orci sed sem aliquet auctor in ut nibh.\n\nVivamus non justo tincidunt, accumsan felis ut, placerat purus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec ultricies nisl ut elit mollis blandit. Vestibulum feugiat, felis nec faucibus eleifend, tellus justo porta nunc, et tempus augue sapien ut sapien. Cras condimentum lectus a erat iaculis, a accumsan lectus gravida. Proin eu ornare mauris, posuere laoreet justo. Ut quis facilisis metus. Nunc suscipit, tellus sodales volutpat tincidunt, quam mi interdum erat, sit amet varius nisi sem cursus enim. Duis sed gravida nibh, in faucibus mauris. Aliquam sodales non urna eget ornare. Vestibulum varius ornare lorem a egestas. Etiam interdum diam at odio varius blandit. Aenean quis scelerisque turpis.\n\nNunc cursus faucibus sapien at aliquet. Aenean eu nulla eget libero feugiat luctus. Nullam rutrum porta tortor pellentesque gravida. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit mattis eleifend. Vivamus sed rhoncus nunc. Ut eu justo felis. Praesent quis venenatis ante. Duis faucibus commodo massa. Maecenas nulla dui, vulputate ut convallis a, posuere ac diam.\n\nProin nisl nibh, imperdiet eu nisi a, congue faucibus libero. Aenean mattis tortor ac rutrum vulputate. Nam pretium lacus massa, vel rhoncus est feugiat pulvinar. Praesent varius ligula et metus aliquam, sit amet mollis erat ultrices. Pellentesque pretium mi erat, a placerat nibh interdum eu. Aenean ac porta eros. Vestibulum lacinia odio sapien, sed laoreet nisi efficitur non.\n\nPhasellus efficitur velit at tellus congue auctor. Nunc imperdiet euismod quam non accumsan. Mauris nec vehicula tortor. Sed semper justo quis velit tincidunt dapibus. Nunc in tortor ligula. Cras consectetur congue rhoncus. Fusce lacinia tincidunt urna nec tincidunt. Mauris velit nibh, ultricies a dapibus ac, viverra ac magna. Sed ac leo a lectus dapibus luctus nec in tortor. In lacinia sit amet erat quis ornare. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum id libero non odio pulvinar consectetur ac eget risus. Nulla facilisi. Nunc sollicitudin tincidunt sapien, eget malesuada mauris elementum et.",
      comprehnesionQuestions: [
        {
          id: "c72ed16b7cb",
          question: "How are you ?",
          options: ["option1", "option2", "option3", "option4"],
          answer: "option1",
        },
        {
          id: "72ed16b7cba",
          question: "Testing question",
          options: ["option1", "option2sdv", "option3", "option4"],
          answer: "option3",
        },
      ],
    },
  ],
};
