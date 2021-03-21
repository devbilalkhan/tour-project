import { Main } from '../components/Main'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import Card, { ITours } from 'components/Card'
interface IToursProps {
  tours: ITours[]
}

const Home: React.FC<IToursProps> = ({ tours }) => {
  return (
    <div>
      <Head>
        <title>Tworist</title>
      </Head>
      <div className="container mx-auto">
        <Main />
        <div className="mx-auto text-4xl my-16">OUR TOURS</div>
        <div className="my-12 grid grid-cols-3 gap-6 mx-auto">
          {tours.map((tour, idx) => (
            <Card key={idx} {...tour} />
          ))}
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`http://localhost:3000/api/v1/tours`)

  const  {data}  = await res.json()
  const { tours } = data
  return {
    props: { tours },
  }
}
export default Home
