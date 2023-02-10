import { useContext } from 'react'
import { Info, Navbar, Repos, Search, User } from '../components'
import Spinner from '../components/Spinner'
import { GithubContext } from '../context/context'

export default function Dashboard() {
  const { isLoading } = useContext(GithubContext)
  if (isLoading) {
    return <main>
      <Navbar/>
      <Search/>
      <Spinner/>
    </main>
  }
  return (
    <main>
      {/* <Spinner/> */}
      <Navbar/>
      <Search/>
      <Info/>
      <User/>
      <Repos/>
    </main>
  )
}
