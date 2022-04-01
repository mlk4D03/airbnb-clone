import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Smallcard from '../components/Smallcard';
import Mediumcard from '../components/Meciumcard'
import Largecard from '../components/Largecard';
import Footer from '../components/footer';

export default function Home({exploreData, cardsData}) {
  return (
    <div>
      <Head>
        <title>Airbnb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <Banner/>

      <main className='max-w-7xl mx-auto px-8 sm:px-16'>
        <section className='pt-6'>
          <h2 className='text-4xl font-semibold pb-5'>Explore Nearby</h2>

          {/** Pull some data from a server - API Endpoints*/}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {exploreData?.map((item) => (
            <Smallcard key={item.img}
            img={item.img}
            distance={item.distance}
            location={item.location}/>
          ))}
          </div>
          
        </section>
        <section>
          <h2 className='text-4xl font-semibold py-8'>Live Anywhere</h2>

          <div className='flex space-x-3 overflow-scroll
          scrollbar-hide p-3 -ml-3'>
            {cardsData?.map(item => (
            <Mediumcard key={item.img}
            img={item.img}
            title={item.title}/>
          ))}
          </div>
          
        </section>
        <Largecard
        img="http://links.papareact.com/4cj"
        title="The Greatest Outdoors"
        description="Whishlists curated by Airbnb."
        buttonText="Get Inspired"/>
      </main>
      
        <Footer/>

    </div>
  )
}

export async function getStaticProps() {
  const exploreData = await fetch('https://links.papareact.com/pyp').then(
    (res) => res.json()
  );

  const cardsData = await fetch('https://links.papareact.com/zp1').then(
    (res) => res.json()
  );

  return {
    props: {
      exploreData,
      cardsData
    }
  }

}
