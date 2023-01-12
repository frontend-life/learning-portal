const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const isProd = true;

const url = isProd
  ? `mongodb+srv://sprilepko:UeXLaYQtLqPN4b1F@cluster0.c5musei.mongodb.net/?retryWrites=true&w=majority`
  : "mongodb://localhost:27017/frontend-portal";

const lessonSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   index: true,
    //   required: true,
    //   auto: true,
    // },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    homework: {
      type: String,
      required: false,
      trim: true,
    },
    link: {
      type: String,
      required: false,
      trim: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    homeworkAttachments: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
        },
      ],
      default: [],
    },
    // try to use docs to perform lessons descripion and homework
    iframeGoogleDocs: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Lesson = mongoose.model("Lesson", lessonSchema);

const courseSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   index: true,
    //   required: true,
    //   auto: true,
    // },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    order: {
      type: Number,
      required: true,
    },
    lessonsOrder: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
      ],
      require: false,
      default: [],
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

async function run() {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const lessons = await Lesson.find();
  const courses = await Course.find();

  courses.forEach(async (c) => {
    await Course.updateOne(
      { title: c.title },
      {
        lessonsOrder: lessons
          .filter(({ course }) => course.toString() === c._id.toString())
          .map((l) => l._id),
      }
    );
    // console.log(
    //   c,
    //   lessons
    //     .filter(({ course }) => course.toString() === c._id.toString())
    //     .map((l) => l._id)
    // );
  });

  console.log("End");
}

run();
