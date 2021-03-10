interface MainProps {}

export const Main: React.FC<MainProps> = () => {
  return (
    <section className="h-full dark:bg-gray-800 py-12 rounded-md shadow-2xl text-center">
      <img src="/scene.svg" alt="tourist photo" className="w-1/2 mx-auto" />
      <div className="mt-16 text-6xl tracking-widest font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-purple-500 to-green-400">
        Let's discover!
      </div>
      <div className="text-3xl py-8 tracking-widest font-bold ">WHY WAIT? TRAVEL WITH TWORIST</div>
      <div className="text-xl pb-6 tracking-widest text-gray-400">Your ultimate guide!</div>
      <button className="btn-yellow">
        TRAVEL
        <svg
          className="mx-auto w-5 h-5 my-2 animate-bounce"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>{' '}
      </button>
    </section>
  )
}
