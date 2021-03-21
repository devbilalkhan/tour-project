import Link from 'next/link'
import React from 'react'
import Button from 'src/components/Button'
import Container from 'src/components/Container'
import Layout from 'src/components/Layout'
import { initFirebase } from 'src/auth/initFirebase'
import firebase from 'firebase/app'
import 'firebase/auth'
import Debug from 'src/components/Debug'
import { useRouter } from 'next/router'
interface ILoginProps {
  [key: string]: string
}

const login: React.FC = () => {
  initFirebase()
  const [auth, setAuth] = React.useState<ILoginProps>({
    email: '',
    password: '',
  })
  const router = useRouter()
  return (
    <Layout>
      <div className="my-64">
        <Container page="loginPageContainer">
          <div className="shadow-2xl dark:bg-[#233142] rounded px-16 py-12 mb-4 ">
            <div className="flex flex-col justify-center">
              <h1 className="mx-auto">Login</h1>
              <div className="flex justify-center">
                <span className="text-lg">No Account?&nbsp;</span>
                <div>
                  <Link href="/signup">
                    <a className="a-link text-lg">
                      <span>Create an account</span>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <img
              className="mx-auto w-20 my-12"
              src="/home-color.svg"
              alt="home icon"
            />
            <div className="mb-4">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email address
              </label>
              <input
                className="shadow input"
                id="email"
                type="text"
                name="email"
                placeholder="Email address"
                onChange={e =>
                  setAuth({
                    ...auth,
                    [e.currentTarget.name]: e.currentTarget.value,
                  })
                }
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="input shadow"
                id="password"
                type="password"
                name="password"
                placeholder="***************"
                onChange={e =>
                  setAuth({
                    ...auth,
                    [e.currentTarget.name]: e.currentTarget.value,
                  })
                }
              />
              <p className="text-red text-xs italic my-2">
                Please choose a password.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <Button
                isDisabled={auth.email === '' || auth.password === ''}
                onClick={async e => {
                  e.preventDefault()
                  await firebase
                    .auth()
                    .signInWithEmailAndPassword(auth.email, auth.password)
                    .then(() => router.push('/'))
                    .catch(e => console.log(e))
                }}
              >
                Login
              </Button>
              <a
                className="a-link inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  )
}

export default login
