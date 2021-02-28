const yup = require("yup");
export const YUser = yup.object().shape({
  name: yup.string().trim().required(),
  email: yup.string().trim().required().email(),
  password: yup
    .string()
    .trim()
    .required()
    .min(5)
    .matches(/[a-zA-Z0-9]/),
  passwordConfirmation: yup
    .string()
    .trim()
    .min(5)
    .matches(/[a-zA-Z0-9]/),
});

export const YTour = yup.object().shape({
  name: yup.string().trim().required().min(5),
  duration: yup.number().required(),
  maxGroupSize: yup.number().required(),
  difficulty: yup.string().required(),
  ratingsAverage: yup.number().default(4.5),
  ratingsQuantity: yup.number().default(6),
  price: yup.number().required(),
  priceDiscount: yup.number(),
  summary: yup.string().trim(),
  description: yup.string().trim().required(),
  imageCover: yup.string().required(),
  images: yup.string(),
  createdAt: yup.date().default(Date.now()),
  startDates: yup.array().of(yup.date()),
});
