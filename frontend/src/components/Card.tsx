import Image from 'next/image'
interface CardProps {}
  
import React, {
	ButtonHTMLAttributes,
	DetailedHTMLProps,
	ReactNode,
  } from "react";
export interface ITours {
  ratingsAverage: Number
  ratingsQuantity: Number
  images: String[]
  startDates: string[]
  _id: String
  name: String
  duration: Number
  maxGroupSize: Number
  difficulty: String
  price: Number
  summary: String
  description: String
  imageCover: String
  durationWeeks: Number
  id: String
  stops: string | number
}

const sizeClassnames = {
	big: "py-2 px-6 text-sm rounded-lg",
	small: "px-2 py-1 text-xs rounded-md",
  };
  
  const colorClassnames = {
	primary:
	  "text-button bg-accent hover:bg-accent-hover disabled:text-accent-disabled disabled:bg-accent-hover",
	secondary:
	  "text-button bg-primary-700 hover:bg-primary-600 disabled:text-primary-300",
  };

  export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  size?: keyof typeof sizeClassnames;
  color?: keyof typeof colorClassnames;
  loading?: boolean;
  icon?: ReactNode;
};
const Card: React.FC<ITours> = props => {
  const convertDate = (date: string) => {
    const dt = new Date(date)
    return `${dt.toString().split(' ')[1]}, ${dt.toString().split(' ')[2]}`
  }

  const convertToUC = (str: String) => {
    return str.toUpperCase()
  }
  return (
    <div className="group flexflex-col dark:bg-gray-800 transition transform ease-in-out duration-300 hover:scale-105 max-w-sm shadow-2xl rounded-sm overflow-x-hidden">
      <div className="relative bg-gray-700">
        <span className="absolute inset-0 opacity-30 group-hover:opacity-60 transition transform ease-in-out duration-300 text-black z-50 bg-black"></span>
        <span className="px-4 py-2 opacity-80 absolute text-2xl font-semibold text-black top-40 left-0 z-50 bg-yellow-button">
          {props.name}
        </span>
        <Image src={`/${props.imageCover}`} alt="tour scene" width={500} height={320} />
      </div>
      <div className="flex flex-col px-6 mt-8">
        <div className="text-md font-medium">{`${convertToUC(props.difficulty)} ${
          props.stops ?? ''
        }-DAYS TOUR`}</div>
        <div className="text-sm lavender  my-2">{props.summary}</div>
        <div className="grid grid-cols-2 grid-rows-2 my-6 gap-x-12 gap-y-4">
          <div className="text-md  flex align-center">
            <svg
              className="w-6 inline text-yellow-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            Miami , USA
          </div>
          <div className="text-md flex align-center">
            <svg
              className="w-6 mr-1 inline text-yellow-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            {convertDate(props.startDates[0])}
          </div>
          <div className="text-md flex align-center">
            <svg
              className="w-6 inline text-yellow-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                clipRule="evenodd"
              />
            </svg>
            {props.difficulty}
          </div>
          <div className="text-md flex align center">
            <svg
              className="mr-1 w-6 inline text-yellow-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            {props.maxGroupSize}
          </div>
        </div>
      </div>
      <div className="px-6 flex align-center h-24 justify-between  bg-yellow-button">
        <div className="grid grid-rows2 my-6 text-black">
          <div className="font-semibold">
            ${props.price}
            <span className="font-normal text-sm"> per person</span>
          </div>
          <div className="font-semibold">
            {props.ratingsAverage}
            <span className="font-normal text-sm"> Rating ({props.ratingsQuantity})</span>
          </div>
        </div>
        <button className="px-8 h-14 my-auto bg-gray-900 shadow-xl rounded-md text-white focus:outline-none focus:ring focus:ring-offset-2 focus:ring-black">DETAILS</button>
      </div>
    </div>
  )
}

export default Card
